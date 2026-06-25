import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Coffee, CupSoda, Leaf, Cake, Snowflake, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { listProducts } from "@/lib/products.functions";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { type Product } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { formatVND } from "@/lib/format";
import { toast } from "sonner";

const qo = queryOptions({ queryKey: ["products"], queryFn: () => listProducts() });

export const Route = createFileRoute("/menu/$id")({
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  notFoundComponent: () => <div className="p-10">Không tìm thấy món</div>,
  component: ProductDetailPage,
});

const iconFor = (cat: string) => {
  if (cat.includes("Phin")) return Coffee;
  if (cat.includes("Máy")) return CupSoda;
  if (cat.includes("Trà")) return Leaf;
  if (cat.includes("Freeze")) return Snowflake;
  return Cake;
};

type Size = "S" | "M" | "L";
const SIZES: { key: Size; delta: number }[] = [
  { key: "S", delta: 0 },
  { key: "M", delta: 10000 },
  { key: "L", delta: 20000 },
];
const hasSizes = (cat: string) => !cat.toLowerCase().includes("bánh");

function ProductDetailPage() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(qo);
  const products = data as Product[];
  const p = products.find((x) => x.id === id);
  const { add } = useCart();
  const [size, setSize] = useState<Size>("S");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const sideList = useMemo(() => {
    if (!p) return [] as Product[];
    return products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  }, [products, p]);

  const carousel = useMemo(() => {
    if (!p) return [] as Product[];
    return products.filter((x) => x.id !== p.id);
  }, [products, p]);

  if (!p) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl font-bold">Không tìm thấy món này</h1>
          <Link to="/menu" className="mt-6 inline-block text-primary underline">Về thực đơn</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const Icon = iconFor(p.category);
  const showSizes = hasSizes(p.category);
  const sizeDelta = showSizes ? SIZES.find((s) => s.key === size)!.delta : 0;
  const finalPrice = p.price + sizeDelta;

  const handleAdd = () => {
    const lineId = showSizes ? `${p.id}::${size}` : p.id;
    const lineName = showSizes ? `${p.name} (${size})` : p.name;
    add({ id: lineId, name: lineName, price: finalPrice });
    toast.success(`Đã thêm ${lineName} vào giỏ`);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="h-1.5 w-full bg-primary" />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
        {/* TOP 3-COLUMN LAYOUT */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT — image + thumb */}
         <div>
            <div className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
    {p.category}
  </div>

  <h1 className="mb-6 font-display text-5xl font-extrabold">
    {p.name}
  </h1>
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md border border-border bg-white">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="size-full object-contain" />
              ) : (
                <Icon className="size-32 text-primary" strokeWidth={1.2} />
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <div className="size-20 overflow-hidden rounded border-2 border-primary bg-white p-1">
                {p.image_url ? (
                  <img src={p.image_url} alt="" className="size-full object-contain" />
                ) : (
                  <Icon className="size-full text-primary" strokeWidth={1.2} />
                )}
              </div>
            </div>
          </div>

          {/* MIDDLE — description, CTA, size, price */}
          <div className="flex flex-col justify-center">
            {p.description && (
              <p className="max-w-xl text-lg leading-8 text-foreground/80">{p.description}</p>
            )}

            <button
              type="button"
              onClick={handleAdd}
              disabled={!p.is_available}
              className="mt-8 h-20 w-full rounded-lg bg-primary text-3xl font-extrabold uppercase tracking-wider text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60"
            >
              Đặt mua ngay
            </button>

            {showSizes && (
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-semibold">Size :</span>
                {SIZES.map((s) => {
                  const selected = s.key === size;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSize(s.key)}
                      className={`flex size-9 items-center justify-center rounded border-2 text-sm font-bold transition-colors ${
                        selected
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {s.key}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-6 text-xl">
              <span className="font-semibold">Giá : </span>
              <span className="font-display text-3xl font-extrabold text-primary">
                {formatVND(finalPrice).replace("đ", "VNĐ")}
              </span>
            </div>
          </div>
          {sideList.length > 0 && (
  <div className="mt-16">
    <h2 className="mb-6 text-2xl font-bold">
      Bạn có thể thích
    </h2>

    <div className="grid gap-6 md:grid-cols-3">
      {sideList.map((r) => (
        <Link
          key={r.id}
          to="/menu/$id"
          params={{ id: r.id }}
          className="group rounded-xl border bg-card p-4 transition hover:shadow-lg"
        >
          <div className="aspect-square overflow-hidden rounded-lg bg-white">
            <img
              src={r.image_url ?? ""}
              alt={r.name}
              className="h-full w-full object-contain transition group-hover:scale-105"
            />
          </div>

          <h3 className="mt-4 font-bold">
            {r.name}
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            {r.description}
          </p>

          <p className="mt-3 font-bold text-primary">
            {formatVND(r.price)}
          </p>
        </Link>
      ))}
    </div>
  </div>
)}
        </div>

        {/* BOTTOM CAROUSEL */}
        {carousel.length > 0 && (
          <div className="mt-20">
            <div className="mb-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                className="flex size-9 items-center justify-center rounded border border-border bg-card hover:border-primary hover:text-primary"
                aria-label="Trước"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                className="flex size-9 items-center justify-center rounded border border-border bg-card hover:border-primary hover:text-primary"
                aria-label="Sau"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scrollbar-thin"
              style={{ scrollbarWidth: "thin" }}
            >
              {carousel.map((r) => (
                <Link
                  key={r.id}
                  to="/menu/$id"
                  params={{ id: r.id }}
                  className="group w-[260px] shrink-0 snap-start"
                >
                  <div className="aspect-square overflow-hidden rounded-md border border-border bg-white">
                    {r.image_url ? (
                      <img src={r.image_url} alt={r.name} className="size-full object-contain transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="flex size-full items-center justify-center bg-secondary">
                        <Coffee className="size-16 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <div className="font-display text-sm font-extrabold uppercase tracking-wide group-hover:text-primary">
                      {r.name}
                    </div>
                    <div className="mt-1 text-xs">
                      <span className="font-semibold">Giá : </span>
                      <span className="font-bold text-primary">{formatVND(r.price).replace("đ", "VNĐ")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
