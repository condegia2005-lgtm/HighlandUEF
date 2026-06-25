import { Coffee, CupSoda, Leaf, Cake, Snowflake } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatVND } from "@/lib/format";
import { toast } from "sonner";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
};

const iconFor = (cat: string) => {
  if (cat.includes("Phin")) return Coffee;
  if (cat.includes("Máy")) return CupSoda;
  if (cat.includes("Trà")) return Leaf;
  if (cat.includes("Freeze")) return Snowflake;
  return Cake;
};

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const Icon = iconFor(p.category);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-warm">
      <Link
        to="/menu/$id"
        params={{ id: p.id }}
        className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary"
      >
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-sun opacity-40" />
            <Icon className="relative size-16 text-accent" strokeWidth={1.4} />
          </>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
          {p.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link to="/menu/$id" params={{ id: p.id }} className="hover:text-primary">
          <h3 className="font-display text-base font-bold leading-tight">{p.name}</h3>
          {p.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>}
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-display text-3xl font-extrabold text-primary">{formatVND(p.price)}</span>
          <Button
            size="sm"
            variant="hero"
            disabled={!p.is_available}
            onClick={() => {
              add({ id: p.id, name: p.name, price: p.price });
              toast.success(`Đã thêm ${p.name} vào giỏ`);
            }}
          >
            Thêm
          </Button>
        </div>
      </div>
    </article>
  );
}
