import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { companyInfo } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Gửi thành công!",
      description: "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
    });

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <PageLayout
      title="Liên hệ"
      subtitle="Hãy liên hệ với chúng tôi nếu bạn cần tư vấn hoặc hỗ trợ"
      breadcrumbs={[{ label: "Liên hệ" }]}
      sidebarProps={{
        showCategories: true,
        showBestSellers: false,
        showContact: false,
        showSearch: false,
      }}
    >
      {/* Contact Info Cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-card rounded-lg border p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Địa chỉ</h3>
            <p className="text-muted-foreground text-sm">{companyInfo.address}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Điện thoại</h3>
            <p className="text-primary font-semibold">{companyInfo.hotline}</p>
            <p className="text-muted-foreground text-sm">{companyInfo.phone}</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <a href={`mailto:${companyInfo.email}`} className="text-primary hover:underline">
              {companyInfo.email}
            </a>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">Giờ làm việc</h3>
            <p className="text-muted-foreground text-sm">{companyInfo.workingHours}</p>
          </div>
        </div>
      </div>

      {/* Contact Form - WordPress Style */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="bg-primary text-primary-foreground px-6 py-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Gửi tin nhắn cho chúng tôi
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Họ và tên *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Số điện thoại
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123 456 789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Tiêu đề *</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Nội dung *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              placeholder="Nhập nội dung tin nhắn..."
              required
            />
          </div>

          <Button type="submit" size="lg" disabled={isSubmitting}>
            <Send className="h-5 w-5 mr-2" />
            {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
          </Button>
        </form>
      </div>

      {/* Map */}
      <div className="mt-8">
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Bản đồ
            </h2>
          </div>
          <div className="bg-muted h-80 flex items-center justify-center">
            <p className="text-muted-foreground">
              [Bản đồ Google Maps sẽ được thêm khi kết nối API]
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
