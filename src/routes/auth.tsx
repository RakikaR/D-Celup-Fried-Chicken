import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChefHat } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

const demoUsers = [
  {
    id: "user-hq",
    label: "Admin Pusat (HQ)",
    desc: "Akses dashboard & laporan semua outlet",
  },
  {
    id: "user-o1",
    label: "Staff Outlet 1 — Sudirman",
    desc: "Input stok & penjualan Outlet 1",
  },
  {
    id: "user-o2",
    label: "Staff Outlet 2 — Ahmad Yani",
    desc: "Input stok & penjualan Outlet 2",
  },
  {
    id: "user-o3",
    label: "Staff Outlet 3 — Diponegoro",
    desc: "Input stok & penjualan Outlet 3",
  },
];

function AuthPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Handle redirect after user login
  useEffect(() => {
    if (user) {
      const to = user.role === "hq_admin" ? "/app/hq" : "/app/outlet";
      navigate({ to, replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red text-primary-foreground shadow-lg">
            <ChefHat className="h-9 w-9" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            D'Celup Fried Chicken
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sistem Manajemen Stok & Penjualan
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-lg">
              Pilih Akun Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoUsers.map((u) => (
              <Button
                key={u.id}
                variant="outline"
                className="h-auto w-full justify-start gap-3 px-4 py-3 text-left transition-colors hover:border-brand-red hover:bg-brand-red/5"
                onClick={() => login(u.id)}
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {u.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{u.desc}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Belum ada backend database. Semua data disimpan di localStorage
          browser.
        </p>
      </div>
    </div>
  );
}
