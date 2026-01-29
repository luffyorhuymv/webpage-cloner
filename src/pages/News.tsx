import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { newsPosts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";

const News = () => {
  return (
    <PageLayout
      title="Tin tức & Sự kiện"
      subtitle="Cập nhật những tin tức mới nhất về sản phẩm và công nghệ"
      breadcrumbs={[{ label: "Tin tức" }]}
      sidebarProps={{
        showCategories: true,
        showBestSellers: true,
        showContact: true,
        showSearch: true,
      }}
    >
      <div className="space-y-6">
        {newsPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-lg border overflow-hidden group"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <Link to={`/tin-tuc/${post.slug}`} className="md:w-72 flex-shrink-0">
                <div className="aspect-video md:aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-primary hover:bg-primary/90">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <Link to={`/tin-tuc/${post.slug}`}>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  to={`/tin-tuc/${post.slug}`}
                  className="inline-flex items-center text-primary font-medium text-sm group/link"
                >
                  Đọc tiếp
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination placeholder */}
      <div className="mt-8 flex justify-center">
        <div className="bg-card rounded-lg border px-4 py-2 text-sm text-muted-foreground">
          Trang 1 / 1
        </div>
      </div>
    </PageLayout>
  );
};

export default News;
