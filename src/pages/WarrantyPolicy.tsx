import PageLayout from "@/components/layout/PageLayout";
import { Shield, CheckCircle, AlertCircle, Clock, Phone } from "lucide-react";
import { companyInfo } from "@/data/mockData";

const WarrantyPolicy = () => {
  return (
    <PageLayout
      title="Chính sách bảo hành"
      breadcrumbs={[{ label: "Chính sách bảo hành" }]}
    >
      <div className="prose prose-lg max-w-none">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary m-0">Cam kết bảo hành chính hãng</h2>
              <p className="text-muted-foreground m-0">Tất cả sản phẩm đều được bảo hành theo tiêu chuẩn nhà sản xuất</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Điều kiện bảo hành
          </h3>
          <ul className="space-y-2">
            <li>Sản phẩm còn trong thời hạn bảo hành (tính từ ngày mua hàng)</li>
            <li>Tem bảo hành còn nguyên vẹn, không bị rách, tẩy xóa</li>
            <li>Sản phẩm bị lỗi do nhà sản xuất (lỗi kỹ thuật, lỗi linh kiện)</li>
            <li>Có hóa đơn mua hàng hoặc phiếu bảo hành hợp lệ</li>
            <li>Sản phẩm không có dấu hiệu can thiệp, sửa chữa bởi bên thứ ba</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Trường hợp không được bảo hành
          </h3>
          <ul className="space-y-2">
            <li>Sản phẩm hết thời hạn bảo hành</li>
            <li>Sản phẩm bị hư hỏng do sử dụng sai cách, không đúng hướng dẫn</li>
            <li>Sản phẩm bị hư hỏng do tác động ngoại lực (va đập, rơi vỡ, ngập nước)</li>
            <li>Sản phẩm bị hư hỏng do thiên tai, hỏa hoạn, sét đánh</li>
            <li>Sản phẩm đã bị sửa chữa, thay đổi bởi đơn vị không được ủy quyền</li>
            <li>Tem bảo hành bị rách, mờ hoặc không còn nguyên vẹn</li>
            <li>Không có hóa đơn mua hàng hoặc phiếu bảo hành</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Thời gian bảo hành
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-left">Nhóm sản phẩm</th>
                  <th className="border border-border px-4 py-3 text-left">Thời gian bảo hành</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-3">Bộ lưu điện UPS</td>
                  <td className="border border-border px-4 py-3">12 - 24 tháng</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border px-4 py-3">Biến tần, Inverter</td>
                  <td className="border border-border px-4 py-3">12 - 18 tháng</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3">Tủ điện hạ thế</td>
                  <td className="border border-border px-4 py-3">12 tháng</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border px-4 py-3">Thiết bị đóng cắt (ACB, MCCB, MCB)</td>
                  <td className="border border-border px-4 py-3">12 tháng</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-3">Phụ kiện tủ điện</td>
                  <td className="border border-border px-4 py-3">6 - 12 tháng</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            * Thời gian bảo hành cụ thể tùy thuộc vào từng sản phẩm và nhà sản xuất
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold">Quy trình bảo hành</h3>
          <div className="grid md:grid-cols-4 gap-4 not-prose">
            {[
              { step: 1, title: "Liên hệ", desc: "Gọi hotline hoặc nhắn Zalo để thông báo lỗi" },
              { step: 2, title: "Kiểm tra", desc: "Nhân viên kỹ thuật kiểm tra và xác nhận lỗi" },
              { step: 3, title: "Xử lý", desc: "Sửa chữa hoặc đổi mới sản phẩm theo chính sách" },
              { step: 4, title: "Hoàn tất", desc: "Bàn giao sản phẩm và ký nhận bảo hành" },
            ].map((item) => (
              <div key={item.step} className="bg-card border rounded-lg p-4 text-center">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-primary text-primary-foreground rounded-xl p-6 not-prose">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-1">Cần hỗ trợ bảo hành?</h3>
              <p className="text-primary-foreground/80">Liên hệ ngay để được tư vấn và hỗ trợ nhanh chóng</p>
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

export default WarrantyPolicy;
