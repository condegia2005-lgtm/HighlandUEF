import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { User, ShoppingBag, Menu } from "lucide-react";
import { u as useCart } from "./router-DCUrSzod.js";
import * as React from "react";
import { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { s as supabase } from "./client-COBIgSbO.js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground shadow-warm hover:brightness-110 hover:shadow-warm font-semibold",
        gold: "bg-accent text-accent-foreground shadow-card hover:brightness-105 font-semibold"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const logo = "/assets/Highlandlogo-C4TEvXPm.png";
function Header() {
  const { count } = useCart();
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const loadUser = async () => {
      const { data: data2 } = await supabase.auth.getUser();
      if (data2.user) {
        setLoggedIn(true);
        const fullName = data2.user.user_metadata?.full_name || data2.user.email?.split("@")[0] || "User";
        setUserName(fullName);
      }
    };
    loadUser();
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setLoggedIn(true);
          const fullName = session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User";
          setUserName(fullName);
        } else {
          setLoggedIn(false);
          setUserName("");
        }
      }
    );
    return () => data.subscription.unsubscribe();
  }, []);
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: logo,
          alt: "Highlanduef",
          className: "h-10 w-auto object-contain"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col leading-tight", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-3xl font-extrabold text-primary", children: "HIGHLANDUEF" }),
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Coffee · Tea · Cake" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm font-medium", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-foreground/80 hover:text-primary",
          activeProps: { className: "text-primary" },
          children: "Trang chủ"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/menu",
          className: "text-foreground/80 hover:text-primary",
          activeProps: { className: "text-primary" },
          children: "Thực đơn"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/about",
          className: "text-foreground/80 hover:text-primary",
          activeProps: { className: "text-primary" },
          children: "Câu chuyện"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      loggedIn ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden sm:flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium", children: [
          /* @__PURE__ */ jsx(User, { className: "size-4" }),
          userName
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleLogout,
            children: "Đăng xuất"
          }
        )
      ] }) : /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "sm",
          className: "hidden sm:inline-flex",
          children: /* @__PURE__ */ jsxs(Link, { to: "/auth", className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(User, { className: "size-4" }),
            "Đăng nhập"
          ] })
        }
      ),
      /* @__PURE__ */ jsx(Button, { asChild: true, variant: "hero", size: "sm", children: /* @__PURE__ */ jsxs(Link, { to: "/checkout", children: [
        /* @__PURE__ */ jsx(ShoppingBag, { className: "size-4" }),
        /* @__PURE__ */ jsxs("span", { children: [
          "Giỏ (",
          count,
          ")"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          asChild: true,
          variant: "ghost",
          size: "icon",
          className: "md:hidden",
          children: /* @__PURE__ */ jsx(Link, { to: "/menu", children: /* @__PURE__ */ jsx(Menu, {}) })
        }
      )
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-24 bg-secondary text-secondary-foreground", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: logo,
              alt: "Highlanduef",
              className: "h-14 w-auto object-contain"
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-display text-lg font-bold text-accent", children: "HIGHLANDUEF" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs uppercase tracking-widest opacity-70", children: "Cà phê · Trà · Bánh" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-md text-sm opacity-80", children: "Gìn giữ tinh thần cà phê Việt — phin đậm, sữa béo, trà sen vàng thanh mát. Lấy cảm hứng từ menu Highlands, phục vụ bằng đam mê Highlanduef." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-sm font-semibold text-accent", children: "Liên hệ" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm opacity-85", children: [
          /* @__PURE__ */ jsx("li", { children: "1900 1755" }),
          /* @__PURE__ */ jsx("li", { children: "hello@highlanduef.vn" }),
          /* @__PURE__ */ jsx("li", { children: "235 Nguyễn Văn Cừ, Q.5, TP.HCM" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-3 text-sm font-semibold text-accent", children: "Giờ mở cửa" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-1 text-sm opacity-85", children: [
          /* @__PURE__ */ jsx("li", { children: "T2 – T6: 06:30 – 22:30" }),
          /* @__PURE__ */ jsx("li", { children: "T7 – CN: 07:00 – 23:00" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-4 text-xs opacity-60", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Highlanduef Coffee. Cảm hứng từ Highlands Coffee."
    ] }) })
  ] });
}
export {
  Button as B,
  Footer as F,
  Header as H,
  cn as c,
  logo as l
};
