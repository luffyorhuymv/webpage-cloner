import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrdersManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tính năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManagement;
