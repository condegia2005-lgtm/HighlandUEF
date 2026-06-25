import { jsx, jsxs } from "react/jsx-runtime";
import { useRouter, isRedirect, useNavigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { c as cn, H as Header, B as Button, F as Footer } from "./Footer-D2Cg9r5b.js";
import { u as useCart } from "./router-DCUrSzod.js";
import { f as formatVND } from "./format-DbpGJmLP.js";
import { L as Label, I as Input } from "./label-C1U8tsOH.js";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-DBbPav2g.js";
import { z } from "zod";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./client-COBIgSbO.js";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@radix-ui/react-label";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const orderInput = z.object({
  customer_name: z.string().trim().min(1).max(120),
  customer_phone: z.string().trim().min(8).max(20).regex(/^[0-9+\-\s()]+$/),
  customer_address: z.string().trim().max(300).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    product_name: z.string().min(1).max(120),
    unit_price: z.number().int().min(0).max(1e7),
    quantity: z.number().int().min(1).max(99)
  })).min(1).max(50)
});
const createOrder = createServerFn({
  method: "POST"
}).inputValidator((v) => orderInput.parse(v)).handler(createSsrRpc("7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3"));
function CheckoutPage() {
  const {
    items,
    setQty,
    remove,
    total,
    clear
  } = useCart();
  const navigate = useNavigate();
  const submit = useServerFn(createOrder);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: ""
  });
  async function onSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return toast.error("Giỏ hàng trống");
    setLoading(true);
    try {
      const res = await submit({
        data: {
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: form.address || null,
          note: form.note || null,
          items: items.map((i) => ({
            product_id: i.id,
            product_name: i.name,
            unit_price: i.price,
            quantity: i.quantity
          }))
        }
      });
      toast.success("Đặt hàng thành công! Mã đơn: " + res.id.slice(0, 8));
      clear();
      navigate({
        to: "/"
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto w-full max-w-5xl flex-1 px-4 py-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl font-bold md:text-4xl", children: "Giỏ hàng & đặt món" }),
      items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Giỏ hàng đang trống." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "hero", className: "mt-4", children: /* @__PURE__ */ jsx(Link, { to: "/menu", children: "Xem thực đơn" }) })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-[1fr_360px]", children: [
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border bg-card p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: i.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: formatVND(i.price) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(i.id, i.quantity - 1), children: /* @__PURE__ */ jsx(Minus, { className: "size-3" }) }),
            /* @__PURE__ */ jsx("span", { className: "w-8 text-center font-semibold", children: i.quantity }),
            /* @__PURE__ */ jsx(Button, { size: "icon", variant: "outline", onClick: () => setQty(i.id, i.quantity + 1), children: /* @__PURE__ */ jsx(Plus, { className: "size-3" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-24 text-right font-semibold text-primary", children: formatVND(i.price * i.quantity) }),
          /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(i.id), children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) })
        ] }, i.id)) }),
        /* @__PURE__ */ jsxs("form", { onSubmit, className: "space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-display text-lg font-bold", children: "Thông tin nhận hàng" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Họ tên *" }),
            /* @__PURE__ */ jsx(Input, { id: "name", required: true, maxLength: 120, value: form.name, onChange: (e) => setForm({
              ...form,
              name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "phone", children: "Số điện thoại *" }),
            /* @__PURE__ */ jsx(Input, { id: "phone", required: true, minLength: 8, maxLength: 20, value: form.phone, onChange: (e) => setForm({
              ...form,
              phone: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "address", children: "Địa chỉ giao hàng" }),
            /* @__PURE__ */ jsx(Input, { id: "address", maxLength: 300, value: form.address, onChange: (e) => setForm({
              ...form,
              address: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "note", children: "Ghi chú" }),
            /* @__PURE__ */ jsx(Textarea, { id: "note", maxLength: 300, value: form.note, onChange: (e) => setForm({
              ...form,
              note: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-t border-border pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-lg", children: [
            /* @__PURE__ */ jsx("span", { children: "Tổng cộng" }),
            /* @__PURE__ */ jsx("span", { className: "font-display font-bold text-primary", children: formatVND(total) })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { type: "submit", variant: "hero", size: "lg", disabled: loading, className: "w-full", children: loading ? "Đang đặt..." : "Xác nhận đặt món" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  CheckoutPage as component
};
