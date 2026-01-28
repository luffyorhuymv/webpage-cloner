import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Phone, MapPin, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyInfo } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Cửa hàng", href: "/cua-hang" },
  { name: "Nguồn dự phòng", href: "/cua-hang?category=nguon-du-phong" },
  { name: "Tủ điện hạ thế", href: "/cua-hang?category=tu-dien-ha-the" },
  { name: "Phụ kiện tủ điện", href: "/cua-hang?category=phu-kien-tu-dien" },
  { name: "Tin tức", href: "/tin-tuc" },
  { name: "Liên hệ", href: "/lien-he" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{companyInfo.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{companyInfo.workingHours}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={companyInfo.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              Facebook
            </a>
            <a
              href={companyInfo.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors"
            >
              Youtube
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`bg-background transition-all duration-300 ${
          isScrolled ? "shadow-lg py-2" : "py-4"
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">CĐ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-primary leading-tight">
                  {companyInfo.name}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Thiết bị điện công nghiệp
                </p>
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Hotline */}
              <a
                href={`tel:${companyInfo.hotline}`}
                className="hidden md:flex items-center gap-2 text-primary font-semibold"
              >
                <Phone className="h-5 w-5" />
                <span>{companyInfo.hotline}</span>
              </a>

              {/* Search - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Zalo Button */}
              <a
                href={companyInfo.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="hidden sm:flex bg-[#0068ff] hover:bg-[#0052cc] text-white gap-2">
                  <span className="font-bold">Zalo</span>
                  <span className="hidden md:inline">Tư vấn</span>
                </Button>
              </a>

              {/* Cart */}
              <Link to="/gio-hang">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="lg:hidden mt-4 pb-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden lg:block bg-section-dark text-white">
        <div className="container-custom">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="block px-5 py-3 text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t shadow-lg">
          <nav className="container-custom py-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t mt-4">
                <a
                  href={`tel:${companyInfo.hotline}`}
                  className="flex items-center gap-2 px-4 py-3 text-primary font-semibold"
                >
                  <Phone className="h-5 w-5" />
                  <span>Hotline: {companyInfo.hotline}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
