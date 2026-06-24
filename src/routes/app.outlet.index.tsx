import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ClipboardList,
  ShoppingCart,
  History,
  TrendingUp,
  Package,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import { useAuth } from "@/hooks/use-auth";
import { mockApi } from "@/lib/data/mock";

export const Route = createFileRoute("/app/outlet/")({
  component: OutletDashboard,
});

function OutletDashboard() {
  const { currentOutletId } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";

  const today = new Date().toISOString().slice(0, 10);
  const outlet = mockApi.getOutlets().find((o) => o.id === outletId);
  const todaySales = mockApi.getSales(outletId, today, today);
  const todayInventory = mockApi.getInventory(outletId, today);

  const totalOmset = useMemo(
    () => todaySales.reduce((sum, s) => sum + s.total_penjualan, 0),
    [todaySales],
  );

  const totalPorsi = useMemo(
    () =>
      todaySales.reduce(
        (sum, s) => sum + s.detail_item_terjual.reduce((a, d) => a + d.qty, 0),
        0,
      ),
    [todaySales],
  );



  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {outlet?.nama_outlet}
        </h1>
        <p className="text-sm text-muted-foreground">{outlet?.lokasi}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Omset Hari Ini
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-brand-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              Rp {totalOmset.toLocaleString("id-ID")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Porsi Terjual
            </CardTitle>
            <Package className="h-5 w-5 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalPorsi} porsi
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link to="/app/outlet/inventory">
          <Card className="transition-colors hover:border-brand-red hover:bg-brand-red/5 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Stok Opname
                </h3>
                <p className="text-sm text-muted-foreground">
                  Input stok bahan baku hari ini
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/app/outlet/sales">
          <Card className="transition-colors hover:border-brand-orange hover:bg-brand-orange/5 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Input Penjualan
                </h3>
                <p className="text-sm text-muted-foreground">
                  Catat omset dan porsi terjual
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/app/outlet/history">
          <Card className="transition-colors hover:border-brand-gold hover:bg-brand-gold/5 cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
                <History className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Riwayat Transaksi
                </h3>
                <p className="text-sm text-muted-foreground">
                  Lihat 30 hari terakhir
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
