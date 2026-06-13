import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { TrendingUp, Package, ClipboardList, ShoppingCart, History } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { u as useAuth } from "./router-CXbiU-0N.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
function OutletDashboard() {
  const {
    currentOutletId
  } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const outlet = mockApi.getOutlets().find((o) => o.id === outletId);
  const todaySales = mockApi.getSales(outletId, today, today);
  mockApi.getInventory(outletId, today);
  const totalOmset = useMemo(() => todaySales.reduce((sum, s) => sum + s.total_penjualan, 0), [todaySales]);
  const totalPorsi = useMemo(() => todaySales.reduce((sum, s) => sum + s.detail_item_terjual.reduce((a, d) => a + d.qty, 0), 0), [todaySales]);
  const statusSetoran = todaySales[0]?.status_setoran ?? "pending";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: outlet?.nama_outlet }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: outlet?.lokasi })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Omset Hari Ini" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-red" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          "Rp ",
          totalOmset.toLocaleString("id-ID")
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Porsi Terjual" }),
          /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-brand-orange" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          totalPorsi,
          " porsi"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Status Setoran" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-gold" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(Badge, { variant: statusSetoran === "verified" ? "default" : statusSetoran === "disetor" ? "secondary" : "outline", children: statusSetoran.toUpperCase() }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/app/outlet/inventory", children: /* @__PURE__ */ jsx(Card, { className: "transition-colors hover:border-brand-red hover:bg-brand-red/5 cursor-pointer", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red", children: /* @__PURE__ */ jsx(ClipboardList, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Stok Opname" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Input stok bahan baku hari ini" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Link, { to: "/app/outlet/sales", children: /* @__PURE__ */ jsx(Card, { className: "transition-colors hover:border-brand-orange hover:bg-brand-orange/5 cursor-pointer", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange", children: /* @__PURE__ */ jsx(ShoppingCart, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Input Penjualan" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Catat omset dan porsi terjual" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx(Link, { to: "/app/outlet/history", children: /* @__PURE__ */ jsx(Card, { className: "transition-colors hover:border-brand-gold hover:bg-brand-gold/5 cursor-pointer", children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center gap-4 p-6", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold", children: /* @__PURE__ */ jsx(History, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Riwayat Transaksi" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Lihat 30 hari terakhir" })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  OutletDashboard as component
};
