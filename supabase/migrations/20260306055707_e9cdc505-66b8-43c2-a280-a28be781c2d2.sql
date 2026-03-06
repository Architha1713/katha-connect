
-- Fix overly permissive notification INSERT policy
DROP POLICY "System can insert notifications" ON public.notifications;
CREATE POLICY "Authenticated can insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() OR EXISTS (
  SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('organization', 'corporate_admin')
));
