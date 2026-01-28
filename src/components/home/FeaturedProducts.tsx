import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";

const FeaturedProducts = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const allCategories = [{ id: "all", name: "Tất cả", slug: "all" }, ...categories];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? featuredProducts
      : featuredProducts.filter((p) => p.categoryId === activeCategory);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-semibold text-sm uppercase tracking-wider"
            >
              Sản phẩm nổi bật
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-2"
            >
              Sản phẩm bán chạy
            </motion.h2>
          </div>
          <Link to="/cua-hang">
            <Button variant="outline" className="group">
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex-wrap h-auto gap-2 bg-transparent p-0">
            {allCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full border"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Không có sản phẩm nào trong danh mục này
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
