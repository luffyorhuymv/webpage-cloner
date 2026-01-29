import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Loader2, FileText, Eye } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { usePosts, useCreatePost, useUpdatePost, useDeletePost, Post } from "@/hooks/usePosts";
import { PostFormDialog } from "@/components/admin/PostFormDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

const PostsManagement = () => {
  const { data: posts, isLoading } = usePosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedPost(null);
    setFormOpen(true);
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setFormOpen(true);
  };

  const handleDelete = (post: Post) => {
    setSelectedPost(post);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedPost) {
      updatePost.mutate({ id: selectedPost.id, ...data }, {
        onSuccess: () => setFormOpen(false),
      });
    } else {
      createPost.mutate(data, {
        onSuccess: () => setFormOpen(false),
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedPost) {
      deletePost.mutate(selectedPost.id, {
        onSuccess: () => setDeleteOpen(false),
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý bài viết</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm bài viết
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Danh sách bài viết ({filteredPosts?.length || 0})
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts?.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {searchTerm ? "Không tìm thấy bài viết nào" : "Chưa có bài viết nào"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Ảnh</TableHead>
                    <TableHead>Tiêu đề</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-center">Lượt xem</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts?.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium line-clamp-1">{post.title}</p>
                          {post.excerpt && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                              {post.excerpt}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.category ? (
                          <Badge variant="outline">{post.category}</Badge>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          {post.view_count || 0}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={post.is_published ? "default" : "secondary"}>
                          {post.is_published ? "Đã xuất bản" : "Nháp"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(post.created_at), "dd/MM/yyyy", { locale: vi })}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(post)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(post)}
                              className="text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <PostFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        post={selectedPost}
        onSubmit={handleFormSubmit}
        isLoading={createPost.isPending || updatePost.isPending}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Xóa bài viết"
        description={`Bạn có chắc chắn muốn xóa bài viết "${selectedPost?.title}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
};

export default PostsManagement;
