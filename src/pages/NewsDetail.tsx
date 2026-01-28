import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloButton from "@/components/ZaloButton";
import { newsPosts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";

const NewsDetail = () => {
  const { slug } = useParams();
  const post = newsPosts.find((p) => p.slug === slug);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 lg:pt-40 pb-16">
          <div className="container-custom text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
            <Link to="/tin-tuc">
              <Button>Quay lại tin tức</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = newsPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 lg:pt-40 pb-16">
        <article className="container-custom">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link to="/tin-tuc" className="hover:text-primary">Tin tức</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground line-clamp-1">{post.title}</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <header className="mb-8">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-2xl lg:text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {formatDate(post.createdAt)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {post.author}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl text-muted-foreground mb-6">{post.excerpt}</p>
              <p>{post.content}</p>
              
              {/* Placeholder content */}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center py-6 border-t">
              <Link to="/tin-tuc">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </Link>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-8">Bài viết liên quan</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="bg-card rounded-lg border overflow-hidden">
                    <Link to={`/tin-tuc/${relatedPost.slug}`}>
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/tin-tuc/${relatedPost.slug}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-2">
                        {formatDate(relatedPost.createdAt)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
      <ZaloButton />
    </div>
  );
};

export default NewsDetail;
