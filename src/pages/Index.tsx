import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import NewsSection from "@/components/home/NewsSection";
import ZaloButton from "@/components/ZaloButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <CategoriesSection />
        <FeaturedProducts />
        <WhyChooseUs />
        <NewsSection />
      </main>
      <Footer />
      <ZaloButton />
    </div>
  );
};

export default Index;
