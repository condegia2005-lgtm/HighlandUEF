import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard, type Product } from "@/components/ProductCard";
import { useMemo, useState } from "react";

const qo = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/menu")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Thực đơn — Highlanduef Coffee" },
      { name: "description", content: "Cà phê phin, cà phê máy, trà, freeze tại Highlanduef." },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  component: MenuPage,
});

function MenuPage() {
  const { data } = useSuspenseQuery(qo);
  const products = data as Product[];
  const cats = useMemo(() => ["Tất cả", ...Array.from(new Set(products.map((p) => p.category)))], [products]);
  const [active, setActive] = useState("Tất cả");
  const filtered = active === "Tất cả" ? products : products.filter((p) => p.category === active);

  return (
    <><Outlet /><div className="flex min-h-screen flex-col">
      <Header />
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <span className="text-xs uppercase tracking-widest text-primary">Menu</span>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Thực đơn Highlanduef</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Chọn từ {products.length} món signature — pha thủ công, phục vụ trong ngày.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${active === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary/40"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <Footer />
    </div></>
  );
}
