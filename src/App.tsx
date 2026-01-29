import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import WarrantyPolicy from "./pages/WarrantyPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import ShoppingGuide from "./pages/ShoppingGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cua-hang" element={<Shop />} />
            <Route path="/san-pham/:slug" element={<ProductDetail />} />
            <Route path="/gio-hang" element={<Cart />} />
            <Route path="/thanh-toan" element={<Checkout />} />
            <Route path="/dat-hang-thanh-cong" element={<OrderSuccess />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="/lien-he" element={<Contact />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/tin-tuc/:slug" element={<NewsDetail />} />
            <Route path="/chinh-sach-bao-hanh" element={<WarrantyPolicy />} />
            <Route path="/chinh-sach-van-chuyen" element={<ShippingPolicy />} />
            <Route path="/huong-dan-mua-hang" element={<ShoppingGuide />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
