import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { C as Card, c as CardContent } from "./card-BoUGATr9.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { u as useAuth } from "./router-CXbiU-0N.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "class-variance-authority";
import "@tanstack/react-query";
import "@tanstack/react-router";
import "sonner";
function OutletHistory() {
  const {
    currentOutletId
  } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const thirtyDaysAgo = /* @__PURE__ */ new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sales = useMemo(() => mockApi.getSales(outletId, thirtyDaysAgo.toISOString().slice(0, 10), today), [outletId, today]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Riwayat Transaksi" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "30 hari terakhir" })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Omset" }),
        /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Porsi" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Status Setoran" }),
        /* @__PURE__ */ jsx(TableHead, { children: "Catatan" })
      ] }) }),
      /* @__PURE__ */ jsxs(TableBody, { children: [
        sales.map((s) => {
          const porsi = s.detail_item_terjual.reduce((a, d) => a + d.qty, 0);
          return /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(CalendarDays, { className: "h-4 w-4 text-muted-foreground" }),
              s.tanggal
            ] }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
              "Rp ",
              s.total_penjualan.toLocaleString("id-ID")
            ] }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
              porsi,
              " porsi"
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: s.status_setoran === "verified" ? "default" : s.status_setoran === "disetor" ? "secondary" : "outline", children: s.status_setoran }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground", children: s.catatan || "-" })
          ] }, s.id);
        }),
        sales.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-8", children: "Belum ada data penjualan" }) })
      ] })
    ] }) }) })
  ] });
}
export {
  OutletHistory as component
};
