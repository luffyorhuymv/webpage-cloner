import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, FolderTree, ShoppingCart, FileText, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Stats {
  products: number;
  categories: number;
  orders: number;
  posts: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    products: 0,
    categories: 0,
    orders: 0,
    posts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      const [productsRes, categoriesRes, ordersRes, postsRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        orders: ordersRes.count || 0,
        posts: postsRes.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const handleExportWordPress = async () => {
    setExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("export-wordpress");
      
      if (error) {
        throw error;
      }

      // Create blob and download
      const blob = new Blob([data], { type: "application/xml" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wordpress-export-${new Date().toISOString().split("T")[0]}.xml`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Xuất file WordPress XML thành công!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Không thể xuất file. Vui lòng thử lại sau.");
    } finally {
      setExporting(false);
    }
  };

  const statCards = [
    { title: "Sản phẩm", value: stats.products, icon: Package, color: "text-blue-500" },
    { title: "Danh mục", value: stats.categories, icon: FolderTree, color: "text-green-500" },
    { title: "Đơn hàng", value: stats.orders, icon: ShoppingCart, color: "text-orange-500" },
    { title: "Bài viết", value: stats.posts, icon: FileText, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button onClick={handleExportWordPress} disabled={exporting}>
          {exporting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Xuất WordPress XML
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
