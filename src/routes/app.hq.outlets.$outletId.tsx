import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Store, TrendingUp, Package } from "lucide-react";
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
import { mockApi } from "@/lib/data/mock";

export const Route = createFileRoute("/app/hq/outlets/$outletId")({
  component: OutletDetail,
});

function OutletDetail() {
  const { outletId } = Route.useParams();
  const outlets = mockApi.getOutlets();
  const outlet = outlets.find((o) => o.id === outletId);

  const today = new Date().toISOString().slice(0, 10);
  const inventory = mockApi.getInventory(outletId, today);
  const sales = mockApi.getSales(outletId);

  const totalOmset = useMemo(
    () => sales.reduce((s, r) => s + r.total_penjualan, 0),
    [sales],
  );
  const totalPorsi = useMemo(
    () =>
      sales.reduce(
        (s, r) => s + r.detail_item_terjual.reduce((a, d) => a + d.qty, 0),
        0,
      ),
    [sales],
  );

  if (!outlet) {
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Outlet tidak ditemukan
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/app/hq"
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {outlet.nama_outlet}
        </h1>
        <p className="text-sm text-muted-foreground">{outlet.lokasi}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Omset (7 Hari)
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
              Total Porsi Terjual
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-brand-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {totalPorsi} porsi
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Item Stok Hari Ini
            </CardTitle>
            <Package className="h-5 w-5 text-brand-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {inventory.length} bahan
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Stok Opname Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          {inventory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bahan</TableHead>
                  <TableHead>Satuan</TableHead>
                  <TableHead className="text-right">Awal</TableHead>
                  <TableHead className="text-right">Masuk</TableHead>
                  <TableHead className="text-right">Akhir</TableHead>
                  <TableHead className="text-right">Terpakai</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.nama_bahan}
                    </TableCell>
                    <TableCell>{item.satuan}</TableCell>
                    <TableCell className="text-right">
                      {item.stok_awal}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.stok_masuk}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.stok_akhir}
                    </TableCell>
                    <TableCell className="text-right font-medium text-brand-red">
                      {item.terpakai}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              Belum ada data stok untuk hari ini.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Riwayat Penjualan (7 Hari)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Total Penjualan</TableHead>
                <TableHead className="text-right">Jumlah Item</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.tanggal}</TableCell>
                  <TableCell className="text-right">
                    Rp {s.total_penjualan.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {s.detail_item_terjual.length} item
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
