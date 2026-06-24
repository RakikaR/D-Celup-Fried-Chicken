import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  Store,
  TrendingUp,
  Package,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
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
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { mockApi } from "@/lib/data/mock";

export const Route = createFileRoute("/app/hq/")({
  component: HQDashboard,
});

function HQDashboard() {
  const summary = useMemo(() => mockApi.getDashboardSummary(), []);
  const outlets = mockApi.getOutlets();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Ringkasan operasional seluruh outlet
        </p>
      </div>

      <SummaryCards
        totalOmsetHariIni={summary.totalOmsetHariIni}
        totalOmsetBulanIni={summary.totalOmsetBulanIni}
        totalPorsiHariIni={summary.totalPorsiHariIni}
        outletAktif={summary.outletAktif}
      />

      <SalesChart data={summary.chartData} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Status Outlet Hari Ini
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {new Date().toLocaleDateString("id-ID")}
          </Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Outlet</TableHead>
                <TableHead className="text-right">Omset Hari Ini</TableHead>
                <TableHead className="text-right">Item Stok</TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.outletSummaries.map((s) => (
                <TableRow key={s.outlet.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-muted-foreground" />
                      {s.outlet.nama_outlet}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    Rp {s.omsetHariIni.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-right">
                    {s.sisaStokItems} item
                  </TableCell>
                  
                  <TableCell>
                    <Link
                      to="/app/hq/outlets/$outletId"
                      params={{ outletId: s.outlet.id }}
                      className="inline-flex items-center text-sm font-medium text-brand-red hover:underline"
                    >
                      Detail <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
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
