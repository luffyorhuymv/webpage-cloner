import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Users, Package, Briefcase, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyStats } from "@/data/mockData";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&h=800&fit=crop",
    title: "Thiết bị điện công nghiệp",
    subtitle: "Chính hãng - Giá tốt - Bảo hành dài hạn",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&h=800&fit=crop",
    title: "Tủ điện hạ thế",
    subtitle: "Thiết kế - Lắp đặt - Bảo trì chuyên nghiệp",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop",
    title: "Nguồn dự phòng UPS",
    subtitle: "Đa dạng công suất - Phù hợp mọi nhu cầu",
  },
];

const iconMap: Record<string, React.ElementType> = {
  users: Users,
  package: Package,
  briefcase: Briefcase,
  award: Award,
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative pt-[140px] lg:pt-[180px]">
      {/* Hero Slider */}
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            <div className="absolute inset-0 overlay-gradient" />
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-2xl text-white"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {slides[currentSlide].title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 mb-6">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Xem sản phẩm
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground">
                      Liên hệ ngay
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companyStats.map((stat, index) => {
              const Icon = iconMap[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="h-8 w-8" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-primary-foreground/80">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
