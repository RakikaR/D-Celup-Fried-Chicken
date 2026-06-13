import { jsxs, jsx } from "react/jsx-runtime";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { B as Button } from "./button-BlXBT4eV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DtzFsmho.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { u as useAuth } from "./router-CXbiU-0N.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
import "@tanstack/react-query";
import "@tanstack/react-router";
function SalesForm({ products, onSave }) {
  const [lines, setLines] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);
  const activeProducts = products.filter((p) => p.is_active);
  function addLine() {
    if (!selectedProduct) return;
    const existing = lines.find((l) => l.productId === selectedProduct);
    if (existing) {
      setLines(
        (prev) => prev.map(
          (l) => l.productId === selectedProduct ? { ...l, qty: l.qty + selectedQty } : l
        )
      );
    } else {
      setLines((prev) => [
        ...prev,
        { productId: selectedProduct, qty: selectedQty }
      ]);
    }
    setSelectedProduct("");
    setSelectedQty(1);
  }
  function removeLine(productId) {
    setLines((prev) => prev.filter((l) => l.productId !== productId));
  }
  function updateQty(productId, qty) {
    if (qty <= 0) {
      removeLine(productId);
      return;
    }
    setLines(
      (prev) => prev.map((l) => l.productId === productId ? { ...l, qty } : l)
    );
  }
  const detail = lines.map((l) => {
    const prod = activeProducts.find((p) => p.id === l.productId);
    if (!prod) return null;
    return {
      product_id: l.productId,
      nama: prod.nama_produk,
      qty: l.qty,
      subtotal: l.qty * prod.harga
    };
  }).filter(Boolean);
  const total = detail.reduce((sum, d) => sum + d.subtotal, 0);
  function handleSave() {
    onSave(total, detail);
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Input Penjualan Harian" }) }),
    /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block text-sm font-medium", children: "Produk" }),
          /* @__PURE__ */ jsxs(Select, { value: selectedProduct, onValueChange: setSelectedProduct, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih produk..." }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: activeProducts.map((p) => /* @__PURE__ */ jsxs(SelectItem, { value: p.id, children: [
              p.nama_produk,
              " — Rp ",
              p.harga.toLocaleString("id-ID")
            ] }, p.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "w-28", children: [
          /* @__PURE__ */ jsx(Label, { className: "mb-1.5 block text-sm font-medium", children: "Qty" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              min: 1,
              value: selectedQty,
              onChange: (e) => setSelectedQty(Math.max(1, Number(e.target.value)))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: addLine,
            className: "bg-brand-red hover:bg-brand-red/90",
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4 mr-1" }),
              "Tambah"
            ]
          }
        )
      ] }),
      lines.length > 0 && /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Produk" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Harga" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Qty" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Subtotal" }),
          /* @__PURE__ */ jsx(TableHead, { className: "w-[40px]" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: detail.map((d) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: d.nama }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right", children: [
            "Rp",
            " ",
            products.find((p) => p.id === d.product_id)?.harga.toLocaleString("id-ID")
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              min: 0,
              value: d.qty,
              onChange: (e) => updateQty(d.product_id, Number(e.target.value)),
              className: "w-20 text-right ml-auto"
            }
          ) }),
          /* @__PURE__ */ jsxs(TableCell, { className: "text-right font-semibold", children: [
            "Rp ",
            d.subtotal.toLocaleString("id-ID")
          ] }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => removeLine(d.product_id),
              className: "h-8 w-8 text-muted-foreground hover:text-destructive",
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          ) })
        ] }, d.product_id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-lg bg-muted p-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Total Penjualan" }),
          /* @__PURE__ */ jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
            "Rp ",
            total.toLocaleString("id-ID")
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleSave,
            disabled: lines.length === 0,
            className: "bg-brand-red hover:bg-brand-red/90",
            children: "Simpan Penjualan"
          }
        )
      ] })
    ] })
  ] });
}
function OutletSales() {
  const {
    currentOutletId
  } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const products = mockApi.getProducts();
  function handleSave(total, detail) {
    const existing = mockApi.getSales(outletId, today, today);
    const report = {
      id: existing[0]?.id ?? `sales-${Date.now()}`,
      outlet_id: outletId,
      tanggal: today,
      total_penjualan: total,
      detail_item_terjual: detail,
      status_setoran: existing[0]?.status_setoran ?? "pending",
      catatan: ""
    };
    mockApi.upsertSales(report);
    toast.success("Data penjualan berhasil disimpan!");
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Input Penjualan" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Catat penjualan harian untuk ",
        (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID")
      ] })
    ] }),
    /* @__PURE__ */ jsx(SalesForm, { products, onSave: handleSave })
  ] });
}
export {
  OutletSales as component
};
