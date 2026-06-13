import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { InventoryForm } from "@/components/forms/InventoryForm";
import { useAuth } from "@/hooks/use-auth";
import { mockApi } from "@/lib/data/mock";
import type { InventoryItem } from "@/lib/data/types";

export const Route = createFileRoute("/app/outlet/inventory")({
  component: OutletInventory,
});

function OutletInventory() {
  const { currentOutletId } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = new Date().toISOString().slice(0, 10);

  const [initialItems, setInitialItems] = useState<InventoryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const items = mockApi.getInventory(outletId, today);
    setInitialItems(items);
    setLoaded(true);
  }, [outletId, today]);

  function handleSave(items: InventoryItem[]) {
    mockApi.upsertInventory(items);
    setInitialItems(mockApi.getInventory(outletId, today));
    toast.success("Stok opname berhasil disimpan!");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Stok Opname Harian
        </h1>
        <p className="text-sm text-muted-foreground">
          Input stok bahan baku awal, masuk, dan akhir hari ini
        </p>
      </div>

      {loaded ? (
        <InventoryForm
          outletId={outletId}
          tanggal={today}
          initialItems={initialItems}
          onSave={handleSave}
        />
      ) : (
        <div className="flex h-48 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" />
        </div>
      )}
    </div>
  );
}
