import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil, Save, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Page {
  id: string;
  title: string;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  is_system: boolean;
  is_active: boolean;
  sort_order: number;
}

const PagesManagement = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchPages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách trang",
        variant: "destructive",
      });
    } else {
      setPages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleEdit = (page: Page) => {
    setEditingPage({ ...page });
  };

  const handleSave = async () => {
    if (!editingPage) return;

    setSaving(true);
    const { error } = await supabase
      .from("pages")
      .update({
        title: editingPage.title,
        slug: editingPage.slug,
        meta_title: editingPage.meta_title,
        meta_description: editingPage.meta_description,
        is_active: editingPage.is_active,
      })
      .eq("id", editingPage.id);

    if (error) {
      toast({
        title: "Lỗi",
        description: error.message.includes("duplicate") 
          ? "URL này đã tồn tại, vui lòng chọn URL khác" 
          : "Không thể lưu thay đổi",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin trang",
      });
      setEditingPage(null);
      fetchPages();
    }
    setSaving(false);
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quản lý trang</h2>
      </div>

      <div className="bg-background rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[120px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.title}</TableCell>
                <TableCell>
                  <code className="bg-muted px-2 py-1 rounded text-sm">
                    /{page.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      page.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {page.is_active ? "Hoạt động" : "Ẩn"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(page)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/${page.slug}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa trang</DialogTitle>
          </DialogHeader>
          {editingPage && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề trang</Label>
                <Input
                  id="title"
                  value={editingPage.title}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL (slug)</Label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0">
                    <span className="text-sm text-muted-foreground">/</span>
                  </div>
                  <Input
                    id="slug"
                    value={editingPage.slug}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, slug: slugify(e.target.value) })
                    }
                    className="rounded-l-none"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  URL sẽ tự động được chuẩn hóa (không dấu, viết thường)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                <Input
                  id="meta_title"
                  value={editingPage.meta_title || ""}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, meta_title: e.target.value })
                  }
                  placeholder="Tiêu đề hiển thị trên Google"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                <Input
                  id="meta_description"
                  value={editingPage.meta_description || ""}
                  onChange={(e) =>
                    setEditingPage({
                      ...editingPage,
                      meta_description: e.target.value,
                    })
                  }
                  placeholder="Mô tả hiển thị trên Google"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Trang hoạt động</Label>
                <Switch
                  id="is_active"
                  checked={editingPage.is_active}
                  onCheckedChange={(checked) =>
                    setEditingPage({ ...editingPage, is_active: checked })
                  }
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingPage(null)}>
                  Hủy
                </Button>
                <Button onClick={handleSave} disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Save className="mr-2 h-4 w-4" />
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PagesManagement;
