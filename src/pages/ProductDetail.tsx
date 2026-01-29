import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import {
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Heart,
  Share2
} from "lucide-react";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <PageLayout
        title="Không tìm thấy"
        breadcrumbs={[{ label: "Cửa hàng", href: "/cua-hang" }, { label: "Không tìm thấy" }]}
      >
        <div className="bg-card rounded-lg border p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">Sản phẩm không tồn tại</p>
          <Link to="/cua-hang">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.name}`,
    });
  };

  return (
    <PageLayout
      title={product.name}
      breadcrumbs={[
        { label: "Cửa hàng", href: "/cua-hang" },
        ...(category ? [{ label: category.name, href: `/cua-hang?category=${category.slug}` }] : []),
        { label: product.name },
      ]}
      sidebarProps={{
        showCategories: true,
        showBestSellers: true,
        showContact: true,
        showSearch: true,
      }}
    >
      {/* Product Main Widget */}
      <div className="bg-card rounded-lg border overflow-hidden mb-6">
        <div className="grid md:grid-cols-2">
          {/* Gallery */}
          <div className="p-6 border-b md:border-b-0 md:border-r">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {product.bestseller && (
                <Badge className="bg-secondary text-secondary-foreground">Bán chạy</Badge>
              )}
              {product.featured && (
                <Badge variant="outline">Nổi bật</Badge>
              )}
              {product.inStock ? (
                <Badge className="bg-green-500/10 text-green-600 border-green-200">
                  <Check className="h-3 w-3 mr-1" />
                  Còn hàng
                </Badge>
              ) : (
                <Badge variant="destructive">Hết hàng</Badge>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            
            {category && (
              <Link
                to={`/cua-hang?category=${category.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Danh mục: {category.name}
              </Link>
            )}

            <div className="flex items-baseline gap-3 my-4">
              <span className="text-3xl font-bold text-primary">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Yêu thích
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Chia sẻ
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t">
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Truck className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs">Giao hàng nhanh</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <Shield className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs">Chính hãng</span>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted/50">
                <RotateCcw className="h-6 w-6 mx-auto mb-1 text-primary" />
                <span className="text-xs">Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs Widget */}
      <div className="bg-card rounded-lg border overflow-hidden mb-6">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start rounded-none border-b bg-muted/50 p-0 h-auto">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
            >
              Mô tả sản phẩm
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent py-3 px-6"
            >
              Thông số kỹ thuật
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="description" className="mt-0">
              <div className="prose max-w-none text-muted-foreground">
                <p>{product.description}</p>
                <h4>Tính năng nổi bật:</h4>
                <ul>
                  <li>Sản phẩm chính hãng, nguồn gốc rõ ràng</li>
                  <li>Chất lượng cao, độ bền vượt trội</li>
                  <li>Thiết kế hiện đại, dễ lắp đặt</li>
                  <li>Bảo hành theo tiêu chuẩn nhà sản xuất</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-0">
              {product.specifications && Object.keys(product.specifications).length > 0 ? (
                <table className="w-full">
                  <tbody className="divide-y">
                    {Object.entries(product.specifications).map(([key, value], index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 font-medium bg-muted/50 w-1/3">
                          {key}
                        </td>
                        <td className="py-3 px-4">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted-foreground">Chưa có thông số kỹ thuật</p>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Related Products Widget */}
      {relatedProducts.length > 0 && (
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="bg-primary text-primary-foreground px-6 py-4">
            <h3 className="text-lg font-bold">Sản phẩm liên quan</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ProductDetail;
