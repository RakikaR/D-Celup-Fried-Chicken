-- ============================================================
--  SKEMA DATABASE: D'Celup Fried Chicken
--  Sistem Manajemen Stok & Rekap Penjualan (Multi-Outlet)
--  PostgreSQL
-- ============================================================

-- 1. ENUMS
CREATE TYPE public.app_role AS ENUM ('hq_admin', 'outlet_staff');

CREATE TYPE public.setoran_status AS ENUM ('pending', 'disetor', 'verified');

-- 2. TABEL OUTLETS
CREATE TABLE public.outlets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    nama_outlet text NOT NULL,
    lokasi text,
    created_at timestamptz DEFAULT now()
);

-- 3. TABEL PROFILES (1:1 dengan auth.users)
--    Berisi nama user dan outlet_id (NULL untuk HQ Admin)
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    nama text NOT NULL,
    outlet_id uuid REFERENCES public.outlets (id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now()
);

-- 4. TABEL USER ROLES (terpisah dari profiles!)
--    Wajib terpisah untuk mencegah privilege escalation
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- 5. TABEL MASTER PRODUK
CREATE TABLE public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    nama_produk text NOT NULL,
    harga numeric(12, 2) NOT NULL CHECK (harga >= 0),
    kategori text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now()
);

-- 6. TABEL INVENTORY / STOK OPNAME
CREATE TABLE public.inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    outlet_id uuid NOT NULL REFERENCES public.outlets (id),
    nama_bahan text NOT NULL,
    satuan text NOT NULL,
    stok_awal numeric(12, 2) NOT NULL DEFAULT 0,
    stok_masuk numeric(12, 2) NOT NULL DEFAULT 0,
    stok_akhir numeric(12, 2) NOT NULL DEFAULT 0,
    terpakai numeric(12, 2) GENERATED ALWAYS AS (
        stok_awal + stok_masuk - stok_akhir
    ) STORED,
    tanggal date NOT NULL DEFAULT CURRENT_DATE,
    created_by uuid REFERENCES auth.users (id),
    UNIQUE (
        outlet_id,
        nama_bahan,
        tanggal
    )
);

-- 7. TABEL LAPORAN PENJUALAN
CREATE TABLE public.sales_reports (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    outlet_id uuid NOT NULL REFERENCES public.outlets (id),
    tanggal date NOT NULL DEFAULT CURRENT_DATE,
    total_penjualan numeric(12, 2) NOT NULL DEFAULT 0,
    detail_item_terjual jsonb NOT NULL DEFAULT '[]',
    status_setoran setoran_status DEFAULT 'pending',
    catatan text,
    created_by uuid REFERENCES auth.users (id),
    created_at timestamptz DEFAULT now(),
    UNIQUE (outlet_id, tanggal)
);

-- ============================================================
--  GRANTS (WAJIB untuk Supabase Data API / PostgREST)
-- ============================================================

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.outlets TO authenticated;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.profiles TO authenticated;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.user_roles TO authenticated;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.products TO authenticated;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.inventory TO authenticated;

GRANT
SELECT,
INSERT
,
UPDATE,
DELETE ON public.sales_reports TO authenticated;

GRANT ALL ON public.outlets TO service_role;

GRANT ALL ON public.profiles TO service_role;

GRANT ALL ON public.user_roles TO service_role;

GRANT ALL ON public.products TO service_role;

GRANT ALL ON public.inventory TO service_role;

GRANT ALL ON public.sales_reports TO service_role;

-- ============================================================
--  RLS (Row Level Security)
-- ============================================================

ALTER TABLE public.outlets ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.sales_reports ENABLE ROW LEVEL SECURITY;

-- Security Definer Function (hindari infinite recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.get_my_outlet()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT outlet_id FROM public.profiles WHERE id = auth.uid()
$$;

-- --- OUTLETS ---
-- Semua authenticated bisa baca outlet
CREATE POLICY "Anyone authenticated can read outlets" ON public.outlets FOR
SELECT TO authenticated USING (true);

-- Hanya hq_admin bisa edit outlet
CREATE POLICY "Only HQ admin can modify outlets" ON public.outlets FOR ALL TO authenticated USING (
    public.has_role (auth.uid (), 'hq_admin')
);

-- --- PROFILES ---
CREATE POLICY "Users can read own profile" ON public.profiles FOR
SELECT TO authenticated USING (id = auth.uid ());

CREATE POLICY "HQ admin can read all profiles" ON public.profiles FOR
SELECT TO authenticated USING (
        public.has_role (auth.uid (), 'hq_admin')
    );

CREATE POLICY "Users can update own profile" ON public.profiles FOR
UPDATE TO authenticated USING (id = auth.uid ());

-- --- USER_ROLES ---
CREATE POLICY "Users can read own roles" ON public.user_roles FOR
SELECT TO authenticated USING (user_id = auth.uid ());

CREATE POLICY "HQ admin can read all roles" ON public.user_roles FOR
SELECT TO authenticated USING (
        public.has_role (auth.uid (), 'hq_admin')
    );

-- --- PRODUCTS ---
CREATE POLICY "Anyone authenticated can read products" ON public.products FOR
SELECT TO authenticated USING (true);

CREATE POLICY "Only HQ admin can modify products" ON public.products FOR ALL TO authenticated USING (
    public.has_role (auth.uid (), 'hq_admin')
);

-- --- INVENTORY ---
-- HQ admin: semua. Staff outlet: hanya outlet sendiri.
CREATE POLICY "HQ admin can access all inventory" ON public.inventory FOR ALL TO authenticated USING (
    public.has_role (auth.uid (), 'hq_admin')
);

CREATE POLICY "Staff can access own outlet inventory" ON public.inventory FOR ALL TO authenticated USING (
    outlet_id = public.get_my_outlet ()
);

-- --- SALES_REPORTS ---
CREATE POLICY "HQ admin can access all sales" ON public.sales_reports FOR ALL TO authenticated USING (
    public.has_role (auth.uid (), 'hq_admin')
);

CREATE POLICY "Staff can access own outlet sales" ON public.sales_reports FOR ALL TO authenticated USING (
    outlet_id = public.get_my_outlet ()
);

-- ============================================================
--  TRIGGER: Auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, nama)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nama', NEW.email)
  );
  RETURN NEW;
END
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
--  SEED DATA
-- ============================================================

INSERT INTO
    public.outlets (id, nama_outlet, lokasi)
VALUES (
        'outlet-1',
        'Outlet 1 - Sudirman',
        'Jl. Sudirman No. 12, Jakarta'
    ),
    (
        'outlet-2',
        'Outlet 2 - Ahmad Yani',
        'Jl. Ahmad Yani No. 45, Bandung'
    ),
    (
        'outlet-3',
        'Outlet 3 - Diponegoro',
        'Jl. Diponegoro No. 78, Surabaya'
    );

INSERT INTO
    public.products (nama_produk, harga, kategori)
VALUES (
        'Paket 2 Pcs Ayam + Nasi',
        25000,
        'Paket'
    ),
    (
        'Paket 4 Pcs Ayam + Nasi (2)',
        45000,
        'Paket'
    ),
    (
        'Paket 6 Pcs Ayam + Nasi (3)',
        65000,
        'Paket'
    ),
    (
        'Ayam Crispy 1 Pcs',
        13000,
        'Ayam'
    ),
    ('Nasi Putih', 5000, 'Side'),
    (
        'Minuman Soda',
        8000,
        'Minuman'
    ),
    ('Tahu Crispy', 3000, 'Side'),
    ('Tempe Crispy', 3000, 'Side');