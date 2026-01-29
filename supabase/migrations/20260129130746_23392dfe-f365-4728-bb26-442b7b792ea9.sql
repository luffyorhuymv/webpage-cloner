-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create order items" ON public.order_items;

-- Create more secure policies for orders (allow guest checkout but with validation)
CREATE POLICY "Anyone can create orders with valid data" ON public.orders
  FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND 
    customer_name != '' AND
    customer_phone IS NOT NULL AND 
    customer_phone != '' AND
    shipping_address IS NOT NULL AND
    shipping_address != ''
  );

-- Create more secure policy for order_items (must be linked to a valid order)
CREATE POLICY "Anyone can create order items for their orders" ON public.order_items
  FOR INSERT WITH CHECK (
    order_id IS NOT NULL AND
    product_name IS NOT NULL AND
    product_name != '' AND
    quantity > 0 AND
    price >= 0
  );