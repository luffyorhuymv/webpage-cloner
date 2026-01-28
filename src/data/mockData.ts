// Mock data for Cơ Điện Trường Phát website

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  categoryId: string;
  category: string;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  createdAt: string;
}

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  createdAt: string;
  category: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Phụ kiện tủ điện",
    slug: "phu-kien-tu-dien",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop",
    description: "Các loại phụ kiện tủ điện chất lượng cao",
    productCount: 45,
  },
  {
    id: "2",
    name: "Nguồn dự phòng",
    slug: "nguon-du-phong",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "UPS, bộ lưu điện và nguồn dự phòng",
    productCount: 28,
  },
  {
    id: "3",
    name: "Tủ điện hạ thế",
    slug: "tu-dien-ha-the",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop",
    description: "Tủ điện hạ thế công nghiệp và dân dụng",
    productCount: 32,
  },
  {
    id: "4",
    name: "Sản phẩm khác",
    slug: "san-pham-khac",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Các thiết bị điện khác",
    productCount: 56,
  },
];

export const products: Product[] = [
  // Phụ kiện tủ điện
  {
    id: "1",
    name: "Aptomat 3P 100A Mitsubishi",
    slug: "aptomat-3p-100a-mitsubishi",
    price: 1250000,
    originalPrice: 1450000,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=800&fit=crop",
    ],
    categoryId: "1",
    category: "Phụ kiện tủ điện",
    description: "Aptomat 3 pha 100A Mitsubishi chính hãng, chất lượng cao",
    specifications: {
      "Số pha": "3 pha",
      "Dòng điện định mức": "100A",
      "Điện áp": "380V",
      "Thương hiệu": "Mitsubishi",
      "Xuất xứ": "Nhật Bản",
    },
    inStock: true,
    featured: true,
    bestseller: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Contactor LC1D25 Schneider",
    slug: "contactor-lc1d25-schneider",
    price: 850000,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=800&fit=crop",
    ],
    categoryId: "1",
    category: "Phụ kiện tủ điện",
    description: "Contactor LC1D25 Schneider 25A chính hãng",
    specifications: {
      "Dòng điện định mức": "25A",
      "Điện áp cuộn coil": "220V AC",
      "Số tiếp điểm": "3NO + 1NC",
      "Thương hiệu": "Schneider Electric",
      "Xuất xứ": "Pháp",
    },
    inStock: true,
    featured: true,
    bestseller: false,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Relay nhiệt LRD21 Schneider",
    slug: "relay-nhiet-lrd21-schneider",
    price: 420000,
    originalPrice: 480000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [],
    categoryId: "1",
    category: "Phụ kiện tủ điện",
    description: "Relay nhiệt LRD21 Schneider 12-18A",
    specifications: {
      "Dải dòng điện": "12-18A",
      "Loại": "Relay nhiệt",
      "Thương hiệu": "Schneider Electric",
    },
    inStock: true,
    featured: false,
    bestseller: true,
    createdAt: "2024-02-01",
  },
  // Nguồn dự phòng
  {
    id: "4",
    name: "UPS Santak 1000VA Online",
    slug: "ups-santak-1000va-online",
    price: 4500000,
    originalPrice: 5200000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop",
    images: [],
    categoryId: "2",
    category: "Nguồn dự phòng",
    description: "Bộ lưu điện UPS Santak 1000VA Online sóng sin chuẩn",
    specifications: {
      "Công suất": "1000VA / 800W",
      "Loại": "Online",
      "Thời gian lưu điện": "15-30 phút",
      "Đầu vào": "176-288V AC",
      "Đầu ra": "220V ± 1%",
    },
    inStock: true,
    featured: true,
    bestseller: true,
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    name: "UPS APC BR1500GI 1500VA",
    slug: "ups-apc-br1500gi-1500va",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    images: [],
    categoryId: "2",
    category: "Nguồn dự phòng",
    description: "UPS APC Back-UPS Pro 1500VA LCD chính hãng",
    specifications: {
      "Công suất": "1500VA / 865W",
      "Loại": "Line Interactive",
      "Cổng kết nối": "USB, Serial",
      "Thương hiệu": "APC by Schneider",
    },
    inStock: true,
    featured: true,
    bestseller: false,
    createdAt: "2024-02-05",
  },
  // Tủ điện hạ thế
  {
    id: "6",
    name: "Tủ điện DB 12 đường Schneider",
    slug: "tu-dien-db-12-duong-schneider",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=400&fit=crop",
    images: [],
    categoryId: "3",
    category: "Tủ điện hạ thế",
    description: "Tủ điện DB 12 đường Schneider chính hãng",
    specifications: {
      "Số đường": "12 đường",
      "Vật liệu": "Kim loại sơn tĩnh điện",
      "Tiêu chuẩn": "IEC 61439",
      "Thương hiệu": "Schneider Electric",
    },
    inStock: true,
    featured: true,
    bestseller: true,
    createdAt: "2024-01-25",
  },
  {
    id: "7",
    name: "Tủ điện công nghiệp 800x600x250",
    slug: "tu-dien-cong-nghiep-800x600x250",
    price: 3200000,
    originalPrice: 3600000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=400&fit=crop",
    images: [],
    categoryId: "3",
    category: "Tủ điện hạ thế",
    description: "Tủ điện công nghiệp kích thước 800x600x250mm",
    specifications: {
      "Kích thước": "800x600x250mm",
      "Vật liệu": "Thép CT3 dày 1.5mm",
      "Sơn": "Sơn tĩnh điện RAL7035",
      "Cấp bảo vệ": "IP55",
    },
    inStock: true,
    featured: false,
    bestseller: true,
    createdAt: "2024-02-10",
  },
  // Sản phẩm khác
  {
    id: "8",
    name: "Đồng hồ đo điện 3 pha Selec",
    slug: "dong-ho-do-dien-3-pha-selec",
    price: 1650000,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop",
    images: [],
    categoryId: "4",
    category: "Sản phẩm khác",
    description: "Đồng hồ đo điện đa năng 3 pha Selec MFM384",
    specifications: {
      "Loại": "Đồng hồ đa năng",
      "Hiển thị": "LCD",
      "Đo lường": "V, A, kW, kWh, PF, Hz",
      "Thương hiệu": "Selec",
    },
    inStock: true,
    featured: true,
    bestseller: false,
    createdAt: "2024-02-15",
  },
];

