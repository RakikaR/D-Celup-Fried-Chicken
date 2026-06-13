import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, TrendingUp, Package } from "lucide-react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import { R as Route } from "./router-CXbiU-0N.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
function OutletDetail() {
  const {
    outletId
  } = Route.useParams();
  const outlets = mockApi.getOutlets();
  const outlet = outlets.find((o) => o.id === outletId);
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const inventory = mockApi.getInventory(outletId, today);
  const sales = mockApi.getSales(outletId);
  const totalOmset = useMemo(() => sales.reduce((s, r) => s + r.total_penjualan, 0), [sales]);
  const totalPorsi = useMemo(() => sales.reduce((s, r) => s + r.detail_item_terjual.reduce((a, d) => a + d.qty, 0), 0), [sales]);
  if (!outlet) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-64 items-center justify-center text-muted-foreground", children: "Outlet tidak ditemukan" });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxs(Link, { to: "/app/hq", className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }),
      "Kembali"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: outlet.nama_outlet }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: outlet.lokasi })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Total Omset (7 Hari)" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-red" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          "Rp ",
          totalOmset.toLocaleString("id-ID")
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Total Porsi Terjual" }),
          /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-orange" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          totalPorsi,
          " porsi"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Item Stok Hari Ini" }),
          /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-brand-gold" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          inventory.length,
          " bahan"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Stok Opname Hari Ini" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: inventory.length > 0 ? /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Bahan" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Satuan" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Awal" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Masuk" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Akhir" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Terpakai" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: inventory.map((item) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: item.nama_bahan }),
          /* @__PURE__ */ jsx(TableCell, { children: item.satuan }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: item.stok_awal }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: item.stok_masuk }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right", children: item.stok_akhir }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right font-medium text-brand-red", children: item.terpakai })
        ] }, item.id)) })
      ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Belum ada data stok untuk hari ini." }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Riwayat Penjualan (7 Hari)" }) }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Total Penjualan" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Jumlah Item" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status Setoran" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: sales.map((s) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: s.tanggal }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
            "Rp ",
            s.total_penjualan.toLocaleString("id-ID")
          ] }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
            s.detail_item_terjual.length,
            " item"
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: s.status_setoran === "verified" ? "default" : s.status_setoran === "disetor" ? "secondary" : "outline", children: s.status_setoran }) })
        ] }, s.id)) })
      ] }) })
    ] })
  ] });
}
export {
  OutletDetail as component
};
