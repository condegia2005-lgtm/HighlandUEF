import { jsxs, jsx } from "react/jsx-runtime";
import { R as Route, a as qo, u as useCart } from "./router-DCUrSzod.js";
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Coffee, CupSoda, Leaf, Snowflake, Cake } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import { H as Header, F as Footer } from "./Footer-D2Cg9r5b.js";
import { f as formatVND } from "./format-DbpGJmLP.js";
import { toast } from "sonner";
import "./client-COBIgSbO.js";
import "@supabase/supabase-js";
import "zod";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const iconFor = (cat) => {
  if (cat.includes("Phin")) return Coffee;
  if (cat.includes("Máy")) return CupSoda;
  if (cat.includes("Trà")) return Leaf;
  if (cat.includes("Freeze")) return Snowflake;
  return Cake;
};
const SIZES = [{
  key: "S",
  delta: 0
}, {
  key: "M",
  delta: 1e4
}, {
  key: "L",
  delta: 2e4
}];
const hasSizes = (cat) => !cat.toLowerCase().includes("bánh");
function ProductDetailPage() {
  const {
    id
  } = Route.useParams();
  const {
    data
  } = useSuspenseQuery(qo);
  const products = data;
  const p = products.find((x) => x.id === id);
  const {
    add
  } = useCart();
  const [size, setSize] = useState("S");
  const scrollerRef = useRef(null);
  const sideList = useMemo(() => {
    if (!p) return [];
    return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  }, [products, p]);
  const carousel = useMemo(() => {
    if (!p) return [];
    return products.filter((x) => x.id !== p.id);
  }, [products, p]);
  if (!p) {
    return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Header, {}),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl px-4 py-20 text-center", children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold", children: "Không tìm thấy món này" }),
        /* @__PURE__ */ jsx(Link, { to: "/menu", className: "mt-6 inline-block text-primary underline", children: "Về thực đơn" })
      ] }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  const Icon = iconFor(p.category);
  const showSizes = hasSizes(p.category);
  const sizeDelta = showSizes ? SIZES.find((s) => s.key === size).delta : 0;
  const finalPrice = p.price + sizeDelta;
  const handleAdd = () => {
    const lineId = showSizes ? `${p.id}::${size}` : p.id;
    const lineName = showSizes ? `${p.name} (${size})` : p.name;
    add({
      id: lineId,
      name: lineName,
      price: finalPrice
    });
    toast.success(`Đã thêm ${lineName} vào giỏ`);
  };
  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.8,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("div", { className: "h-1.5 w-full bg-primary" }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto w-full max-w-7xl flex-1 px-4 py-12", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-12 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "mb-2 text-sm font-bold uppercase tracking-widest text-primary", children: p.category }),
          /* @__PURE__ */ jsx("h1", { className: "mb-6 font-display text-5xl font-extrabold", children: p.name }),
          /* @__PURE__ */ jsx("div", { className: "relative flex aspect-square items-center justify-center overflow-hidden rounded-md border border-border bg-white", children: p.image_url ? /* @__PURE__ */ jsx("img", { src: p.image_url, alt: p.name, className: "size-full object-contain" }) : /* @__PURE__ */ jsx(Icon, { className: "size-32 text-primary", strokeWidth: 1.2 }) }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex gap-3", children: /* @__PURE__ */ jsx("div", { className: "size-20 overflow-hidden rounded border-2 border-primary bg-white p-1", children: p.image_url ? /* @__PURE__ */ jsx("img", { src: p.image_url, alt: "", className: "size-full object-contain" }) : /* @__PURE__ */ jsx(Icon, { className: "size-full text-primary", strokeWidth: 1.2 }) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center", children: [
          p.description && /* @__PURE__ */ jsx("p", { className: "max-w-xl text-lg leading-8 text-foreground/80", children: p.description }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: handleAdd, disabled: !p.is_available, className: "mt-8 h-20 w-full rounded-lg bg-primary text-3xl font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60", children: "Đặt mua ngay" }),
          showSizes && /* @__PURE__ */ jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Size :" }),
            SIZES.map((s) => {
              const selected = s.key === size;
              return /* @__PURE__ */ jsx("button", { type: "button", onClick: () => setSize(s.key), className: `flex size-9 items-center justify-center rounded border-2 text-sm font-bold transition-colors ${selected ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-foreground hover:border-primary/40"}`, children: s.key }, s.key);
            })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 text-xl", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Giá : " }),
            /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-extrabold text-primary", children: formatVND(finalPrice).replace("đ", "VNĐ") })
          ] })
        ] }),
        sideList.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-6 text-2xl font-bold", children: "Bạn có thể thích" }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-3", children: sideList.map((r) => /* @__PURE__ */ jsxs(Link, { to: "/menu/$id", params: {
            id: r.id
          }, className: "group rounded-xl border bg-card p-4 transition hover:shadow-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-lg bg-white", children: /* @__PURE__ */ jsx("img", { src: r.image_url ?? "", alt: r.name, className: "h-full w-full object-contain transition group-hover:scale-105" }) }),
            /* @__PURE__ */ jsx("h3", { className: "mt-4 font-bold", children: r.name }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: r.description }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 font-bold text-primary", children: formatVND(r.price) })
          ] }, r.id)) })
        ] })
      ] }),
      carousel.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-20", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => scrollBy(-1), className: "flex size-9 items-center justify-center rounded border border-border bg-card hover:border-primary hover:text-primary", "aria-label": "Trước", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "size-4" }) }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => scrollBy(1), className: "flex size-9 items-center justify-center rounded border border-border bg-card hover:border-primary hover:text-primary", "aria-label": "Sau", children: /* @__PURE__ */ jsx(ChevronRight, { className: "size-4" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: scrollerRef, className: "flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-thin", style: {
          scrollbarWidth: "thin"
        }, children: carousel.map((r) => /* @__PURE__ */ jsxs(Link, { to: "/menu/$id", params: {
          id: r.id
        }, className: "group w-[260px] shrink-0 snap-start", children: [
          /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-md border border-border bg-white", children: r.image_url ? /* @__PURE__ */ jsx("img", { src: r.image_url, alt: r.name, className: "size-full object-contain transition-transform group-hover:scale-105" }) : /* @__PURE__ */ jsx("div", { className: "flex size-full items-center justify-center bg-secondary", children: /* @__PURE__ */ jsx(Coffee, { className: "size-16 text-primary" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 text-center", children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-sm font-extrabold uppercase tracking-wide group-hover:text-primary", children: r.name }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Giá : " }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-primary", children: formatVND(r.price).replace("đ", "VNĐ") })
            ] })
          ] })
        ] }, r.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  ProductDetailPage as component
};
