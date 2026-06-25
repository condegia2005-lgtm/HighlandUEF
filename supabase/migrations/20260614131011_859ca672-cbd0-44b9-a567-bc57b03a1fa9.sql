
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

DROP POLICY "anyone can create order" ON public.orders;
CREATE POLICY "create order" ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (
    (auth.uid() IS NULL AND user_id IS NULL)
    OR (auth.uid() IS NOT NULL AND (user_id IS NULL OR user_id = auth.uid()))
  );

DROP POLICY "items follow order create" ON public.order_items;
CREATE POLICY "create order items" ON public.order_items FOR INSERT TO anon, authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders o WHERE o.id = order_id
    AND ((auth.uid() IS NULL AND o.user_id IS NULL) OR o.user_id = auth.uid() OR auth.uid() IS NOT NULL)
  ));
