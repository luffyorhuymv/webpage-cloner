import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    "Hơn 10 năm kinh nghiệm trong ngành",
    "Đội ngũ kỹ sư chuyên nghiệp",
    "Sản phẩm chính hãng 100%",
    "Bảo hành dài hạn, hậu mãi tốt",
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=500&fit=crop"
                alt="Về chúng tôi"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl hidden md:block">
                <p className="text-4xl font-bold">10+</p>
                <p className="text-sm">Năm kinh nghiệm</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Về chúng tôi
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Đối tác tin cậy cho giải pháp điện công nghiệp
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              CƠ ĐIỆN TRƯỜNG PHÁT tự hào là một trong những đơn vị hàng đầu chuyên cung cấp 
              thiết bị điện công nghiệp tại Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi 
              cam kết mang đến cho khách hàng những sản phẩm chất lượng cao với giá cả cạnh tranh.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Chúng tôi là đối tác chính thức của các thương hiệu hàng đầu như Schneider Electric, 
              Mitsubishi, ABB, Siemens, và nhiều thương hiệu uy tín khác trên thế giới.
            </p>

            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

            <Link to="/gioi-thieu">
              <Button size="lg" className="group">
                Tìm hiểu thêm
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
