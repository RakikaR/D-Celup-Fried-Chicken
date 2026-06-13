import { jsx } from "react/jsx-runtime";
import { redirect } from "@tanstack/react-router";
import { u as useAuth } from "./router-CXbiU-0N.js";
import "@tanstack/react-query";
import "react";
import "sonner";
function Index() {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex h-screen items-center justify-center bg-background", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand-red border-t-transparent" }) });
  }
  if (!user) {
    throw redirect({
      to: "/auth"
    });
  }
  if (user.role === "hq_admin") {
    throw redirect({
      to: "/app/hq"
    });
  }
  throw redirect({
    to: "/app/outlet"
  });
}
export {
  Index as component
};
