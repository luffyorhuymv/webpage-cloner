import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Grid3X3, List, Filter } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PRODUCTS_PER_PAGE = 9;

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categorySlug = searchParams.get("category");
  
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categorySlug ? [categorySlug] : []
  );

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        const category = categories.find((c) => c.id === product.categoryId);
        return category && selectedCategories.includes(category.slug);
      });
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "bestseller":
        result.sort((a, b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [selectedCategories, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (slug: string, checked: boolean) => {
    setCurrentPage(1);
    if (checked) {
      setSelectedCategories([...selectedCategories, slug]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== slug));
    }
  };

  return (
    <PageLayout
      title="Cửa hàng"
      subtitle="Khám phá đa dạng thiết bị điện công nghiệp chính hãng"
      breadcrumbs={[{ label: "Cửa hàng" }]}
      showSidebar={false}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter - WordPress Style */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden sticky top-40">
            <div className="bg-primary text-primary-foreground px-4 py-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc sản phẩm
              </h3>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-sm text-muted-foreground uppercase mb-3">
                Danh mục
              </h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-3">
                    <Checkbox
                      id={category.slug}
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.slug, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={category.slug}
                      className="text-sm cursor-pointer flex-1 flex items-center justify-between"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({category.productCount})
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {selectedCategories.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setSelectedCategories([])}
                >
                  Xóa bộ lọc
                </Button>
              )}
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar - WordPress Style */}
          <div className="bg-card rounded-lg border p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-muted-foreground text-sm">
              Hiển thị <span className="font-semibold text-foreground">{paginatedProducts.length}</span> / {filteredProducts.length} sản phẩm
            </p>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sắp xếp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="price-asc">Giá thấp đến cao</SelectItem>
                  <SelectItem value="price-desc">Giá cao đến thấp</SelectItem>
                  <SelectItem value="bestseller">Bán chạy</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          {paginatedProducts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "flex flex-col gap-4"
                }
              >
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination - WordPress Style */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination>
                    <PaginationContent className="bg-card border rounded-lg p-1">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="bg-card rounded-lg border p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">
                Không tìm thấy sản phẩm nào
              </p>
              <Button
                variant="outline"
                onClick={() => setSelectedCategories([])}
              >
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
