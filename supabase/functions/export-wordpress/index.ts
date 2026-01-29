import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  content: string | null;
  price: number;
  original_price: number | null;
  sku: string | null;
  brand: string | null;
  images: string[] | null;
  created_at: string;
  updated_at: string;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: string | null;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  image: string | null;
  category: string | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

function escapeXml(text: string | null | undefined): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().replace("T", " ").replace("Z", "");
}

function generateProductXml(product: Product, categoryMap: Map<string, Category>): string {
  const category = product.category_id ? categoryMap.get(product.category_id) : null;
  const images = product.images || [];
  
  let attachmentsXml = "";
  images.forEach((img, index) => {
    attachmentsXml += `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_product_image_gallery_${index}]]></wp:meta_key>
      <wp:meta_value><![CDATA[${img}]]></wp:meta_value>
    </wp:postmeta>`;
  });

  return `
  <item>
    <title><![CDATA[${product.name}]]></title>
    <link>/${product.slug}/</link>
    <pubDate>${formatDate(product.created_at)}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">${product.id}</guid>
    <description><![CDATA[${product.description || ""}]]></description>
    <content:encoded><![CDATA[${product.content || product.description || ""}]]></content:encoded>
    <excerpt:encoded><![CDATA[${product.description || ""}]]></excerpt:encoded>
    <wp:post_id>${product.id}</wp:post_id>
    <wp:post_date>${formatDate(product.created_at)}</wp:post_date>
    <wp:post_date_gmt>${formatDate(product.created_at)}</wp:post_date_gmt>
    <wp:post_modified>${formatDate(product.updated_at)}</wp:post_modified>
    <wp:post_modified_gmt>${formatDate(product.updated_at)}</wp:post_modified_gmt>
    <wp:comment_status>closed</wp:comment_status>
    <wp:ping_status>closed</wp:ping_status>
    <wp:post_name><![CDATA[${product.slug}]]></wp:post_name>
    <wp:status>publish</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>product</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    ${category ? `<category domain="product_cat" nicename="${category.slug}"><![CDATA[${category.name}]]></category>` : ""}
    <wp:postmeta>
      <wp:meta_key><![CDATA[_regular_price]]></wp:meta_key>
      <wp:meta_value><![CDATA[${product.price}]]></wp:meta_value>
    </wp:postmeta>
    <wp:postmeta>
      <wp:meta_key><![CDATA[_price]]></wp:meta_key>
      <wp:meta_value><![CDATA[${product.price}]]></wp:meta_value>
    </wp:postmeta>
    ${product.original_price ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_sale_price]]></wp:meta_key>
      <wp:meta_value><![CDATA[${product.price}]]></wp:meta_value>
    </wp:postmeta>` : ""}
    ${product.sku ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_sku]]></wp:meta_key>
      <wp:meta_value><![CDATA[${product.sku}]]></wp:meta_value>
    </wp:postmeta>` : ""}
    ${product.brand ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_brand]]></wp:meta_key>
      <wp:meta_value><![CDATA[${product.brand}]]></wp:meta_value>
    </wp:postmeta>` : ""}
    ${images[0] ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>
      <wp:meta_value><![CDATA[${images[0]}]]></wp:meta_value>
    </wp:postmeta>` : ""}
    ${attachmentsXml}
  </item>`;
}

function generateCategoryXml(category: Category, parentSlug: string | null): string {
  return `
  <wp:term>
    <wp:term_id>${category.id}</wp:term_id>
    <wp:term_taxonomy>product_cat</wp:term_taxonomy>
    <wp:term_slug><![CDATA[${category.slug}]]></wp:term_slug>
    <wp:term_parent><![CDATA[${parentSlug || ""}]]></wp:term_parent>
    <wp:term_name><![CDATA[${category.name}]]></wp:term_name>
    <wp:term_description><![CDATA[${category.description || ""}]]></wp:term_description>
  </wp:term>`;
}

function generatePageXml(page: Page): string {
  return `
  <item>
    <title><![CDATA[${page.title}]]></title>
    <link>/${page.slug}/</link>
    <pubDate>${formatDate(page.created_at)}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">${page.id}</guid>
    <description></description>
    <content:encoded><![CDATA[${page.content || ""}]]></content:encoded>
    <excerpt:encoded><![CDATA[]]></excerpt:encoded>
    <wp:post_id>${page.id}</wp:post_id>
    <wp:post_date>${formatDate(page.created_at)}</wp:post_date>
    <wp:post_date_gmt>${formatDate(page.created_at)}</wp:post_date_gmt>
    <wp:post_modified>${formatDate(page.updated_at)}</wp:post_modified>
    <wp:post_modified_gmt>${formatDate(page.updated_at)}</wp:post_modified_gmt>
    <wp:comment_status>closed</wp:comment_status>
    <wp:ping_status>closed</wp:ping_status>
    <wp:post_name><![CDATA[${page.slug}]]></wp:post_name>
    <wp:status>publish</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>page</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    ${page.meta_title ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_yoast_wpseo_title]]></wp:meta_key>
      <wp:meta_value><![CDATA[${page.meta_title}]]></wp:meta_value>
    </wp:postmeta>` : ""}
    ${page.meta_description ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_yoast_wpseo_metadesc]]></wp:meta_key>
      <wp:meta_value><![CDATA[${page.meta_description}]]></wp:meta_value>
    </wp:postmeta>` : ""}
  </item>`;
}

