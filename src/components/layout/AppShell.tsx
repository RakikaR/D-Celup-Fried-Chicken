import React, { useMemo } from "react";
import { Link, Outlet, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Store,
  Package,
  FileText,
  ClipboardList,
  ShoppingCart,
  History,
  LogOut,
  ChefHat,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/UI/button";
import { mockApi } from "@/lib/data/mock";

function SidebarItem({
  to,
  icon: Icon,
  label,
  active,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-brand-red text-primary-foreground"
          : "text-foreground hover:bg-accent"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AppShell() {
  const { user, logout, isAdmin, isStaff, currentOutletId } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const currentOutlet = useMemo(() => {
    if (!currentOutletId) return null;
    return mockApi.getOutlets().find((o) => o.id === currentOutletId) ?? null;
  }, [currentOutletId]);

  const outletName = currentOutlet?.nama_outlet ?? "Outlet";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-6">
        <div className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-primary-foreground">
            <ChefHat className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-foreground">
              D'Celup
            </h1>
            <p className="text-xs text-muted-foreground">Fried Chicken</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {isAdmin && (
            <>
              <p className="mb-2 mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin Pusat
              </p>
              <SidebarItem
                to="/app/hq"
                icon={LayoutDashboard}
                label="Dashboard Pusat"
                active={path === "/app/hq"}
              />
              <SidebarItem
                to="/app/hq/products"
                icon={Package}
                label="Master Produk"
                active={path === "/app/hq/products"}
              />
              <SidebarItem
                to="/app/hq/reports"
                icon={FileText}
                label="Laporan & Export"
                active={path === "/app/hq/reports"}
              />
              <div className="my-3 border-t border-border" />
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Outlet Cabang
              </p>
              {mockApi.getOutlets().map((o) => (
                <SidebarItem
                  key={o.id}
                  to={`/app/hq/outlets/${o.id}`}
                  icon={Store}
                  label={o.nama_outlet}
                  active={path === `/app/hq/outlets/${o.id}`}
                />
              ))}
            </>
          )}

          {isStaff && (
            <>
              <p className="mb-2 mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {outletName}
              </p>
              <SidebarItem
                to="/app/outlet"
                icon={LayoutDashboard}
                label="Dashboard"
                active={path === "/app/outlet"}
              />
              <SidebarItem
                to="/app/outlet/inventory"
                icon={ClipboardList}
                label="Stok Opname"
                active={path === "/app/outlet/inventory"}
              />
              <SidebarItem
                to="/app/outlet/sales"
                icon={ShoppingCart}
                label="Input Penjualan"
                active={path === "/app/outlet/sales"}
              />
              <SidebarItem
                to="/app/outlet/history"
                icon={History}
                label="Riwayat Transaksi"
                active={path === "/app/outlet/history"}
              />
            </>
          )}
        </nav>

        <div className="mt-auto border-t border-border pt-4">
          <div className="mb-3 px-3">
            <p className="text-sm font-medium text-foreground">{user?.nama}</p>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "Admin Pusat" : "Staff Outlet"}
            </p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
