import PageLayout from "@/components/layout/PageLayout";
import { Truck, MapPin, Clock, Package, CreditCard, Phone } from "lucide-react";
import { companyInfo } from "@/data/mockData";

const ShippingPolicy = () => {
  return (
    <PageLayout
      title="Chính sách vận chuyển"
      breadcrumbs={[{ label: "Chính sách vận chuyển" }]}
    >
      <div className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary m-0">Giao hàng toàn quốc</h2>
              <p className="text-muted-foreground m-0">Nhanh chóng - An toàn - Đúng hẹn</p>
            </div>
          </div>
        </div>

        {/* Shipping Methods */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Phương thức vận chuyển
          </h3>
          <div className="grid md:grid-cols-2 gap-4 not-prose">
            <div className="bg-card border rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3 text-primary">Giao hàng tiêu chuẩn</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Nội thành TP.HCM: 1-2 ngày làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Các tỉnh lân cận: 2-3 ngày làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Các tỉnh xa: 3-5 ngày làm việc</span>
                </li>
              </ul>
            </div>
            <div className="bg-card border rounded-lg p-5">
              <h4 className="font-semibold text-lg mb-3 text-primary">Giao hàng nhanh</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Nội thành TP.HCM: Trong ngày (đặt trước 14h)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Các tỉnh lân cận: 1-2 ngày làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span>Phụ thu thêm phí giao hàng nhanh</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Shipping Fees */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Phí vận chuyển
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-left">Khu vực</th>
                  <th className="border border-border px-4 py-3 text-left">Đơn hàng &lt; 5 triệu</th>
                  <th className="border border-border px-4 py-3 text-left">Đơn hàng ≥ 5 triệu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-3">Nội thành TP.HCM</td>
                  <td className="border border-border px-4 py-3">30.000đ</td>
                  <td className="border border-border px-4 py-3 text-green-600 font-semibold">Miễn phí</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border px-4 py-3">Ngoại thành TP.HCM</td>
                  <td className="border border-border px-4 py-3">50.000đ</td>
                  <td className="border border-border px-4 py-3 text-green-600 font-semibold">Miễn phí</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3">Các tỉnh lân cận (Bình Dương, Đồng Nai, Long An...)</td>
                  <td className="border border-border px-4 py-3">Theo bảng giá GHTK</td>
                  <td className="border border-border px-4 py-3">Giảm 50%</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border px-4 py-3">Các tỉnh khác</td>
                  <td className="border border-border px-4 py-3">Theo bảng giá GHTK</td>
                  <td className="border border-border px-4 py-3">Giảm 30%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            * Phí vận chuyển có thể thay đổi tùy theo trọng lượng và kích thước sản phẩm
          </p>
        </section>

        {/* Coverage Area */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Phạm vi giao hàng
          </h3>
          <ul className="space-y-2">
            <li><strong>Giao hàng toàn quốc:</strong> Chúng tôi giao hàng đến tất cả 63 tỉnh thành trên cả nước</li>
            <li><strong>Đối tác vận chuyển:</strong> Giao Hàng Tiết Kiệm (GHTK), Giao Hàng Nhanh (GHN), Viettel Post</li>
            <li><strong>Hàng cồng kềnh:</strong> Đối với các đơn hàng lớn (tủ điện, thiết bị công nghiệp), chúng tôi sẽ liên hệ báo giá riêng</li>
          </ul>
        </section>

        {/* Notes */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold">Lưu ý khi nhận hàng</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 not-prose">
            <ul className="space-y-2 text-sm">
              <li>✓ Kiểm tra kỹ tình trạng kiện hàng trước khi nhận</li>
              <li>✓ Quay video mở hàng để làm bằng chứng nếu có vấn đề</li>
              <li>✓ Đối chiếu số lượng và chủng loại sản phẩm với đơn hàng</li>
              <li>✓ Liên hệ ngay với chúng tôi nếu phát hiện sai sót hoặc hư hỏng</li>
              <li>✓ Giữ lại biên nhận giao hàng để đối chiếu khi cần</li>
            </ul>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 not-prose">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Cần tư vấn về vận chuyển?</h3>
              <p className="text-primary-foreground/80">Liên hệ ngay để được hỗ trợ báo giá vận chuyển chính xác</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${companyInfo.hotline}`}
                className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                {companyInfo.hotline}
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShippingPolicy;
