import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { B as Button } from "./button-BlXBT4eV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DTe8R5jG.js";
import { u as useAuth } from "./router-CXbiU-0N.js";
import { m as mockApi } from "./mock-DMrNMZHC.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "@tanstack/react-router";
const defaultBahan = [
  { nama: "Potongan Ayam", satuan: "pcs" },
  { nama: "Tepung Fried Chicken", satuan: "kg" },
  { nama: "Minyak Goreng", satuan: "liter" },
  { nama: "Saus Sambal", satuan: "ml" },
  { nama: "Saus Tomat", satuan: "ml" },
  { nama: "Nasi", satuan: "kg" },
  { nama: "Cup Plastik", satuan: "pcs" },
  { nama: "Tahu", satuan: "pcs" },
  { nama: "Tempe", satuan: "pcs" }
];
function InventoryForm({
  outletId,
  tanggal,
  onSave,
  initialItems
}) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (initialItems && initialItems.length > 0) {
      setItems(initialItems);
    } else {
      setItems(
        defaultBahan.map((bb) => ({
          id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          outlet_id: outletId,
          nama_bahan: bb.nama,
          satuan: bb.satuan,
          stok_awal: 0,
          stok_masuk: 0,
          stok_akhir: 0,
          terpakai: 0,
          tanggal
        }))
      );
    }
  }, [initialItems, outletId, tanggal]);
  function updateItem(index, field, value) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      if (field === "stok_awal" || field === "stok_masuk" || field === "stok_akhir") {
        const awal = Number(next[index].stok_awal);
        const masuk = Number(next[index].stok_masuk);
        const akhir = Number(next[index].stok_akhir);
        next[index] = { ...next[index], terpakai: awal + masuk - akhir };
      }
      return next;
    });
  }
  function addRow() {
    setItems((prev) => [
      ...prev,
      {
        id: `inv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        outlet_id: outletId,
        nama_bahan: "",
        satuan: "pcs",
        stok_awal: 0,
        stok_masuk: 0,
        stok_akhir: 0,
        terpakai: 0,
        tanggal
      }
    ]);
  }
  function removeRow(index) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }
  function handleSave() {
    onSave(items);
  }
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-semibold", children: "Input Stok Opname" }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "Tanggal: ",
        tanggal
      ] })
    ] }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-lg border", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { className: "min-w-[160px]", children: "Nama Bahan" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Satuan" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Stok Awal" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Stok Masuk" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Stok Akhir" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Terpakai" }),
          /* @__PURE__ */ jsx(TableHead, { className: "w-[40px]" })
        ] }) }),
        /* @__PURE__ */ jsx(TableBody, { children: items.map((item, idx) => /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              value: item.nama_bahan,
              onChange: (e) => updateItem(idx, "nama_bahan", e.target.value),
              placeholder: "Nama bahan...",
              className: "min-w-[140px]"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              value: item.satuan,
              onChange: (e) => updateItem(idx, "satuan", e.target.value),
              className: "w-20"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: item.stok_awal,
              onChange: (e) => updateItem(idx, "stok_awal", Number(e.target.value)),
              className: "w-24 text-right"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: item.stok_masuk,
              onChange: (e) => updateItem(idx, "stok_masuk", Number(e.target.value)),
              className: "w-24 text-right"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Input,
            {
              type: "number",
              value: item.stok_akhir,
              onChange: (e) => updateItem(idx, "stok_akhir", Number(e.target.value)),
              className: "w-24 text-right"
            }
          ) }),
          /* @__PURE__ */ jsx(TableCell, { className: "text-right font-medium text-brand-red", children: item.terpakai }),
          /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "icon",
              onClick: () => removeRow(idx),
              className: "h-8 w-8 text-muted-foreground hover:text-destructive",
              children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
            }
          ) })
        ] }, item.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", onClick: addRow, className: "gap-2", children: [
          /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }),
          "Tambah Bahan"
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleSave,
            className: "gap-2 bg-brand-red hover:bg-brand-red/90",
            children: "Simpan Stok Opname"
          }
        )
      ] })
    ] })
  ] });
}
function OutletInventory() {
  const {
    currentOutletId
  } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const [initialItems, setInitialItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const items = mockApi.getInventory(outletId, today);
    setInitialItems(items);
    setLoaded(true);
  }, [outletId, today]);
  function handleSave(items) {
    mockApi.upsertInventory(items);
    setInitialItems(mockApi.getInventory(outletId, today));
    toast.success("Stok opname berhasil disimpan!");
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "Stok Opname Harian" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Input stok bahan baku awal, masuk, dan akhir hari ini" })
    ] }),
    loaded ? /* @__PURE__ */ jsx(InventoryForm, { outletId, tanggal: today, initialItems, onSave: handleSave }) : /* @__PURE__ */ jsx("div", { className: "flex h-48 items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" }) })
  ] });
}
export {
  OutletInventory as component
};
