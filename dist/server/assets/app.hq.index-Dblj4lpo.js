import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { TrendingUp, Package, Store, ArrowRight } from "lucide-react";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
function formatRupiah$1(n) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}
function SummaryCards({
  totalOmsetHariIni,
  totalOmsetBulanIni,
  totalPorsiHariIni,
  outletAktif
}) {
  return /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Omset Hari Ini" }),
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-red" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-foreground", children: formatRupiah$1(totalOmsetHariIni) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total 3 outlet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Omset Bulan Ini" }),
        /* @__PURE__ */ jsx(TrendingUp, { className: "h-5 w-5 text-brand-orange" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-foreground", children: formatRupiah$1(totalOmsetBulanIni) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Akumulasi bulan ini" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Total Porsi Terjual" }),
        /* @__PURE__ */ jsx(Package, { className: "h-5 w-5 text-brand-gold" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          totalPorsiHariIni.toLocaleString("id-ID"),
          " porsi"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Hari ini" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-sm font-medium text-muted-foreground", children: "Outlet Aktif" }),
        /* @__PURE__ */ jsx(Store, { className: "h-5 w-5 text-brand-red" })
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-foreground", children: [
          outletAktif,
          " Outlet"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Semua beroperasi" })
      ] })
    ] })
  ] });
}
const COLORS = ["#D32F2F", "#FF8F00", "#FFC107"];
function formatShortDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}
function formatRupiah(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}jt`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}rb`;
  return `${n}`;
}
function SalesChart({ data }) {
  const merged = data[0]?.data.map((d, i) => {
    const row = {
      tanggal: formatShortDate(d.tanggal)
    };
    data.forEach((series) => {
      row[series.outlet.nama_outlet] = series.data[i]?.omset ?? 0;
    });
    return row;
  }) ?? [];
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold text-foreground", children: "Omset 7 Hari Terakhir" }) }),
    /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: 320, children: /* @__PURE__ */ jsxs(
      LineChart,
      {
        data: merged,
        margin: { top: 8, right: 16, bottom: 0, left: 0 },
        children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "var(--color-border)" }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "tanggal",
              stroke: "var(--color-muted-foreground)",
              fontSize: 12
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              stroke: "var(--color-muted-foreground)",
              fontSize: 12,
              tickFormatter: formatRupiah
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              formatter: (value) => [
                `Rp ${value.toLocaleString("id-ID")}`,
                ""
              ],
              contentStyle: {
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                borderRadius: "8px",
                color: "var(--color-foreground)"
              }
            }
          ),
          /* @__PURE__ */ jsx(Legend, {}),
          data.map((series, idx) => /* @__PURE__ */ jsx(
            Line,
            {
              type: "monotone",
              dataKey: series.outlet.nama_outlet,
              stroke: COLORS[idx % COLORS.length],
              strokeWidth: 2.5,
              dot: { r: 4 },
              activeDot: { r: 6 }
            },
            series.outlet.id
          ))
        ]
      }
    ) }) })
  ] });
}
function HQDashboard() {
  const summary = useMemo(() => mockApi.getDashboardSummary(), []);
  mockApi.getOutlets();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Dashboard Pusat" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Ringkasan operasional seluruh outlet" })
    ] }),
    /* @__PURE__ */ jsx(SummaryCards, { totalOmsetHariIni: summary.totalOmsetHariIni, totalOmsetBulanIni: summary.totalOmsetBulanIni, totalPorsiHariIni: summary.totalPorsiHariIni, outletAktif: summary.outletAktif }),
    /* @__PURE__ */ jsx(SalesChart, { data: summary.chartData }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Status Outlet Hari Ini" }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-xs", children: (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID") })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Outlet" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Omset Hari Ini" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Item Stok" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status Setoran" }),
          /* @__PURE__ */ jsx(TableHead, { className: "w-[100px]" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: summary.outletSummaries.map((s) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Store, { className: "h-4 w-4 text-muted-foreground" }),
            s.outlet.nama_outlet
          ] }) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
            "Rp ",
            s.omsetHariIni.toLocaleString("id-ID")
          ] }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
            s.sisaStokItems,
            " item"
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: s.statusSetoran === "verified" ? "default" : s.statusSetoran === "disetor" ? "secondary" : "outline", children: s.statusSetoran }) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(Link, { to: "/app/hq/outlets/$outletId", params: {
            outletId: s.outlet.id
          }, className: "inline-flex items-center text-sm font-medium text-brand-red hover:underline", children: [
            "Detail ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-3 w-3" })
          ] }) })
        ] }, s.outlet.id)) })
      ] }) })
    ] })
  ] });
}
export {
  HQDashboard as component
};
