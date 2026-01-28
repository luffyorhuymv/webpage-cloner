import { motion } from "framer-motion";
import { 
  PiggyBank, 
  Cpu, 
  Handshake, 
  ShieldCheck, 
  Users 
} from "lucide-react";
import { whyChooseUs } from "@/data/mockData";

const iconMap: Record<string, React.ElementType> = {
  "piggy-bank": PiggyBank,
  cpu: Cpu,
  handshake: Handshake,
  "shield-check": ShieldCheck,
  "users-cog": Users,
};

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-section-dark text-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-sm uppercase tracking-wider"
          >
            Tại sao chọn chúng tôi
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mt-2"
          >
            Lý do khách hàng tin tưởng
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon] || ShieldCheck;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
