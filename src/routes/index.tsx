import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { listProducts } from "@/lib/products.functions";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Coffee, Leaf, Sparkles, MapPin } from "lucide-react";
import logo from "@/assets/Highlandlogo.png";

const productsQO = queryOptions({
  queryKey: ["products"],
  queryFn: () => listProducts(),
});

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Highlanduef Coffee — Phin đậm · Trà sen · Freeze" },
      { name: "description", content: "Thưởng thức phin sữa đá, bạc xỉu, trà sen vàng và freeze trà xanh tại Highlanduef. Đặt online dễ dàng." },
    ],
  }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  component: HomePage,
});

function HomePage() {
  const { data } = useSuspenseQuery(productsQO);
  const products = data as Product[];
  const featured = products.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute -right-32 -top-32 size-96 rounded-full bg-sun opacity-40 blur-2xl" />
        <div className="absolute -left-20 bottom-0 size-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest text-accent">
              <Sparkles className="size-3" /> Hương vị Việt từ cao nguyên
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-balance md:text-6xl">
              Phin đậm. <span className="text-accent">Trà thanh.</span><br />Hương vị Highlanduef.
            </h1>
            <p className="mt-5 max-w-md text-base opacity-90">
              Lấy cảm hứng từ menu Highlands Coffee — Phin Sữa Đá, Trà Sen Vàng, Freeze Trà Xanh — pha bằng đam mê của Highlanduef.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <Link to="/menu">Khám phá thực đơn</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/checkout">Đặt ngay</Link>
              </Button>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              <div><div className="font-display text-2xl font-bold text-accent">13+</div><div className="opacity-70">Món signature</div></div>
              <div><div className="font-display text-2xl font-bold text-accent">100%</div><div className="opacity-70">Hạt Robusta Việt</div></div>
              <div><div className="font-display text-2xl font-bold text-accent">06:30</div><div className="opacity-70">Mở mỗi sáng</div></div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
  <div className="absolute h-[420px] w-[420px] rounded-full bg-accent/20 blur-3xl" />

  <img
    src={logo}
    alt="Highlanduef Logo"
    className="relative z-10 w-[320px] md:w-[420px] object-contain drop-shadow-2xl"
  />
</div>
        </div>
      </section>

      {/* VALUES */}
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-16 md:grid-cols-3">
        {[
          { icon: Coffee, title: "Cà phê phin truyền thống", desc: "Pha tay từng ly, đậm vị Robusta cao nguyên." },
          { icon: Leaf, title: "Trà & thảo mộc", desc: "Trà sen vàng, ô long thạch đào — thanh mát mỗi ngày." },
          { icon: MapPin, title: "Phục vụ tận tâm", desc: "Đặt online, nhận tại quán hoặc giao tận nơi." },
        ].map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <v.icon className="size-8 text-primary" strokeWidth={1.6} />
            <h3 className="mt-4 font-display text-lg font-bold">{v.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
          </div>
        ))}
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-primary">Signature</span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Món được yêu thích</h2>
          </div>
          <Button asChild variant="outline"><Link to="/menu">Xem tất cả</Link></Button>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-16 max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-hero p-10 text-primary-foreground md:p-16">
          <div className="absolute -right-10 -top-10 size-64 rounded-full bg-sun opacity-40 blur-2xl" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Sẵn sàng pha một ly Highlanduef?</h2>
            <p className="mt-3 opacity-90">Đặt online trong 60 giây — giao trong vòng 30 phút khu vực trung tâm.</p>
            <Button asChild variant="gold" size="lg" className="mt-6"><Link to="/menu">Đặt ngay</Link></Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