export const newsPosts: NewsPost[] = [
  {
    id: "1",
    title: "Hướng dẫn chọn UPS phù hợp cho doanh nghiệp",
    slug: "huong-dan-chon-ups-phu-hop-cho-doanh-nghiep",
    excerpt: "Tìm hiểu cách chọn bộ lưu điện UPS phù hợp với nhu cầu sử dụng của doanh nghiệp bạn...",
    content: "Nội dung chi tiết về cách chọn UPS...",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    author: "Admin",
    createdAt: "2024-02-20",
    category: "Hướng dẫn",
  },
  {
    id: "2",
    title: "Ưu đãi lớn tháng 3/2024 - Giảm đến 20%",
    slug: "uu-dai-lon-thang-3-2024-giam-den-20",
    excerpt: "Chương trình khuyến mãi đặc biệt tháng 3/2024, giảm giá đến 20% cho tất cả sản phẩm...",
    content: "Chi tiết chương trình khuyến mãi...",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop",
    author: "Admin",
    createdAt: "2024-02-18",
    category: "Khuyến mãi",
  },
  {
    id: "3",
    title: "Bảo trì hệ thống điện công nghiệp đúng cách",
    slug: "bao-tri-he-thong-dien-cong-nghiep-dung-cach",
    excerpt: "Những lưu ý quan trọng khi bảo trì hệ thống điện công nghiệp để đảm bảo an toàn...",
    content: "Nội dung về bảo trì hệ thống điện...",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
    author: "Kỹ thuật",
    createdAt: "2024-02-15",
    category: "Tin tức",
  },
];

export const companyStats = [
  { label: "Khách hàng tin dùng", value: "1000+", icon: "users" },
  { label: "Sản phẩm chất lượng", value: "500+", icon: "package" },
  { label: "Dự án hoàn thành", value: "200+", icon: "briefcase" },
  { label: "Năm kinh nghiệm", value: "10+", icon: "award" },
];

export const whyChooseUs = [
  {
    id: "1",
    title: "Tiết kiệm chi phí",
    description: "Cam kết giá cạnh tranh nhất thị trường với nhiều chương trình ưu đãi hấp dẫn",
    icon: "piggy-bank",
  },
  {
    id: "2",
    title: "Công nghệ cao",
    description: "Sản phẩm được nhập khẩu từ các thương hiệu hàng đầu thế giới",
    icon: "cpu",
  },
  {
    id: "3",
    title: "Đối tác tin cậy",
    description: "Là đối tác chính thức của Schneider, Mitsubishi, ABB, Siemens...",
    icon: "handshake",
  },
  {
    id: "4",
    title: "Hàng chính hãng",
    description: "100% sản phẩm chính hãng, có đầy đủ CO, CQ và chứng nhận chất lượng",
    icon: "shield-check",
  },
  {
    id: "5",
    title: "Đội ngũ chuyên nghiệp",
    description: "Đội ngũ kỹ sư giàu kinh nghiệm, hỗ trợ tư vấn 24/7",
    icon: "users-cog",
  },
];

export const companyInfo = {
  name: "CƠ ĐIỆN TRƯỜNG PHÁT",
  fullName: "CÔNG TY TNHH CƠ ĐIỆN TRƯỜNG PHÁT",
  address: "123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh",
  phone: "0909 123 456",
  hotline: "1800 1234",
  email: "info@codientruongphat.com",
  website: "www.codientruongphat.com",
  workingHours: "Thứ 2 - Thứ 7: 8:00 - 17:30",
  taxCode: "0123456789",
  zaloLink: "https://zalo.me/0909123456",
  facebookLink: "https://facebook.com/codientruongphat",
  youtubeLink: "https://youtube.com/codientruongphat",
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const getDiscountPercent = (price: number, originalPrice?: number): number | null => {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
