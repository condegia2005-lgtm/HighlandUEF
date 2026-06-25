import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderInput = z.object({
  customer_name: z.string().trim().min(1).max(120),
  customer_phone: z.string().trim().min(8).max(20).regex(/^[0-9+\-\s()]+$/),
  customer_address: z.string().trim().max(300).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  items: z
    .array(
      z.object({
        product_id: z.string().uuid(),
        product_name: z.string().min(1).max(120),
        unit_price: z.number().int().min(0).max(10_000_000),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1)
    .max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => orderInput.parse(v))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const total = data.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        customer_address: data.customer_address ?? null,
        note: data.note ?? null,
        total,
        status: "pending",
      })
      .select("id")
      .single();
    if (error || !order) throw new Error(error?.message ?? "Insert failed");
    const { error: itemErr } = await supabaseAdmin
      .from("order_items")
      .insert(data.items.map((i) => ({ ...i, order_id: order.id })));
    if (itemErr) throw new Error(itemErr.message);
    return { ok: true, id: order.id };
  });

