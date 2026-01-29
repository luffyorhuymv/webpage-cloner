import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CategoriesManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách danh mục</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tính năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManagement;
