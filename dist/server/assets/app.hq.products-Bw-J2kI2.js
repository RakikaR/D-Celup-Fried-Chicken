import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Save, X, Pencil, Trash2 } from "lucide-react";
import { B as Button } from "./button-BlXBT4eV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DtzFsmho.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
function ProductsPage() {
  const [products, setProducts] = useState(() => mockApi.getProducts());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  function refresh() {
    setProducts(mockApi.getProducts());
  }
  function startEdit(product) {
    setEditing(product);
    setForm({
      ...product
    });
  }
  function startCreate() {
    setEditing({
      id: `prod-${Date.now()}`,
      nama_produk: "",
      harga: 0,
      kategori: "Paket",
      is_active: true
    });
    setForm({
      id: `prod-${Date.now()}`,
      nama_produk: "",
      harga: 0,
      kategori: "Paket",
      is_active: true
    });
  }
  function cancelEdit() {
    setEditing(null);
    setForm({});
  }
  function save() {
    if (!form.nama_produk || form.harga == null) return;
    const product = {
      ...editing,
      ...form
    };
    mockApi.upsertProduct(product);
    refresh();
    setEditing(null);
    setForm({});
  }
  function remove(id) {
    if (confirm("Yakin hapus produk ini?")) {
      mockApi.deleteProduct(id);
      refresh();
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Master Produk" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Kelola menu dan harga D'Celup" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { onClick: startCreate, className: "gap-2 bg-brand-red hover:bg-brand-red/90", children: [
        /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
        "Tambah Produk"
      ] })
    ] }),
    editing && /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg", children: editing.nama_produk ? "Edit Produk" : "Produk Baru" }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Nama Produk" }),
            /* @__PURE__ */ jsx(Input, { value: form.nama_produk ?? "", onChange: (e) => setForm((f) => ({
              ...f,
              nama_produk: e.target.value
            })), placeholder: "Contoh: Paket 2 Pcs Ayam" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Harga (Rp)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", value: form.harga ?? 0, onChange: (e) => setForm((f) => ({
              ...f,
              harga: Number(e.target.value)
            })) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Kategori" }),
            /* @__PURE__ */ jsxs(Select, { value: form.kategori ?? "Paket", onValueChange: (v) => setForm((f) => ({
              ...f,
              kategori: v
            })), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "Paket", children: "Paket" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Ayam", children: "Ayam" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Side", children: "Side" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "Minuman", children: "Minuman" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxs(Select, { value: form.is_active ? "active" : "inactive", onValueChange: (v) => setForm((f) => ({
              ...f,
              is_active: v === "active"
            })), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "active", children: "Aktif" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "inactive", children: "Nonaktif" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxs(Button, { onClick: save, className: "gap-2 bg-brand-red hover:bg-brand-red/90", children: [
            /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
            "Simpan"
          ] }),
          /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: cancelEdit, className: "gap-2", children: [
            /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
            "Batal"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Nama Produk" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Kategori" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Harga" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-[120px]" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { children: products.map((p) => /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: p.nama_produk }),
        /* @__PURE__ */ jsx(TableCell, { children: p.kategori }),
        /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
          "Rp ",
          p.harga.toLocaleString("id-ID")
        ] }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: `inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`, children: p.is_active ? "Aktif" : "Nonaktif" }) }),
        /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", onClick: () => startEdit(p), children: /* @__PURE__ */ jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 text-muted-foreground hover:text-destructive", onClick: () => remove(p.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
        ] }) })
      ] }, p.id)) })
    ] }) }) })
  ] });
}
export {
  ProductsPage as component
};
