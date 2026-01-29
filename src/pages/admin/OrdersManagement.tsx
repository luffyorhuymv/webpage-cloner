import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, MoreHorizontal, Eye, Trash2, Loader2, ShoppingCart } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useOrders, useOrderItems, useUpdateOrder, useDeleteOrder, Order, ORDER_STATUSES, PAYMENT_STATUSES } from "@/hooks/useOrders";
import { OrderDetailDialog } from "@/components/admin/OrderDetailDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

const OrdersManagement = () => {
  const { data: orders, isLoading } = useOrders();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const [searchTerm, setSearchTerm] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orderItems } = useOrderItems(selectedOrder?.id || "");

  const filteredOrders = orders?.filter(
    (order) =>
      order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer_phone.includes(searchTerm)
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (status: string | null) => {
    const statusInfo = ORDER_STATUSES.find(s => s.value === status);
    return (
      <Badge className={statusInfo?.color || "bg-gray-100 text-gray-800"}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string | null) => {
    const statusInfo = PAYMENT_STATUSES.find(s => s.value === status);
    return (
      <Badge className={statusInfo?.color || "bg-gray-100 text-gray-800"}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setDetailOpen(true);
  };

  const handleDelete = (order: Order) => {
    setSelectedOrder(order);
    setDeleteOpen(true);
  };

  const handleStatusChange = (status: string) => {
    if (selectedOrder) {
      updateOrder.mutate({ id: selectedOrder.id, status });
    }
  };

  const handlePaymentStatusChange = (payment_status: string) => {
    if (selectedOrder) {
      updateOrder.mutate({ id: selectedOrder.id, payment_status });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedOrder) {
      deleteOrder.mutate(selectedOrder.id, {
        onSuccess: () => setDeleteOpen(false),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Danh sách đơn hàng ({filteredOrders?.length || 0})
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredOrders?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {searchTerm ? "Không tìm thấy đơn hàng nào" : "Chưa có đơn hàng nào"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Điện thoại</TableHead>
                    <TableHead className="text-right">Tổng tiền</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="text-center">Thanh toán</TableHead>
                    <TableHead>Ngày đặt</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders?.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <span className="font-mono font-medium text-primary">
                          {order.order_number}
                        </span>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{order.customer_name}</p>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.customer_phone}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="text-center">
                        {getPaymentBadge(order.payment_status)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(order.created_at), "dd/MM/yyyy", { locale: vi })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetail(order)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(order)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <OrderDetailDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        order={selectedOrder}
        orderItems={orderItems || []}
        onStatusChange={handleStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
        isLoading={updateOrder.isPending}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Xóa đơn hàng"
        description={`Bạn có chắc chắn muốn xóa đơn hàng "${selectedOrder?.order_number}"? Tất cả sản phẩm trong đơn hàng cũng sẽ bị xóa.`}
      />
    </div>
  );
};

export default OrdersManagement;
