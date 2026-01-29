import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables, TablesUpdate } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";

export type Order = Tables<"orders">;
export type OrderItem = Tables<"order_items">;
export type OrderUpdate = TablesUpdate<"orders">;

export const ORDER_STATUSES = [
  { value: "pending", label: "Chờ xác nhận", color: "bg-yellow-100 text-yellow-800" },
  { value: "confirmed", label: "Đã xác nhận", color: "bg-blue-100 text-blue-800" },
  { value: "shipping", label: "Đang giao hàng", color: "bg-purple-100 text-purple-800" },
  { value: "completed", label: "Hoàn thành", color: "bg-green-100 text-green-800" },
  { value: "cancelled", label: "Đã hủy", color: "bg-red-100 text-red-800" },
];

export const PAYMENT_STATUSES = [
  { value: "unpaid", label: "Chưa thanh toán", color: "bg-gray-100 text-gray-800" },
  { value: "paid", label: "Đã thanh toán", color: "bg-green-100 text-green-800" },
  { value: "refunded", label: "Đã hoàn tiền", color: "bg-orange-100 text-orange-800" },
];

export const useOrders = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ["admin-order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};

export const useOrderItems = (orderId: string) => {
  return useQuery({
    queryKey: ["admin-order-items", orderId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (error) throw error;
      return data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...order }: OrderUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update(order)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Cập nhật đơn hàng thành công!" });
    },
    onError: (error) => {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      // Delete order items first
      await supabase.from("order_items").delete().eq("order_id", id);
      // Then delete order
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({ title: "Xóa đơn hàng thành công!" });
    },
    onError: (error) => {
      toast({ title: "Lỗi", description: error.message, variant: "destructive" });
    },
  });
};