function generatePostXml(post: Post): string {
  return `
  <item>
    <title><![CDATA[${post.title}]]></title>
    <link>/${post.slug}/</link>
    <pubDate>${formatDate(post.published_at || post.created_at)}</pubDate>
    <dc:creator><![CDATA[admin]]></dc:creator>
    <guid isPermaLink="false">${post.id}</guid>
    <description><![CDATA[${post.excerpt || ""}]]></description>
    <content:encoded><![CDATA[${post.content || ""}]]></content:encoded>
    <excerpt:encoded><![CDATA[${post.excerpt || ""}]]></excerpt:encoded>
    <wp:post_id>${post.id}</wp:post_id>
    <wp:post_date>${formatDate(post.created_at)}</wp:post_date>
    <wp:post_date_gmt>${formatDate(post.created_at)}</wp:post_date_gmt>
    <wp:post_modified>${formatDate(post.updated_at)}</wp:post_modified>
    <wp:post_modified_gmt>${formatDate(post.updated_at)}</wp:post_modified_gmt>
    <wp:comment_status>open</wp:comment_status>
    <wp:ping_status>open</wp:ping_status>
    <wp:post_name><![CDATA[${post.slug}]]></wp:post_name>
    <wp:status>publish</wp:status>
    <wp:post_parent>0</wp:post_parent>
    <wp:menu_order>0</wp:menu_order>
    <wp:post_type>post</wp:post_type>
    <wp:post_password></wp:post_password>
    <wp:is_sticky>0</wp:is_sticky>
    ${post.category ? `<category domain="category" nicename="${post.category.toLowerCase().replace(/\s+/g, "-")}"><![CDATA[${post.category}]]></category>` : ""}
    ${post.image ? `
    <wp:postmeta>
      <wp:meta_key><![CDATA[_thumbnail_id]]></wp:meta_key>
      <wp:meta_value><![CDATA[${post.image}]]></wp:meta_value>
    </wp:postmeta>` : ""}
  </item>`;
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Starting WordPress XML export...");

    // Fetch all data in parallel
    const [productsResult, categoriesResult, pagesResult, postsResult] = await Promise.all([
      supabase.from("products").select("*").eq("is_active", true),
      supabase.from("categories").select("*").eq("is_active", true),
      supabase.from("pages").select("*").eq("is_active", true),
      supabase.from("posts").select("*").eq("is_published", true),
    ]);

    const products: Product[] = productsResult.data || [];
    const categories: Category[] = categoriesResult.data || [];
    const pages: Page[] = pagesResult.data || [];
    const posts: Post[] = postsResult.data || [];

    console.log(`Found: ${products.length} products, ${categories.length} categories, ${pages.length} pages, ${posts.length} posts`);

    // Create category map for product lookups
    const categoryMap = new Map<string, Category>();
    categories.forEach((cat) => categoryMap.set(cat.id, cat));

    // Create parent slug map for categories
    const parentSlugMap = new Map<string, string>();
    categories.forEach((cat) => {
      if (cat.parent_id && categoryMap.has(cat.parent_id)) {
        parentSlugMap.set(cat.id, categoryMap.get(cat.parent_id)!.slug);
      }
    });

    // Generate XML
    const now = new Date().toISOString();
    const siteName = "Cơ Điện Trường Phát";
    const siteUrl = "https://codientruongphat.com";

    let categoriesXml = "";
    categories.forEach((category) => {
      categoriesXml += generateCategoryXml(category, parentSlugMap.get(category.id) || null);
    });

    let itemsXml = "";
    
    // Add products
    products.forEach((product) => {
      itemsXml += generateProductXml(product, categoryMap);
    });

    // Add pages
    pages.forEach((page) => {
      itemsXml += generatePageXml(page);
    });

    // Add posts
    posts.forEach((post) => {
      itemsXml += generatePostXml(post);
    });

    const wxrXml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- This is a WordPress eXtended RSS file generated by Lovable -->
<!-- https://wordpress.org/support/article/tools-export-screen/ -->
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/"
>

<channel>
  <title>${escapeXml(siteName)}</title>
  <link>${siteUrl}</link>
  <description>Thiết bị điện công nghiệp</description>
  <pubDate>${now}</pubDate>
  <language>vi</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${siteUrl}</wp:base_site_url>
  <wp:base_blog_url>${siteUrl}</wp:base_blog_url>

  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login><![CDATA[admin]]></wp:author_login>
    <wp:author_email><![CDATA[admin@example.com]]></wp:author_email>
    <wp:author_display_name><![CDATA[Admin]]></wp:author_display_name>
    <wp:author_first_name><![CDATA[]]></wp:author_first_name>
    <wp:author_last_name><![CDATA[]]></wp:author_last_name>
  </wp:author>

  ${categoriesXml}

  <generator>https://lovable.dev</generator>

  ${itemsXml}

</channel>
</rss>`;

    console.log("WordPress XML export completed successfully");

    return new Response(wxrXml, {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/xml; charset=utf-8",
        "Content-Disposition": `attachment; filename="wordpress-export-${new Date().toISOString().split("T")[0]}.xml"`,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Export error:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
