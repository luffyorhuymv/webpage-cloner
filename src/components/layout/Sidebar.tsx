import { Link } from "react-router-dom";
import { 
  Tag, 
  TrendingUp, 
  Phone, 
  Clock, 
  MapPin,
  Search,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories, products, companyInfo } from "@/data/mockData";

interface SidebarProps {
  showCategories?: boolean;
  showBestSellers?: boolean;
  showContact?: boolean;
  showSearch?: boolean;
}

const Sidebar = ({ 
  showCategories = true, 
  showBestSellers = true, 
  showContact = true,
  showSearch = true 
}: SidebarProps) => {
  const bestSellerProducts = products.filter(p => p.bestseller).slice(0, 4);

  return (
    <aside className="space-y-6">
      {/* Search Widget */}
      {showSearch && (
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Search className="h-4 w-4" />
              Tìm kiếm
            </h3>
          </div>
          <div className="p-4">
            <div className="flex gap-2">
              <Input placeholder="Nhập từ khóa..." className="flex-1" />
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Widget */}
      {showCategories && (
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Danh mục sản phẩm
            </h3>
          </div>
          <div className="p-0">
            <ul className="divide-y">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/cua-hang?category=${category.slug}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors group"
                  >
                    <span className="group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {category.productCount}
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Best Sellers Widget */}
      {showBestSellers && (
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Sản phẩm bán chạy
            </h3>
          </div>
          <div className="p-4 space-y-4">
            {bestSellerProducts.map((product) => (
              <Link
                key={product.id}
                to={`/san-pham/${product.slug}`}
                className="flex gap-3 group"
              >
                <div className="w-16 h-16 flex-shrink-0 bg-muted rounded overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-primary font-semibold text-sm mt-1">
                    {product.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Contact Widget */}
      {showContact && (
        <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Liên hệ
            </h3>
          </div>
          <div className="p-4 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{companyInfo.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              <a href={`tel:${companyInfo.hotline}`} className="text-primary font-semibold hover:underline">
                {companyInfo.hotline}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground">{companyInfo.workingHours}</span>
            </div>
          </div>
        </div>
      )}

      {/* Zalo CTA Widget */}
      <div className="bg-gradient-to-br from-[#0068ff] to-[#0052cc] rounded-lg p-4 text-white">
        <h3 className="font-bold text-lg mb-2">Cần tư vấn?</h3>
        <p className="text-white/80 text-sm mb-4">
          Liên hệ Zalo để được hỗ trợ nhanh chóng
        </p>
        <a
          href={companyInfo.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-[#0068ff] px-4 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
        >
          <span className="font-bold">Zalo</span>
          Chat ngay
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
