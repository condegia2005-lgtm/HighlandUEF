import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { H as Header, B as Button, F as Footer } from "./Footer-D2Cg9r5b.js";
import { L as Label, I as Input } from "./label-C1U8tsOH.js";
import { s as supabase } from "./client-COBIgSbO.js";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import "lucide-react";
import "./router-DCUrSzod.js";
import "@tanstack/react-query";
import "zod";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@supabase/supabase-js";
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const finishSessionFromUrl = async () => {
      try {
        const {
          data
        } = await supabase.auth.getUser();
        if (data.user) {
          toast.success("Đăng nhập thành công");
          navigate({
            to: "/"
          });
        }
      } catch (err) {
        console.error("Error checking Supabase user session", err);
      }
    };
    finishSessionFromUrl();
  }, [navigate]);
  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const {
          data: signUpData,
          error: error2
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name
            },
            // Redirect back to the auth page so we can finalize the session
            // when the user clicks the confirmation link.
            emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/auth` : void 0
          }
        });
        if (error2) throw error2;
        if (signUpData?.user) {
          toast.success("Đăng ký thành công — bạn đã được đăng nhập");
          navigate({
            to: "/"
          });
          return;
        }
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
        setMode("signin");
        return;
      }
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast.success("Đăng nhập thành công");
      navigate({
        to: "/"
      });
    } catch (err) {
      const message = err.message;
      if (message.toLowerCase().includes("email not confirmed")) {
        toast.error("Email chưa được xác nhận. Vui lòng kiểm tra hộp thư và xác nhận email trước khi đăng nhập.");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("section", { className: "mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 shadow-card", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl font-bold", children: mode === "signin" ? "Đăng nhập tài khoản" : "Tạo tài khoản" }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: mode === "signin" ? "Đăng nhập để đặt món và theo dõi đơn hàng." : "Tạo tài khoản miễn phí để mua hàng nhanh hơn." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "mt-6 space-y-4", children: [
        mode === "signup" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Họ tên" }),
          /* @__PURE__ */ jsx(Input, { id: "name", required: true, value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
          /* @__PURE__ */ jsx(Input, { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "password", children: "Mật khẩu" }),
          /* @__PURE__ */ jsx(Input, { id: "password", type: "password", required: true, minLength: 6, value: password, onChange: (e) => setPassword(e.target.value) })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", variant: "hero", size: "lg", className: "w-full", disabled: loading, children: loading ? "Đang xử lý..." : mode === "signin" ? "Đăng nhập" : "Đăng ký" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 text-center text-sm text-muted-foreground", children: mode === "signin" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        "Chưa có tài khoản?",
        " ",
        /* @__PURE__ */ jsx("button", { className: "font-semibold text-primary", onClick: () => setMode("signup"), children: "Đăng ký" })
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        "Đã có tài khoản?",
        " ",
        /* @__PURE__ */ jsx("button", { className: "font-semibold text-primary", onClick: () => setMode("signin"), children: "Đăng nhập" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  AuthPage as component
};
