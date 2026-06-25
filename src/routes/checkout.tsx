import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatVND } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrder } from "@/lib/orders.functions";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  ssr: false,
  head: () => ({ meta: [{ title: "Đặt hàng — Highlanduef" }] }),
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" as any });
    return { user: data.user };
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const navigate = useNavigate();
  const submit = useServerFn(createOrder);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  async function onSubmit(e: React.FormEvent) {
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
            quantity: i.quantity,
          })),
        },
      });
      toast.success("Đặt hàng thành công! Mã đơn: " + res.id.slice(0, 8));
      clear();
      navigate({ to: "/" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
        <h1 className="font-display text-3xl font-bold md:text-4xl">Giỏ hàng & đặt món</h1>

        {items.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">Giỏ hàng đang trống.</p>
            <Button asChild variant="hero" className="mt-4"><Link to="/menu">Xem thực đơn</Link></Button>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex-1">
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-muted-foreground">{formatVND(i.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity - 1)}><Minus className="size-3" /></Button>
                    <span className="w-8 text-center font-semibold">{i.quantity}</span>
                    <Button size="icon" variant="outline" onClick={() => setQty(i.id, i.quantity + 1)}><Plus className="size-3" /></Button>
                  </div>
                  <div className="w-24 text-right font-semibold text-primary">{formatVND(i.price * i.quantity)}</div>
                  <Button size="icon" variant="ghost" onClick={() => remove(i.id)}><Trash2 className="size-4" /></Button>
                </div>
              ))}
            </div>

            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold">Thông tin nhận hàng</h2>
              <div>
                <Label htmlFor="name">Họ tên *</Label>
                <Input id="name" required maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input id="phone" required minLength={8} maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="address">Địa chỉ giao hàng</Label>
                <Input id="address" maxLength={300} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="note">Ghi chú</Label>
                <Textarea id="note" maxLength={300} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between text-lg">
                  <span>Tổng cộng</span>
                  <span className="font-display font-bold text-primary">{formatVND(total)}</span>
                </div>
              </div>
              <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full">
                {loading ? "Đang đặt..." : "Xác nhận đặt món"}
              </Button>
            </form>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
