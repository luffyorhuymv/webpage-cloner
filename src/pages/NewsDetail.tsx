import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { newsPosts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, ArrowRight, Share2, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = newsPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout
        title="Không tìm thấy"
        breadcrumbs={[{ label: "Tin tức", href: "/tin-tuc" }, { label: "Không tìm thấy" }]}
      >
        <div className="bg-card rounded-lg border p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">Bài viết không tồn tại</p>
          <Link to="/tin-tuc">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại tin tức
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const currentIndex = newsPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? newsPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < newsPosts.length - 1 ? newsPosts[currentIndex + 1] : null;
  const relatedPosts = newsPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <PageLayout
      title={post.title}
      breadcrumbs={[
        { label: "Tin tức", href: "/tin-tuc" },
        { label: post.title },
      ]}
      sidebarProps={{
        showCategories: true,
        showBestSellers: false,
        showContact: true,
        showSearch: true,
      }}
    >
      <article className="bg-card rounded-lg border overflow-hidden">
        {/* Featured Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
            <Badge className="bg-primary hover:bg-primary/90">{post.category}</Badge>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-6">{post.title}</h1>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="lead text-lg">{post.excerpt}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Share */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Chia sẻ:
              </span>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Navigation */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {prevPost ? (
          <Link
            to={`/tin-tuc/${prevPost.slug}`}
            className="bg-card rounded-lg border p-4 group hover:border-primary transition-colors"
          >
            <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
              <ArrowLeft className="h-3 w-3" />
              Bài trước
            </span>
            <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {prevPost.title}
            </h4>
          </Link>
        ) : (
          <div />
        )}

        {nextPost && (
          <Link
            to={`/tin-tuc/${nextPost.slug}`}
            className="bg-card rounded-lg border p-4 group hover:border-primary transition-colors text-right"
          >
            <span className="text-xs text-muted-foreground flex items-center justify-end gap-1 mb-1">
              Bài tiếp
              <ArrowRight className="h-3 w-3" />
            </span>
            <h4 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
              {nextPost.title}
            </h4>
          </Link>
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <h3 className="text-lg font-bold">Bài viết liên quan</h3>
            </div>
            <div className="p-4">
              <div className="grid gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/tin-tuc/${relatedPost.slug}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <span className="text-xs text-muted-foreground mt-1">
                        {new Date(relatedPost.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default NewsDetail;
