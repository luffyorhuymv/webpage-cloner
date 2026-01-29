import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PostsManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Tính năng đang được phát triển...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostsManagement;
