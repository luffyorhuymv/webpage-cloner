import PageLayout from "@/components/layout/PageLayout";
import { companyInfo, companyStats, whyChooseUs } from "@/data/mockData";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Target, 
  Eye, 
  Award,
  Heart,
  Users,
  Package,
  Briefcase,
  PiggyBank,
  Cpu,
  Handshake,
  ShieldCheck,
  UserCog
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
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
  const milestones = [
    { year: "2014", title: "Thành lập công ty", description: "Bắt đầu với đội ngũ 5 nhân viên" },
    { year: "2016", title: "Mở rộng thị trường", description: "Trở thành đại lý chính thức Schneider Electric" },
    { year: "2018", title: "Phát triển mạnh mẽ", description: "Đạt 500+ khách hàng doanh nghiệp" },
    { year: "2020", title: "Đối tác chiến lược", description: "Hợp tác với Mitsubishi, ABB, Siemens" },
    { year: "2024", title: "Chuyển đổi số", description: "Ra mắt nền tảng thương mại điện tử" },
  ];

  return (
    <PageLayout
      title="Giới thiệu"
      subtitle="Tìm hiểu về CƠ ĐIỆN TRƯỜNG PHÁT - Đối tác tin cậy cho giải pháp điện công nghiệp"
      breadcrumbs={[{ label: "Giới thiệu" }]}
      sidebarProps={{
        showCategories: true,
        showBestSellers: true,
        showContact: true,
        showSearch: false,
      }}
    >
      {/* About Company Widget */}
      <div className="bg-card rounded-lg border overflow-hidden mb-6">
        <div className="bg-primary text-primary-foreground px-6 py-4">
          <h2 className="text-xl font-bold">Về chúng tôi</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop"
                alt="Về CƠ ĐIỆN TRƯỜNG PHÁT"
                className="rounded-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm">Năm kinh nghiệm</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{companyInfo.fullName}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {companyInfo.fullName} tự hào là một trong những đơn vị hàng đầu chuyên cung cấp 
                thiết bị điện công nghiệp tại Việt Nam. Với hơn 10 năm kinh nghiệm, chúng tôi 
                cam kết mang đến cho khách hàng những sản phẩm chất lượng cao với giá cả cạnh tranh.
              </p>
              <ul className="space-y-2">
                {["Hơn 10 năm kinh nghiệm", "Đội ngũ kỹ sư chuyên nghiệp", "Sản phẩm chính hãng 100%", "Bảo hành dài hạn"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Widget */}
      <div className="bg-card rounded-lg border overflow-hidden mb-6">
        <div className="bg-primary text-primary-foreground px-6 py-4">
          <h2 className="text-xl font-bold">Thành tựu của chúng tôi</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companyStats.map((stat, idx) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <div key={idx} className="text-center p-4 rounded-lg bg-muted/50">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vision & Mission Widget */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4" />
              Sứ mệnh
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cung cấp giải pháp thiết bị điện công nghiệp toàn diện, chất lượng cao, 
              giá cả hợp lý, góp phần vào sự phát triển bền vững của ngành công nghiệp Việt Nam.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Tầm nhìn
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Trở thành nhà cung cấp thiết bị điện công nghiệp hàng đầu Việt Nam, 
              được khách hàng tin tưởng và lựa chọn đầu tiên khi có nhu cầu.
            </p>
          </div>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-4 py-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Giá trị cốt lõi
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chất lượng - Uy tín - Chuyên nghiệp - Tận tâm với khách hàng
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Widget */}
      <div className="bg-card rounded-lg border overflow-hidden mb-6">
        <div className="bg-primary text-primary-foreground px-6 py-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Hành trình phát triển
          </h2>
        </div>
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20" />
            
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded mb-2">
                      {milestone.year}
                    </span>
                    <h4 className="font-semibold mb-1">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Widget */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-primary text-primary-foreground px-6 py-4">
          <h2 className="text-xl font-bold">Tại sao chọn chúng tôi?</h2>
        </div>
        <div className="p-6">
          <div className="grid sm:grid-cols-2 gap-4">
            {whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon] || ShieldCheck;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 rounded-lg bg-muted/50"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
