const API_BASE = "/api";

export interface InventoryItem {
  id: string;
  client_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  type: string;
  sku: string | null;
  description: string | null;
  thumbnail: string | null;
  thumbnail_alt: string | null;
  price: number | null;
  currency: string;
  price_visible: boolean;
  price_label: string | null;
  quantity: number;
  status: string;
  tags: string[];
  featured: boolean;
  attributes: {
    make?: string;
    model?: string;
    year?: string;
    mileage?: string;
    transmission?: string;
    fuel_type?: string;
    body_type?: string;
    exterior_color?: string;
    interior_color?: string;
    engine_size?: string;
    doors?: string;
    seats?: string;
    condition?: string;
    drivetrain?: string;
    [key: string]: string | undefined;
  } | null;
  images: { url: string; alt: string | null }[] | null;
  videos: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  views: number;
  created_at: string;
  updated_at: string;
  category: { id: string; name: string; slug: string } | null;
}

export interface InventoryDetailItem extends InventoryItem {
  content: string | null;
  reorder_threshold: number;
  product_schema: object | null;
}

export interface Pagination {
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InventoryListResponse {
  data: InventoryItem[];
  pagination: Pagination;
}

export interface InventoryDetailResponse {
  item: InventoryDetailItem;
  product_schema: object | null;
}

export async function fetchInventory(params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: string;
}): Promise<InventoryListResponse> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.search) sp.set("search", params.search);
  if (params?.type) sp.set("type", params.type);
  if (params?.featured !== undefined) sp.set("featured", String(params.featured));
  if (params?.sortBy) sp.set("sortBy", params.sortBy);
  if (params?.sortOrder) sp.set("sortOrder", params.sortOrder);

  const res = await fetch(`${API_BASE}/inventory?${sp.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Inventory API error: ${res.status}`);
  return res.json();
}

export async function fetchInventoryBySlug(slug: string): Promise<InventoryDetailResponse> {
  const res = await fetch(
    `${API_BASE}/inventory/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`Inventory item API error: ${res.status}`);
  return res.json();
}

// ─── SERVICES ───────────────────────────────────────────────

export interface ServiceItem {
  id: string;
  client_id: string;
  category_id: string | null;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  thumbnail: string | null;
  thumbnail_alt: string | null;
  fee: number | null;
  fee_currency: string | null;
  fee_label: string | null;
  service_code: string | null;
  duration: string | null;
  tags: string[] | null;
  active: boolean;
  featured: boolean;
  rating: number;
  reviews_count: number;
  views: number;
  created_at: string;
  updated_at: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  open_graph_title: string | null;
  open_graph_description: string | null;
  open_graph_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  canonical_url: string | null;
  robots_meta: string | null;
  schema_type: string | null;
  seo_score: number | null;
  target_keywords: string | null;
  cta_heading: string | null;
  cta_body: string | null;
  cta_button_text: string | null;
  cta_button_url: string | null;
  allow_social_share: boolean;
  wehoware_service_categories: { id: string; name: string; slug: string } | null;
}

export interface ServiceDetailItem extends ServiceItem {
  related_blogs: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    excerpt: string | null;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
    display_order: number;
  }[];
  faq_schema: object | null;
}

export interface ServiceListResponse {
  data: ServiceItem[];
  pagination: Pagination;
}

export interface ServiceDetailResponse {
  data: ServiceDetailItem;
}

export async function fetchServices(params?: {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: string;
}): Promise<ServiceListResponse> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.search) sp.set("search", params.search);
  if (params?.categoryId) sp.set("categoryId", params.categoryId);
  if (params?.featured !== undefined) sp.set("featured", String(params.featured));
  if (params?.sortBy) sp.set("sortBy", params.sortBy);
  if (params?.sortOrder) sp.set("sortOrder", params.sortOrder);

  const res = await fetch(`${API_BASE}/services?${sp.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Services API error: ${res.status}`);
  return res.json();
}

export async function fetchServiceBySlug(slug: string): Promise<ServiceDetailResponse> {
  const res = await fetch(
    `${API_BASE}/services/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`Service API error: ${res.status}`);
  return res.json();
}

// ─── BLOGS ──────────────────────────────────────────────────

export interface BlogItem {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail: string | null;
  thumbnail_alt: string | null;
  status: string;
  category_id: string | null;
  featured: boolean;
  read_time: number | null;
  views: number;
  likes: number;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  open_graph_title: string | null;
  open_graph_description: string | null;
  open_graph_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  canonical_url: string | null;
  robots_meta: string | null;
  schema_type: string | null;
  seo_score: number | null;
  target_keywords: string | null;
  show_toc: boolean;
  show_author_box: boolean;
  cta_heading: string | null;
  cta_body: string | null;
  cta_button_text: string | null;
  cta_button_url: string | null;
  allow_social_share: boolean;
  wehoware_blog_categories: { id: string; name: string } | null;
}

export interface BlogDetailItem extends BlogItem {
  related_services: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string | null;
    description: string | null;
    fee: number | null;
    fee_currency: string | null;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
    display_order: number;
  }[];
  faq_schema: object | null;
}

export interface BlogListResponse {
  data: BlogItem[];
  pagination: Pagination;
}

export interface BlogDetailResponse {
  data: BlogDetailItem;
}

export async function fetchBlogs(params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: string;
}): Promise<BlogListResponse> {
  const sp = new URLSearchParams();
  if (params?.page) sp.set("page", String(params.page));
  if (params?.limit) sp.set("limit", String(params.limit));
  if (params?.search) sp.set("search", params.search);
  if (params?.category) sp.set("category", params.category);
  if (params?.featured !== undefined) sp.set("featured", String(params.featured));
  if (params?.sortBy) sp.set("sortBy", params.sortBy);
  if (params?.sortOrder) sp.set("sortOrder", params.sortOrder);

  const res = await fetch(`${API_BASE}/blogs?${sp.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Blogs API error: ${res.status}`);
  return res.json();
}

export async function fetchBlogBySlug(slug: string): Promise<BlogDetailResponse> {
  const res = await fetch(
    `${API_BASE}/blogs/${slug}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`Blog API error: ${res.status}`);
  return res.json();
}
