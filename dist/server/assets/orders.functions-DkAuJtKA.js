import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-DBbPav2g.js";
import { z } from "zod";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const orderInput = z.object({
  customer_name: z.string().trim().min(1).max(120),
  customer_phone: z.string().trim().min(8).max(20).regex(/^[0-9+\-\s()]+$/),
  customer_address: z.string().trim().max(300).optional().nullable(),
  note: z.string().trim().max(300).optional().nullable(),
  items: z.array(z.object({
    product_id: z.string().uuid(),
    product_name: z.string().min(1).max(120),
    unit_price: z.number().int().min(0).max(1e7),
    quantity: z.number().int().min(1).max(99)
  })).min(1).max(50)
});
const createOrder_createServerFn_handler = createServerRpc({
  id: "7f92d135aa3763ddd5bf6d4d9f84832b6b591cbaa35dcc4048b4b1beed8e7bf3",
  name: "createOrder",
  filename: "src/lib/orders.functions.ts"
}, (opts) => createOrder.__executeServer(opts));
const createOrder = createServerFn({
  method: "POST"
}).inputValidator((v) => orderInput.parse(v)).handler(createOrder_createServerFn_handler, async ({
  data
}) => {
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.js");
  const total = data.items.reduce((s, i) => s + i.unit_price * i.quantity, 0);
  const {
    data: order,
    error
  } = await supabaseAdmin.from("orders").insert({
    customer_name: data.customer_name,
    customer_phone: data.customer_phone,
    customer_address: data.customer_address ?? null,
    note: data.note ?? null,
    total,
    status: "pending"
  }).select("id").single();
  if (error || !order) throw new Error(error?.message ?? "Insert failed");
  const {
    error: itemErr
  } = await supabaseAdmin.from("order_items").insert(data.items.map((i) => ({
    ...i,
    order_id: order.id
  })));
  if (itemErr) throw new Error(itemErr.message);
  return {
    ok: true,
    id: order.id
  };
});
export {
  createOrder_createServerFn_handler
};
