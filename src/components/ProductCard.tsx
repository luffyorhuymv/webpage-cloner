import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, formatPrice, getDiscountPercent } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const discount = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: product.name,
    });
  };

  return (
    <Card className="group overflow-hidden card-hover">
      <Link to={`/san-pham/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount && (
            <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground">
              -{discount}%
            </Badge>
          )}
          {product.bestseller && (
            <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
              Bán chạy
            </Badge>
          )}
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/san-pham/${product.slug}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors mb-2 min-h-[40px]">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full mt-3"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
