import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { q as qo } from "./router-DCUrSzod.js";
import { Outlet } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { H as Header, F as Footer } from "./Footer-D2Cg9r5b.js";
import { P as ProductCard } from "./ProductCard-BSnkOkOO.js";
import { useMemo, useState } from "react";
import "sonner";
import "./client-COBIgSbO.js";
import "@supabase/supabase-js";
import "zod";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./format-DbpGJmLP.js";
function MenuPage() {
  const {
    data
  } = useSuspenseQuery(qo);
  const products = data;
  const cats = useMemo(() => ["Tất cả", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [active, setActive] = useState("Tất cả");
  const filtered = active === "Tất cả" ? products : products.filter((p) => p.category === active);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsx("section", { className: "border-b border-border bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-14", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-primary", children: "Menu" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl font-bold md:text-5xl", children: "Thực đơn Highlanduef" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 max-w-2xl text-muted-foreground", children: [
          "Chọn từ ",
          products.length,
          " món signature — pha thủ công, phục vụ trong ngày."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("section", { className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-8 flex flex-wrap gap-2", children: cats.map((c) => /* @__PURE__ */ jsx("button", { onClick: () => setActive(c), className: `rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`, children: c }, c)) }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((p) => /* @__PURE__ */ jsx(ProductCard, { p }, p.id)) })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
export {
  MenuPage as component
};
