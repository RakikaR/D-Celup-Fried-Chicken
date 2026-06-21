import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/table";
import { useAuth } from "@/hooks/use-auth";
import { mockApi } from "@/lib/data/mock";

export const Route = createFileRoute("/app/outlet/history")({
  component: OutletHistory,
});

function OutletHistory() {
  const { currentOutletId } = useAuth();
  const outletId = currentOutletId ?? "outlet-1";
  const today = new Date().toISOString().slice(0, 10);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sales = useMemo(
    () =>
      mockApi.getSales(
        outletId,
        thirtyDaysAgo.toISOString().slice(0, 10),
        today,
      ),
    [outletId, today],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Riwayat Transaksi
        </h1>
        <p className="text-sm text-muted-foreground">30 hari terakhir</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Omset</TableHead>
                <TableHead className="text-right">Porsi</TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((s) => {
                const porsi = s.detail_item_terjual.reduce(
                  (a, d) => a + d.qty,
                  0,
                );
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        {s.tanggal}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      Rp {s.total_penjualan.toLocaleString("id-ID")}
                    </TableCell>
                    <TableCell className="text-right">{porsi} porsi</TableCell>
                    
                  </TableRow>
                );
              })}
              {sales.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground py-8"
                  >
                    Belum ada data penjualan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
