import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useLocation, Outlet, Link, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChefHat, LayoutDashboard, Package, FileText, Store, ClipboardList, ShoppingCart, History, LogOut } from "lucide-react";
import { u as useAuth } from "./router-CXbiU-0N.js";
import { B as Button } from "./button-BlXBT4eV.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
function SidebarItem({
  to,
  icon: Icon,
  label,
  active
}) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to,
      className: `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-brand-red text-primary-foreground" : "text-foreground hover:bg-accent"}`,
      children: [
        /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5 shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
      ]
    }
  );
}
function AppShell() {
  const { user, logout, isAdmin, isStaff, currentOutletId } = useAuth();
  const location = useLocation();
  const path = location.pathname;
  const currentOutlet = useMemo(() => {
    if (!currentOutletId) return null;
    return mockApi.getOutlets().find((o) => o.id === currentOutletId) ?? null;
  }, [currentOutletId]);
  const outletName = currentOutlet?.nama_outlet ?? "Outlet";
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs("aside", { className: "sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-card px-4 py-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 flex items-center gap-3 px-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-primary-foreground", children: /* @__PURE__ */ jsx(ChefHat, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-bold leading-tight text-foreground", children: "D'Celup" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Fried Chicken" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("nav", { className: "flex flex-1 flex-col gap-1 overflow-y-auto", children: [
        isAdmin && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Admin Pusat" }),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/hq",
              icon: LayoutDashboard,
              label: "Dashboard Pusat",
              active: path === "/app/hq"
            }
          ),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/hq/products",
              icon: Package,
              label: "Master Produk",
              active: path === "/app/hq/products"
            }
          ),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/hq/reports",
              icon: FileText,
              label: "Laporan & Export",
              active: path === "/app/hq/reports"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "my-3 border-t border-border" }),
          /* @__PURE__ */ jsx("p", { className: "mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Outlet Cabang" }),
          mockApi.getOutlets().map((o) => /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: `/app/hq/outlets/${o.id}`,
              icon: Store,
              label: o.nama_outlet,
              active: path === `/app/hq/outlets/${o.id}`
            },
            o.id
          ))
        ] }),
        isStaff && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: outletName }),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/outlet",
              icon: LayoutDashboard,
              label: "Dashboard",
              active: path === "/app/outlet"
            }
          ),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/outlet/inventory",
              icon: ClipboardList,
              label: "Stok Opname",
              active: path === "/app/outlet/inventory"
            }
          ),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/outlet/sales",
              icon: ShoppingCart,
              label: "Input Penjualan",
              active: path === "/app/outlet/sales"
            }
          ),
          /* @__PURE__ */ jsx(
            SidebarItem,
            {
              to: "/app/outlet/history",
              icon: History,
              label: "Riwayat Transaksi",
              active: path === "/app/outlet/history"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto border-t border-border pt-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 px-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-foreground", children: user?.nama }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: isAdmin ? "Admin Pusat" : "Staff Outlet" })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full justify-start gap-2",
            onClick: logout,
            children: [
              /* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }),
              "Keluar"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto p-6", children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
}
function AppLayout() {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" }) });
  }
  if (!user) {
    throw redirect({
      to: "/auth"
    });
  }
  return /* @__PURE__ */ jsx(AppShell, {});
}
export {
  AppLayout as component
};
