import PageLayout from "@/components/layout/PageLayout";
import { ShoppingCart, Search, CreditCard, Truck, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { companyInfo } from "@/data/mockData";
import { Link } from "react-router-dom";

const ShoppingGuide = () => {
  const steps = [
    {
      icon: Search,
      title: "Bước 1: Tìm kiếm sản phẩm",
      description: "Tìm sản phẩm bạn cần bằng cách:",
      details: [
        "Sử dụng thanh tìm kiếm ở đầu trang",
        "Duyệt theo danh mục sản phẩm",
        "Xem sản phẩm nổi bật trên trang chủ",
      ],
    },
    {
      icon: ShoppingCart,
      title: "Bước 2: Thêm vào giỏ hàng",
      description: "Chọn sản phẩm và thêm vào giỏ hàng:",
      details: [
        "Nhấn vào sản phẩm để xem chi tiết",
        "Kiểm tra thông số kỹ thuật và giá",
        "Chọn số lượng và nhấn 'Thêm vào giỏ hàng'",
      ],
    },
    {
      icon: CreditCard,
      title: "Bước 3: Thanh toán",
      description: "Tiến hành thanh toán đơn hàng:",
      details: [
        "Kiểm tra lại giỏ hàng",
        "Điền thông tin giao hàng",
        "Chọn phương thức thanh toán",
        "Xác nhận đặt hàng",
      ],
    },
    {
      icon: Truck,
      title: "Bước 4: Nhận hàng",
      description: "Đợi nhận hàng và kiểm tra:",
      details: [
        "Chúng tôi sẽ liên hệ xác nhận đơn hàng",
        "Theo dõi tình trạng giao hàng",
        "Kiểm tra hàng khi nhận",
        "Thanh toán COD (nếu chọn)",
      ],
    },
  ];

  const paymentMethods = [
    {
      title: "Thanh toán khi nhận hàng (COD)",
      description: "Thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm",
      note: "Áp dụng cho đơn hàng dưới 20 triệu đồng",
    },
    {
      title: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản trước khi giao hàng, nhận hàng sau 1-3 ngày",
      note: "Được giảm thêm 1% giá trị đơn hàng",
    },
    {
      title: "Thanh toán tại cửa hàng",
      description: "Đến trực tiếp cửa hàng để mua và nhận sản phẩm",
      note: "Được tư vấn trực tiếp từ nhân viên kỹ thuật",
    },
  ];

  return (
    <PageLayout
      title="Hướng dẫn mua hàng"
      breadcrumbs={[{ label: "Hướng dẫn mua hàng" }]}
    >
      <div className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary m-0">Mua hàng dễ dàng</h2>
              <p className="text-muted-foreground m-0">Chỉ 4 bước đơn giản để đặt hàng thành công</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6">Quy trình đặt hàng online</h3>
          <div className="space-y-6 not-prose">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 bg-card border rounded-lg p-5">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-6">Phương thức thanh toán</h3>
          <div className="grid md:grid-cols-3 gap-4 not-prose">
            {paymentMethods.map((method, index) => (
              <div key={index} className="bg-card border rounded-lg p-5">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <p className="text-xs text-primary font-medium">{method.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bank Info */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Thông tin chuyển khoản</h3>
          <div className="bg-muted rounded-lg p-5 not-prose">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Ngân hàng</p>
                <p className="font-semibold">Vietcombank - Chi nhánh TP.HCM</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Số tài khoản</p>
                <p className="font-semibold">0123 456 789</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Chủ tài khoản</p>
                <p className="font-semibold">{companyInfo.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nội dung chuyển khoản</p>
                <p className="font-semibold">[Họ tên] - [Số điện thoại]</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order by Phone/Zalo */}
        <section className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Đặt hàng qua điện thoại / Zalo</h3>
          <p>Nếu bạn cần tư vấn hoặc muốn đặt hàng nhanh, hãy liên hệ trực tiếp với chúng tôi:</p>
          <div className="flex flex-wrap gap-4 not-prose mt-4">
            <a
              href={`tel:${companyInfo.hotline}`}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-5 w-5" />
              Gọi: {companyInfo.hotline}
            </a>
            <a
              href={companyInfo.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0068ff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0052cc] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat Zalo
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-6 not-prose">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Sẵn sàng mua sắm?</h3>
              <p className="text-primary-foreground/80">Khám phá hàng ngàn sản phẩm thiết bị điện chính hãng</p>
            </div>
            <Link
              to="/cua-hang"
              className="flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Mua sắm ngay
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ShoppingGuide;
