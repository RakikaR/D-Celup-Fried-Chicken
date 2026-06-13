import { jsx, jsxs } from "react/jsx-runtime";
import { redirect } from "@tanstack/react-router";
import { ChefHat } from "lucide-react";
import { B as Button } from "./button-BlXBT4eV.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-BoUGATr9.js";
import { u as useAuth } from "./router-CXbiU-0N.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@tanstack/react-query";
import "sonner";
const demoUsers = [{
  id: "user-hq",
  label: "Admin Pusat (HQ)",
  desc: "Akses dashboard & laporan semua outlet"
}, {
  id: "user-o1",
  label: "Staff Outlet 1 — Sudirman",
  desc: "Input stok & penjualan Outlet 1"
}, {
  id: "user-o2",
  label: "Staff Outlet 2 — Ahmad Yani",
  desc: "Input stok & penjualan Outlet 2"
}, {
  id: "user-o3",
  label: "Staff Outlet 3 — Diponegoro",
  desc: "Input stok & penjualan Outlet 3"
}];
function AuthPage() {
  const {
    login,
    user
  } = useAuth();
  if (user) {
    throw redirect({
      to: user.role === "hq_admin" ? "/app/hq" : "/app/outlet"
    });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red text-primary-foreground shadow-lg", children: /* @__PURE__ */ jsx(ChefHat, { className: "h-9 w-9" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-foreground", children: "D'Celup Fried Chicken" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Sistem Manajemen Stok & Penjualan" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-center text-lg", children: "Pilih Akun Demo" }) }),
      /* @__PURE__ */ jsx(CardContent, { className: "space-y-3", children: demoUsers.map((u) => /* @__PURE__ */ jsx(Button, { variant: "outline", className: "h-auto w-full justify-start gap-3 px-4 py-3 text-left transition-colors hover:border-brand-red hover:bg-brand-red/5", onClick: () => login(u.id), children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground", children: u.label }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: u.desc })
      ] }) }, u.id)) })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: "Belum ada backend database. Semua data disimpan di localStorage browser." })
  ] }) });
}
export {
  AuthPage as component
};
