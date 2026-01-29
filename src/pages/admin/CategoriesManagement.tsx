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
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Loader2, FolderTree, ChevronRight } from "lucide-react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, Category } from "@/hooks/useCategories";
import { CategoryFormDialog } from "@/components/admin/CategoryFormDialog";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

const CategoriesManagement = () => {
  const { data: categories, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [searchTerm, setSearchTerm] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Build tree structure for display
  const getCategoryTree = () => {
    if (!filteredCategories) return [];
    
    const rootCategories = filteredCategories.filter(c => !c.parent_id);
    const getChildren = (parentId: string): Category[] => {
      return filteredCategories.filter(c => c.parent_id === parentId);
    };

    const buildTree = (cats: Category[], level = 0): { category: Category; level: number }[] => {
      const result: { category: Category; level: number }[] = [];
      for (const cat of cats) {
        result.push({ category: cat, level });
        const children = getChildren(cat.id);
        if (children.length > 0) {
          result.push(...buildTree(children, level + 1));
        }
      }
      return result;
    };

    return buildTree(rootCategories);
  };

  const categoryTree = getCategoryTree();

  const handleAdd = () => {
    setSelectedCategory(null);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (selectedCategory) {
      updateCategory.mutate({ id: selectedCategory.id, ...data }, {
        onSuccess: () => setFormOpen(false),
      });
    } else {
      createCategory.mutate(data, {
        onSuccess: () => setFormOpen(false),
      });
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCategory) {
      deleteCategory.mutate(selectedCategory.id, {
        onSuccess: () => setDeleteOpen(false),
      });
    }
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return null;
    return categories?.find(c => c.id === parentId)?.name;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FolderTree className="h-5 w-5" />
              Danh sách danh mục ({categories?.length || 0})
            </CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm danh mục..."
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
          ) : categoryTree.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {searchTerm ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào"}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên danh mục</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Danh mục cha</TableHead>
                    <TableHead className="text-center">Thứ tự</TableHead>
                    <TableHead className="text-center">Trạng thái</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryTree.map(({ category, level }) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center gap-1" style={{ paddingLeft: `${level * 24}px` }}>
                          {level > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                          <span className="font-medium">{category.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {category.slug}
                      </TableCell>
                      <TableCell>
                        {getParentName(category.parent_id) || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        {category.sort_order}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={category.is_active ? "default" : "secondary"}>
                          {category.is_active ? "Hiển thị" : "Ẩn"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(category)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(category)}
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

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        category={selectedCategory}
        onSubmit={handleFormSubmit}
        isLoading={createCategory.isPending || updateCategory.isPending}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        title="Xóa danh mục"
        description={`Bạn có chắc chắn muốn xóa danh mục "${selectedCategory?.name}"? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
};

export default CategoriesManagement;
