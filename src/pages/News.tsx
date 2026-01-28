import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloButton from "@/components/ZaloButton";
import { newsPosts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const News = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 lg:pt-40 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container-custom text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Tin tức & Sự kiện</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Cập nhật những thông tin mới nhất về sản phẩm, khuyến mãi và kiến thức ngành điện
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link to={`/tin-tuc/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>

                    <Link to={`/tin-tuc/${post.slug}`}>
                      <h2 className="text-lg font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                      </div>
                    </div>

                    <Link
                      to={`/tin-tuc/${post.slug}`}
                      className="inline-flex items-center text-primary font-medium mt-4 hover:underline"
                    >
                      Đọc thêm
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ZaloButton />
    </div>
  );
};

export default News;
