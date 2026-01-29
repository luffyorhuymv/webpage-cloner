-- Create pages table to store page configurations and custom URLs
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_system BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

-- Anyone can view active pages
CREATE POLICY "Anyone can view active pages"
ON public.pages
FOR SELECT
USING (is_active = true);

-- Admins can manage pages
CREATE POLICY "Admins can manage pages"
ON public.pages
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_pages_updated_at
BEFORE UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default system pages
INSERT INTO public.pages (title, slug, is_system, is_active, sort_order) VALUES
('Giới thiệu', 'gioi-thieu', true, true, 1),
('Liên hệ', 'lien-he', true, true, 2),
('Tin tức', 'tin-tuc', true, true, 3),
('Chính sách bảo hành', 'chinh-sach-bao-hanh', true, true, 4),
('Chính sách vận chuyển', 'chinh-sach-van-chuyen', true, true, 5),
('Hướng dẫn mua hàng', 'huong-dan-mua-hang', true, true, 6);