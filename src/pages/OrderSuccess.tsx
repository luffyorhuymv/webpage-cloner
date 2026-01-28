import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloButton from "@/components/ZaloButton";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 lg:pt-40 pb-16">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold mb-4">
              Đặt hàng thành công!
            </h1>

            <p className="text-muted-foreground mb-8">
              Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn trong thời gian
              sớm nhất để xác nhận đơn hàng.
            </p>

            <div className="bg-card rounded-lg border p-6 mb-8 text-left">
              <h2 className="font-semibold mb-3">Bước tiếp theo:</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Nhân viên sẽ gọi điện xác nhận đơn hàng trong 24h</li>
                <li>• Đơn hàng sẽ được giao trong 3-5 ngày làm việc</li>
                <li>• Bạn có thể liên hệ hotline 1800 1234 nếu cần hỗ trợ</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home className="h-5 w-5 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
              <Link to="/cua-hang">
                <Button size="lg">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Tiếp tục mua sắm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ZaloButton />
    </div>
  );
};

export default OrderSuccess;
