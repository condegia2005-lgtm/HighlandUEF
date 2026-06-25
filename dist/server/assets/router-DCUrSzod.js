import { QueryClientProvider, queryOptions, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, redirect, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, createContext, useContext } from "react";
import { Toaster as Toaster$1 } from "sonner";
import { s as supabase } from "./client-COBIgSbO.js";
import { z } from "zod";
const appCss = "/assets/styles-CvD9EhD-.css";
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
const Ctx = createContext(null);
const KEY = "highlanduef.cart.v1";
function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);
  const add = (p) => setItems((prev) => {
    const ex = prev.find((i) => i.id === p.id);
    if (ex) return prev.map((i) => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
    return [...prev, { ...p, quantity: 1 }];
  });
  const remove = (id) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id, q) => setItems((p) => q <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => i.id === id ? { ...i, quantity: q } : i));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return /* @__PURE__ */ jsx(Ctx.Provider, { value: { items, add, remove, setQty, clear, total, count }, children });
}
function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-primary", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Không tìm thấy trang" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Trang bạn đang tìm không tồn tại hoặc đã được di chuyển." }),
    /* @__PURE__ */ jsx("a", { href: "/", className: "mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110", children: "Về trang chủ" })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold", children: "Có lỗi xảy ra" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Vui lòng thử lại hoặc về trang chủ." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex justify-center gap-2", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => {
        router2.invalidate();
        reset();
      }, className: "rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground", children: "Thử lại" }),
      /* @__PURE__ */ jsx("a", { href: "/", className: "rounded-md border border-input px-4 py-2 text-sm", children: "Về trang chủ" })
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Highlanduef Coffee — Phin đậm, Trà thanh, Hương vị Việt" },
      { name: "description", content: "Quán cà phê Highlanduef — phin sữa đá, trà sen vàng, freeze và bánh ngọt, cảm hứng từ Highlands Coffee." },
      { name: "author", content: "Highlanduef" },
      { property: "og:title", content: "Highlanduef Coffee — Phin đậm, Trà thanh, Hương vị Việt" },
      { property: "og:description", content: "Quán cà phê Highlanduef — phin sữa đá, trà sen vàng, freeze và bánh ngọt, cảm hứng từ Highlands Coffee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Highlanduef Coffee — Phin đậm, Trà thanh, Hương vị Việt" },
      { name: "twitter:description", content: "Quán cà phê Highlanduef — phin sữa đá, trà sen vàng, freeze và bánh ngọt, cảm hứng từ Highlands Coffee." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/f56lFDWNBpOGK4MhiX6nc7XreNW2/social-images/social-1781444441531-27a1ed1c-81cd-4f09-bb87-bd74eb1771e4.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/f56lFDWNBpOGK4MhiX6nc7XreNW2/social-images/social-1781444441531-27a1ed1c-81cd-4f09-bb87-bd74eb1771e4.webp" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: appCss }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "vi", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  const router2 = useRouter();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router2.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const phinSuaDa = "/assets/phin-sua-da-ajwi3p8J.png";
const phinDenDa = "/assets/phin-den-da-DfN3YTW1.png";
const traSenVang = "/assets/tra-sen-vang-C-fySEat.jpg";
const trathanhdao = "/assets/tra-thanh-dao-DD3l9CNF.jpg";
const freezematcha = "/assets/freeze-matcha-DCDHaJUC.jpg";
const freezechoc = "/assets/freeze-chocolate-3tUOjJLD.jpg";
async function listProducts() {
  return [
    {
      id: "phin-sua-da",
      name: "Phin Sữa Đá",
      category: "Cà phê",
      description: "Hương vị cà phê Việt Nam đích thực, đậm đà từ hạt Robusta.",
      price: 29e3,
      image_url: phinSuaDa,
      is_available: true
    },
    {
      id: "bac-xiu-da",
      name: "Bạc Xỉu Đá",
      category: "Cà phê",
      description: "Sữa nhiều hơn cà phê, thơm béo dễ uống.",
      price: 32e3,
      image_url: phinDenDa,
      is_available: true
    },
    {
      id: "phin-den-da",
      name: "Phin Đen Đá",
      category: "Cà phê",
      description: "Cà phê đen truyền thống Việt Nam.",
      price: 27e3,
      image_url: phinDenDa,
      is_available: true
    },
    {
      id: "tra-sen-vang",
      name: "Trà Sen Vàng",
      category: "Trà",
      description: "Trà sen thanh mát kết hợp thạch giòn.",
      price: 39e3,
      image_url: traSenVang,
      is_available: true
    },
    {
      id: "tra-thach-dao",
      name: "Trà Thạch Đào",
      category: "Trà",
      description: "Đào ngọt dịu kết hợp trà thơm.",
      price: 39e3,
      image_url: trathanhdao,
      is_available: true
    },
    {
      id: "freeze-tra-xanh",
      name: "Freeze Trà Xanh",
      category: "Freeze",
      description: "Trà xanh đá xay phủ kem béo.",
      price: 55e3,
      image_url: freezematcha,
      is_available: true
    },
    {
      id: "freeze-chocolate",
      name: "Freeze Chocolate",
      category: "Freeze",
      description: "Chocolate đá xay đậm vị.",
      price: 59e3,
      image_url: freezechoc,
      is_available: true
    }
  ];
}
z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1).max(120),
  category: z.string().min(1).max(60),
  description: z.string().max(500).optional().nullable(),
  price: z.number().int().min(0).max(1e7),
  image_url: z.string().url().max(500).optional().nullable(),
  is_available: z.boolean()
});
const qo$1 = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts()
});
const $$splitComponentImporter$5 = () => import("./menu-Bn_yAXDl.js");
const $$splitNotFoundComponentImporter$2 = () => import("./menu-Dt-DxLEQ.js");
const $$splitErrorComponentImporter$2 = () => import("./menu-ph1biJHq.js");
const Route$5 = createFileRoute("/menu")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Thực đơn — Highlanduef Coffee"
    }, {
      name: "description",
      content: "Cà phê phin, cà phê máy, trà, freeze tại Highlanduef."
    }]
  }),
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(qo$1),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./checkout-BMaOVO1M.js");
const Route$4 = createFileRoute("/checkout")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Đặt hàng — Highlanduef"
    }]
  }),
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./auth-D1tJO-Q1.js");
const Route$3 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Đăng nhập — Highlanduef"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./about-D1depydN.js");
const Route$2 = createFileRoute("/about")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Câu chuyện Highlanduef"
    }]
  }),
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const productsQO = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts()
});
const $$splitComponentImporter$1 = () => import("./index-Csl9zMCH.js");
const $$splitNotFoundComponentImporter$1 = () => import("./index-Dt-DxLEQ.js");
const $$splitErrorComponentImporter$1 = () => import("./index-koVrkzgd.js");
const Route$1 = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [{
      title: "Highlanduef Coffee — Phin đậm · Trà sen · Freeze"
    }, {
      name: "description",
      content: "Thưởng thức phin sữa đá, bạc xỉu, trà sen vàng và freeze trà xanh tại Highlanduef. Đặt online dễ dàng."
    }]
  }),
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(productsQO),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const qo = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts()
});
const $$splitComponentImporter = () => import("./menu._id-Mani0D7W.js");
const $$splitNotFoundComponentImporter = () => import("./menu._id-DBKBM2rV.js");
const $$splitErrorComponentImporter = () => import("./menu._id-ph1biJHq.js");
const Route = createFileRoute("/menu/$id")({
  loader: ({
    context
  }) => context.queryClient.ensureQueryData(qo),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MenuRoute = Route$5.update({
  id: "/menu",
  path: "/menu",
  getParentRoute: () => Route$6
});
const CheckoutRoute = Route$4.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$6
});
const AuthRoute = Route$3.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$6
});
const AboutRoute = Route$2.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const MenuIdRoute = Route.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => MenuRoute
});
const MenuRouteChildren = {
  MenuIdRoute
};
const MenuRouteWithChildren = MenuRoute._addFileChildren(MenuRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AuthRoute,
  CheckoutRoute,
  MenuRoute: MenuRouteWithChildren
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  qo as a,
  productsQO as p,
  qo$1 as q,
  router as r,
  useCart as u
};
