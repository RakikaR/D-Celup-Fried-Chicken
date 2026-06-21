import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SalesForm } from "@/components/forms/SalesForm";
import { useAuth } from "@/hooks/use-auth";
import { mockApi } from "@/lib/data/mock";
import type { SalesDetail } from "@/lib/data/types";

export const Route = createFileRoute("/app/outlet/sales")({
  component: OutletSales,
});

function OutletSales() {
  const { currentOutletId } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = new Date().toISOString().slice(0, 10);
  const products = mockApi.getProducts();

  function handleSave(total: number, detail: SalesDetail[]) {
    const existing = mockApi.getSales(outletId, today, today);
    const report = {
      id: existing[0]?.id ?? `sales-${Date.now()}`,
      outlet_id: outletId,
      tanggal: today,
      total_penjualan: total,
      detail_item_terjual: detail,

      catatan: "",
    };
    mockApi.upsertSales(report);
    toast.success("Data penjualan berhasil disimpan!");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Input Penjualan</h1>
        <p className="text-sm text-muted-foreground">
          Catat penjualan harian untuk {new Date().toLocaleDateString("id-ID")}
        </p>
      </div>

      <SalesForm products={products} onSave={handleSave} />
    </div>
  );
}
