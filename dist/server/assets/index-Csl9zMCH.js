import { jsxs, jsx } from "react/jsx-runtime";
import { p as productsQO } from "./router-DCUrSzod.js";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { H as Header, B as Button, l as logo, F as Footer } from "./Footer-D2Cg9r5b.js";
import { P as ProductCard } from "./ProductCard-BSnkOkOO.js";
import { Sparkles, Coffee, Leaf, MapPin } from "lucide-react";
import "react";
import "sonner";
import "./client-COBIgSbO.js";
import "@supabase/supabase-js";
import "zod";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./format-DbpGJmLP.js";
function HomePage() {
  const {
    data
  } = useSuspenseQuery(productsQO);
  const products = data;
  const featured = products.slice(0, 6);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden bg-hero text-primary-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-32 -top-32 size-96 rounded-full bg-sun opacity-40 blur-2xl" }),
      /* @__PURE__ */ jsx("div", { className: "absolute -left-20 bottom-0 size-72 rounded-full bg-accent/20 blur-3xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:py-28", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
          /* @__PURE__ */ jsxs("span", { className: "inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-accent", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "size-3" }),
            " Hương vị Việt từ cao nguyên"
          ] }),
          /* @__PURE__ */ jsxs("h1", { className: "mt-5 font-display text-5xl font-extrabold leading-[1.05] text-balance md:text-6xl", children: [
            "Phin đậm. ",
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Trà thanh." }),
            /* @__PURE__ */ jsx("br", {}),
            "Hương vị Highlanduef."
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-md text-base opacity-90", children: "Lấy cảm hứng từ menu Highlands Coffee — Phin Sữa Đá, Trà Sen Vàng, Freeze Trà Xanh — pha bằng đam mê của Highlanduef." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "gold", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/menu", children: "Khám phá thực đơn" }) }),
            /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white", children: /* @__PURE__ */ jsx(Link, { to: "/checkout", children: "Đặt ngay" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 flex gap-8 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-bold text-accent", children: "13+" }),
              /* @__PURE__ */ jsx("div", { className: "opacity-70", children: "Món signature" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-bold text-accent", children: "100%" }),
              /* @__PURE__ */ jsx("div", { className: "opacity-70", children: "Hạt Robusta Việt" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "font-display text-2xl font-bold text-accent", children: "06:30" }),
              /* @__PURE__ */ jsx("div", { className: "opacity-70", children: "Mở mỗi sáng" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" }),
          /* @__PURE__ */ jsx("img", { src: logo, alt: "Highlanduef Logo", className: "relative z-10 w-[320px] md:w-[420px] object-contain drop-shadow-2xl" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-3", children: [{
      icon: Coffee,
      title: "Cà phê phin truyền thống",
      desc: "Pha tay từng ly, đậm vị Robusta cao nguyên."
    }, {
      icon: Leaf,
      title: "Trà & thảo mộc",
      desc: "Trà sen vàng, ô long thạch đào — thanh mát mỗi ngày."
    }, {
      icon: MapPin,
      title: "Phục vụ tận tâm",
      desc: "Đặt online, nhận tại quán hoặc giao tận nơi."
    }].map((v) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-card", children: [
      /* @__PURE__ */ jsx(v.icon, { className: "size-8 text-primary", strokeWidth: 1.6 }),
      /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-lg font-bold", children: v.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: v.desc })
    ] }, v.title)) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-6xl px-4 py-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-widest text-primary", children: "Signature" }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold md:text-4xl", children: "Món được yêu thích" })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/menu", children: "Xem tất cả" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: featured.map((p) => /* @__PURE__ */ jsx(ProductCard, { p }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto mt-16 max-w-6xl px-4", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-3xl bg-hero p-10 text-primary-foreground md:p-16", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-10 -top-10 size-64 rounded-full bg-sun opacity-40 blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "relative max-w-xl", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl font-bold md:text-4xl", children: "Sẵn sàng pha một ly Highlanduef?" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 opacity-90", children: "Đặt online trong 60 giây — giao trong vòng 30 phút khu vực trung tâm." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "gold", size: "lg", className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/menu", children: "Đặt ngay" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  HomePage as component
};
