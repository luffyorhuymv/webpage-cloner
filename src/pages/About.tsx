import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloButton from "@/components/ZaloButton";
import { companyInfo, companyStats, whyChooseUs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Package,
  Briefcase,
  Award,
  PiggyBank,
  Cpu,
  Handshake,
  ShieldCheck,
  UserCog,
  Target,
  Eye,
  Heart,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  users: Users,
  package: Package,
  briefcase: Briefcase,
  award: Award,
  "piggy-bank": PiggyBank,
  cpu: Cpu,
  handshake: Handshake,
  "shield-check": ShieldCheck,
  "users-cog": UserCog,
};

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 lg:pt-40 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Về {companyInfo.name}
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Đối tác tin cậy trong lĩnh vực thiết bị điện công nghiệp
            </p>
          </div>
        </section>

        {/* Company Intro */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-6">
                  Câu chuyện của chúng tôi
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    {companyInfo.fullName} được thành lập với sứ mệnh mang đến những
                    giải pháp thiết bị điện chất lượng cao cho các doanh nghiệp và
                    công trình tại Việt Nam.
                  </p>
                  <p>
                    Với hơn 10 năm kinh nghiệm trong ngành, chúng tôi tự hào là đối
                    tác chính thức của các thương hiệu hàng đầu thế giới như
                    Schneider Electric, Mitsubishi, ABB, và Siemens.
                  </p>
                  <p>
                    Đội ngũ kỹ sư giàu kinh nghiệm của chúng tôi luôn sẵn sàng tư
                    vấn và hỗ trợ khách hàng 24/7, đảm bảo mọi dự án được thực hiện
                    đúng tiến độ và chất lượng.
                  </p>
                </div>
                <Link to="/lien-he" className="inline-block mt-6">
                  <Button size="lg">Liên hệ với chúng tôi</Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop"
                  alt="Về chúng tôi"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                  <p className="text-4xl font-bold">10+</p>
                  <p className="text-sm">Năm kinh nghiệm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {companyStats.map((stat, idx) => {
                const Icon = iconMap[stat.icon] || Users;
                return (
                  <div key={idx} className="text-center">
                    <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                    <p className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-card rounded-lg border">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Sứ mệnh</h3>
                <p className="text-muted-foreground">
                  Cung cấp giải pháp thiết bị điện tối ưu, góp phần vào sự phát
                  triển bền vững của các doanh nghiệp Việt Nam.
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-lg border">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Tầm nhìn</h3>
                <p className="text-muted-foreground">
                  Trở thành đơn vị hàng đầu trong lĩnh vực phân phối thiết bị điện
                  công nghiệp tại Việt Nam.
                </p>
              </div>
              <div className="text-center p-8 bg-card rounded-lg border">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Giá trị cốt lõi</h3>
                <p className="text-muted-foreground">
                  Chất lượng - Uy tín - Chuyên nghiệp - Tận tâm với khách hàng
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-section-dark text-white">
          <div className="container-custom">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-12">
              Tại sao chọn chúng tôi?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((item) => {
                const Icon = iconMap[item.icon] || Users;
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloButton />
    </div>
  );
};

export default About;
