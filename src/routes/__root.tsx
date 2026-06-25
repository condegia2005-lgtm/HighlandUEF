import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Không tìm thấy trang</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
        <a href="/" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110">
          Về trang chủ
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Có lỗi xảy ra</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vui lòng thử lại hoặc về trang chủ.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Thử lại</button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm">Về trang chủ</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
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
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/f56lFDWNBpOGK4MhiX6nc7XreNW2/social-images/social-1781444441531-27a1ed1c-81cd-4f09-bb87-bd74eb1771e4.webp" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <Toaster richColors position="top-right" />
      </CartProvider>
    </QueryClientProvider>
  );
}
