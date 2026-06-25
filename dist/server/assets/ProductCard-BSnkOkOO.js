import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Coffee, CupSoda, Leaf, Snowflake, Cake } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { B as Button } from "./Footer-D2Cg9r5b.js";
import { u as useCart } from "./router-DCUrSzod.js";
import { f as formatVND } from "./format-DbpGJmLP.js";
import { toast } from "sonner";
const iconFor = (cat) => {
  if (cat.includes("Phin")) return Coffee;
  if (cat.includes("Máy")) return CupSoda;
  if (cat.includes("Trà")) return Leaf;
  if (cat.includes("Freeze")) return Snowflake;
  return Cake;
};
function ProductCard({ p }) {
  const { add } = useCart();
  const Icon = iconFor(p.category);
  return /* @__PURE__ */ jsxs("article", { className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-warm", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/menu/$id",
        params: { id: p.id },
        className: "relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary",
        children: [
          p.image_url ? /* @__PURE__ */ jsx(
            "img",
            {
              src: p.image_url,
              alt: p.name,
              loading: "lazy",
              className: "absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            }
          ) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-sun opacity-40" }),
            /* @__PURE__ */ jsx(Icon, { className: "relative size-16 text-accent", strokeWidth: 1.4 })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary", children: p.category })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col gap-3 p-4", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/menu/$id", params: { id: p.id }, className: "hover:text-primary", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-base font-bold leading-tight", children: p.name }),
        p.description && /* @__PURE__ */ jsx("p", { className: "mt-1 line-clamp-2 text-sm text-muted-foreground", children: p.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-extrabold text-primary", children: formatVND(p.price) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            variant: "hero",
            disabled: !p.is_available,
            onClick: () => {
              add({ id: p.id, name: p.name, price: p.price });
              toast.success(`Đã thêm ${p.name} vào giỏ`);
            },
            children: "Thêm"
          }
        )
      ] })
    ] })
  ] });
}
export {
  ProductCard as P
};
