import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster } from "sonner";
const appCss = "/assets/styles-DQn0Qfrx.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const AUTH_KEY = "dceLup_auth_user";
const demoUsers = [
  {
    id: "user-hq",
    nama: "Admin Pusat",
    email: "admin@dcelup.id",
    role: "hq_admin"
  },
  {
    id: "user-o1",
    nama: "Budi - Outlet 1",
    email: "outlet1@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-1"
  },
  {
    id: "user-o2",
    nama: "Siti - Outlet 2",
    email: "outlet2@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-2"
  },
  {
    id: "user-o3",
    nama: "Agus - Outlet 3",
    email: "outlet3@dcelup.id",
    role: "outlet_staff",
    outlet_id: "outlet-3"
  }
];
const AuthContext = createContext({
  user: null,
  login: () => {
  },
  logout: () => {
  },
  isAdmin: false,
  isStaff: false,
  isLoading: true
});
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
      setIsLoading(false);
    }
  }, []);
  const login = (userId) => {
    const found = demoUsers.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem(AUTH_KEY, JSON.stringify(found));
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };
  const value = {
    user,
    login,
    logout,
    isAdmin: user?.role === "hq_admin",
    isStaff: user?.role === "outlet_staff",
    currentOutletId: user?.outlet_id,
    isLoading
  };
  return /* @__PURE__ */ jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  return useContext(AuthContext);
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "D'Celup Fried Chicken — Manajemen Stok & Penjualan" },
        {
          name: "description",
          content: "Sistem manajemen stok dan rekap penjualan multi-outlet D'Celup Fried Chicken"
        },
        { name: "author", content: "D'Celup" },
        { property: "og:title", content: "D'Celup Fried Chicken" },
        {
          property: "og:description",
          content: "Sistem manajemen stok dan rekap penjualan multi-outlet"
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" }
      ],
      links: [
        {
          rel: "stylesheet",
          href: appCss
        }
      ]
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent
  }
);
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "id", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-right", richColors: true })
  ] }) });
}
const BASE_URL = "";
const Route$b = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/auth", changefreq: "monthly", priority: "0.5" }
        ];
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const $$splitComponentImporter$a = () => import("./auth-HUKb_Bqe.js");
const Route$a = createFileRoute("/auth")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./app-CPIhDQHT.js");
const Route$9 = createFileRoute("/app")({
  beforeLoad: () => {
  },
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-B_4O-Lvd.js");
const Route$8 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./app.outlet.index-DvOhQr1s.js");
const Route$7 = createFileRoute("/app/outlet/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./app.hq.index-Dblj4lpo.js");
const Route$6 = createFileRoute("/app/hq/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./app.outlet.sales-BqmX7999.js");
const Route$5 = createFileRoute("/app/outlet/sales")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./app.outlet.inventory-DbNaDi2Y.js");
const Route$4 = createFileRoute("/app/outlet/inventory")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./app.outlet.history-DJ6F9WqR.js");
const Route$3 = createFileRoute("/app/outlet/history")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./app.hq.reports-CMW5qLOD.js");
const Route$2 = createFileRoute("/app/hq/reports")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./app.hq.products-Bw-J2kI2.js");
const Route$1 = createFileRoute("/app/hq/products")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./app.hq.outlets._outletId-COOhl68O.js");
const Route = createFileRoute("/app/hq/outlets/$outletId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$b.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$c
});
const AuthRoute = Route$a.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$c
});
const AppRoute = Route$9.update({
  id: "/app",
  path: "/app",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$8.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const AppOutletIndexRoute = Route$7.update({
  id: "/outlet/",
  path: "/outlet/",
  getParentRoute: () => AppRoute
});
const AppHqIndexRoute = Route$6.update({
  id: "/hq/",
  path: "/hq/",
  getParentRoute: () => AppRoute
});
const AppOutletSalesRoute = Route$5.update({
  id: "/outlet/sales",
  path: "/outlet/sales",
  getParentRoute: () => AppRoute
});
const AppOutletInventoryRoute = Route$4.update({
  id: "/outlet/inventory",
  path: "/outlet/inventory",
  getParentRoute: () => AppRoute
});
const AppOutletHistoryRoute = Route$3.update({
  id: "/outlet/history",
  path: "/outlet/history",
  getParentRoute: () => AppRoute
});
const AppHqReportsRoute = Route$2.update({
  id: "/hq/reports",
  path: "/hq/reports",
  getParentRoute: () => AppRoute
});
const AppHqProductsRoute = Route$1.update({
  id: "/hq/products",
  path: "/hq/products",
  getParentRoute: () => AppRoute
});
const AppHqOutletsOutletIdRoute = Route.update({
  id: "/hq/outlets/$outletId",
  path: "/hq/outlets/$outletId",
  getParentRoute: () => AppRoute
});
const AppRouteChildren = {
  AppHqProductsRoute,
  AppHqReportsRoute,
  AppOutletHistoryRoute,
  AppOutletInventoryRoute,
  AppOutletSalesRoute,
  AppHqIndexRoute,
  AppOutletIndexRoute,
  AppHqOutletsOutletIdRoute
};
const AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AppRoute: AppRouteWithChildren,
  AuthRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    context: {
      queryClient: new QueryClient()
    },
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r,
  useAuth as u
};
