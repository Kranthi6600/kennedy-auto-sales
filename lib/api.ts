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
