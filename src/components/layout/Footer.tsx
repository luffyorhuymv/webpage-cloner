import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Youtube,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo, categories } from "@/data/mockData";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
  };

  return (
    <footer className="bg-section-dark text-white">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">CĐ</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{companyInfo.name}</h3>
                <p className="text-sm text-white/70">Thiết bị điện công nghiệp</p>
              </div>
            </div>
            <p className="text-white/80 text-sm mb-4">
              Chuyên cung cấp thiết bị điện công nghiệp chính hãng với giá cạnh tranh nhất thị trường.
            </p>
            <div className="flex gap-3">
              <a
                href={companyInfo.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={companyInfo.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#0068ff] transition-colors"
              >
                <span className="font-bold text-xs">Zalo</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Danh mục sản phẩm</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/cua-hang?category=${category.slug}`}
                    className="text-white/80 hover:text-primary transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Hỗ trợ khách hàng</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/gioi-thieu"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Giới thiệu công ty
                </Link>
              </li>
              <li>
                <Link
                  to="/lien-he"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  to="/chinh-sach-bao-hanh"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link
                  to="/chinh-sach-van-chuyen"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link
                  to="/huong-dan-mua-hang"
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Thông tin liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${companyInfo.hotline}`}
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  Hotline: {companyInfo.hotline}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-white/80 hover:text-primary transition-colors text-sm"
                >
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-white/80 text-sm">{companyInfo.workingHours}</span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-3 text-sm">Đăng ký nhận tin</h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2024 {companyInfo.fullName}. Tất cả quyền được bảo lưu.</p>
            <p>MST: {companyInfo.taxCode}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
