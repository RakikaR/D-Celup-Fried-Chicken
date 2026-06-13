import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo, useCallback } from "react";
import { FileDown, Send } from "lucide-react";
import { B as Button } from "./button-BlXBT4eV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DtzFsmho.js";
import { C as Card, c as CardContent, a as CardHeader, b as CardTitle } from "./card-BoUGATr9.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { B as Badge } from "./badge-DyfXZgLs.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import { Document, Page, View, Text, StyleSheet, Font, pdf } from "@react-pdf/renderer";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
Font.register({
  family: "Helvetica",
  fonts: [{ src: "Helvetica" }, { src: "Helvetica-Bold", fontWeight: "bold" }]
});
const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 10, fontFamily: "Helvetica", color: "#333" },
  header: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#D32F2F",
    paddingBottom: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 4
  },
  subtitle: { fontSize: 11, color: "#666" },
  section: { marginTop: 12, marginBottom: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 6
  },
  row: { flexDirection: "row", marginBottom: 4 },
  label: { width: 140, color: "#666" },
  value: { flex: 1, fontWeight: "bold" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#FFF3E0",
    padding: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0"
  },
  colProduk: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colHarga: { flex: 2, textAlign: "right" },
  colSubtotal: { flex: 2, textAlign: "right" },
  totalRow: {
    flexDirection: "row",
    padding: 8,
    backgroundColor: "#FFF8F0",
    borderTopWidth: 1,
    borderColor: "#D32F2F",
    marginTop: 4
  },
  totalLabel: { flex: 1, fontWeight: "bold", color: "#D32F2F" },
  totalValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    color: "#D32F2F"
  },
  footer: { marginTop: 24, fontSize: 9, color: "#999", textAlign: "center" }
});
function formatRupiah(n) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}
function ReportDocument({
  outlet,
  reports,
  products,
  from,
  to
}) {
  const totalOmset = reports.reduce((sum, r) => sum + r.total_penjualan, 0);
  const totalPorsi = reports.reduce(
    (sum, r) => sum + r.detail_item_terjual.reduce((a, d) => a + d.qty, 0),
    0
  );
  return /* @__PURE__ */ jsx(Document, { children: /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsxs(View, { style: styles.header, children: [
      /* @__PURE__ */ jsx(Text, { style: styles.title, children: "D'Celup Fried Chicken" }),
      /* @__PURE__ */ jsxs(Text, { style: styles.subtitle, children: [
        "Laporan Penjualan — ",
        outlet.nama_outlet
      ] }),
      /* @__PURE__ */ jsxs(Text, { style: styles.subtitle, children: [
        "Periode: ",
        from,
        " s/d ",
        to
      ] })
    ] }),
    /* @__PURE__ */ jsxs(View, { style: styles.section, children: [
      /* @__PURE__ */ jsx(Text, { style: styles.sectionTitle, children: "Ringkasan" }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Outlet" }),
        /* @__PURE__ */ jsx(Text, { style: styles.value, children: outlet.nama_outlet })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Lokasi" }),
        /* @__PURE__ */ jsx(Text, { style: styles.value, children: outlet.lokasi })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Total Omset" }),
        /* @__PURE__ */ jsx(Text, { style: styles.value, children: formatRupiah(totalOmset) })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Total Porsi Terjual" }),
        /* @__PURE__ */ jsxs(Text, { style: styles.value, children: [
          totalPorsi,
          " porsi"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Jumlah Laporan" }),
        /* @__PURE__ */ jsxs(Text, { style: styles.value, children: [
          reports.length,
          " hari"
        ] })
      ] })
    ] }),
    reports.map((report) => /* @__PURE__ */ jsxs(View, { style: styles.section, wrap: false, children: [
      /* @__PURE__ */ jsxs(Text, { style: styles.sectionTitle, children: [
        "Tanggal: ",
        report.tanggal
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.row, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.label, children: "Status Setoran" }),
        /* @__PURE__ */ jsx(Text, { style: styles.value, children: report.status_setoran.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxs(View, { style: styles.tableHeader, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.colProduk, children: "Produk" }),
        /* @__PURE__ */ jsx(Text, { style: styles.colQty, children: "Qty" }),
        /* @__PURE__ */ jsx(Text, { style: styles.colHarga, children: "Harga Satuan" }),
        /* @__PURE__ */ jsx(Text, { style: styles.colSubtotal, children: "Subtotal" })
      ] }),
      report.detail_item_terjual.map((item, idx) => {
        const prod = products.find((p) => p.id === item.product_id);
        const unitPrice = prod ? prod.harga : item.subtotal / item.qty;
        return /* @__PURE__ */ jsxs(View, { style: styles.tableRow, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.colProduk, children: item.nama }),
          /* @__PURE__ */ jsx(Text, { style: styles.colQty, children: item.qty }),
          /* @__PURE__ */ jsx(Text, { style: styles.colHarga, children: formatRupiah(unitPrice) }),
          /* @__PURE__ */ jsx(Text, { style: styles.colSubtotal, children: formatRupiah(item.subtotal) })
        ] }, idx);
      }),
      /* @__PURE__ */ jsxs(View, { style: styles.totalRow, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.totalLabel, children: "Total Hari Ini" }),
        /* @__PURE__ */ jsx(Text, { style: styles.totalValue, children: formatRupiah(report.total_penjualan) })
      ] })
    ] }, report.id)),
    /* @__PURE__ */ jsx(View, { style: styles.footer, children: /* @__PURE__ */ jsxs(Text, { children: [
      "Dicetak pada ",
      (/* @__PURE__ */ new Date()).toLocaleString("id-ID"),
      " — D'Celup Fried Chicken"
    ] }) })
  ] }) });
}
function ReportsPage() {
  const outlets = mockApi.getOutlets();
  const products = mockApi.getProducts();
  const [outletId, setOutletId] = useState("all");
  const [from, setFrom] = useState(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - 6);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const filteredSales = useMemo(() => {
    let data = mockApi.getSales();
    if (outletId !== "all") data = data.filter((s) => s.outlet_id === outletId);
    data = data.filter((s) => s.tanggal >= from && s.tanggal <= to);
    return data.sort((a, b) => a.tanggal > b.tanggal ? -1 : 1);
  }, [outletId, from, to]);
  const totalOmset = useMemo(() => filteredSales.reduce((sum, s) => sum + s.total_penjualan, 0), [filteredSales]);
  const downloadPDF = useCallback(async () => {
    const targetOutlet = outletId === "all" ? {
      id: "all",
      nama_outlet: "Semua Outlet",
      lokasi: "-"
    } : outlets.find((o) => o.id === outletId);
    const doc = /* @__PURE__ */ jsx(ReportDocument, { outlet: targetOutlet, reports: filteredSales, products, from, to });
    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-dcelup-${from}-${to}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  }, [outletId, from, to, filteredSales, outlets, products]);
  const shareWhatsApp = useCallback(() => {
    const lines = [`*Laporan D'Celup Fried Chicken*`, `Periode: ${from} s/d ${to}`, ``, `Total Omset: Rp ${totalOmset.toLocaleString("id-ID")}`, `Jumlah Laporan: ${filteredSales.length} hari`, ``, `_Dicetak otomatis dari sistem_`];
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }, [from, to, totalOmset, filteredSales]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Laporan & Export" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Filter dan export laporan penjualan" })
    ] }),
    /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Outlet" }),
        /* @__PURE__ */ jsxs(Select, { value: outletId, onValueChange: setOutletId, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "Semua Outlet" }),
            outlets.map((o) => /* @__PURE__ */ jsx(SelectItem, { value: o.id, children: o.nama_outlet }, o.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Dari Tanggal" }),
        /* @__PURE__ */ jsx(Input, { type: "date", value: from, onChange: (e) => setFrom(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsx(Label, { children: "Sampai Tanggal" }),
        /* @__PURE__ */ jsx(Input, { type: "date", value: to, onChange: (e) => setTo(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { onClick: downloadPDF, className: "gap-2 bg-brand-red hover:bg-brand-red/90", children: [
          /* @__PURE__ */ jsx(FileDown, { className: "h-4 w-4" }),
          "Download PDF"
        ] }),
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: shareWhatsApp, className: "gap-2", children: [
          /* @__PURE__ */ jsx(Send, { className: "h-4 w-4" }),
          "WhatsApp"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
        /* @__PURE__ */ jsxs(CardTitle, { className: "text-lg font-semibold", children: [
          "Hasil Laporan (",
          filteredSales.length,
          " hari)"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-brand-red", children: [
          "Total: Rp ",
          totalOmset.toLocaleString("id-ID")
        ] })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Tanggal" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Outlet" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Omset" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Porsi" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          filteredSales.map((s) => {
            const outlet = outlets.find((o) => o.id === s.outlet_id);
            const porsi = s.detail_item_terjual.reduce((a, d) => a + d.qty, 0);
            return /* @__PURE__ */ jsxs(TableRow, { children: [
              /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: s.tanggal }),
              /* @__PURE__ */ jsx(TableCell, { children: outlet?.nama_outlet ?? s.outlet_id }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
                "Rp ",
                s.total_penjualan.toLocaleString("id-ID")
              ] }),
              /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
                porsi,
                " porsi"
              ] }),
              /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: s.status_setoran === "verified" ? "default" : s.status_setoran === "disetor" ? "secondary" : "outline", children: s.status_setoran }) })
            ] }, s.id);
          }),
          filteredSales.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 5, className: "text-center text-muted-foreground py-8", children: "Tidak ada data untuk periode ini" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  ReportsPage as component
};
