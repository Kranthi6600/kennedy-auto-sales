import type { InventoryItem, InventoryDetailItem } from "./api";

interface CsvRow {
  [key: string]: string;
}

function parseCsv(text: string): CsvRow[] {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const row: CsvRow = {};
    headers.forEach((h, j) => {
      row[h] = (cols[j] || "").trim();
    });
    rows.push(row);
  }
  return rows;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function slugify(vin: string, stockNumber: string): string {
  const base = `${stockNumber}-${vin}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return base || vin.toLowerCase();
}

function buildTitle(row: CsvRow): string {
  if (row.TITLE && row.TITLE.trim()) return row.TITLE.trim();
  const parts = [row.YEAR, row.MAKE, row.MODEL, row.TRIM].filter(Boolean);
  return parts.join(" ").trim() || row.VIN;
}

function parsePhotos(photoStr: string): { url: string; alt: string | null }[] {
  if (!photoStr) return [];
  return photoStr
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)
    .map((url) => ({ url, alt: null }));
}

function mapRowToInventoryItem(row: CsvRow): InventoryItem {
  const vin = row.VIN || "";
  const stock = row.STOCKNUMBER || "";
  const slug = slugify(vin, stock);
  const title = buildTitle(row);
  const photos = parsePhotos(row.PHOTOS);
  const thumbnail = photos[0]?.url || null;
  const price = row.LISTPRICE ? parseFloat(row.LISTPRICE) : null;

  return {
    id: vin || stock,
    client_id: "kennedy-auto",
    category_id: null,
    title,
    slug,
    type: "vehicle",
    sku: stock || null,
    description: row.DESCRIPTION || null,
    thumbnail,
    thumbnail_alt: title,
    price: price !== null && !isNaN(price) ? price : null,
    currency: "CAD",
    price_visible: price !== null && price > 0,
    price_label: null,
    quantity: row.STATUS?.toLowerCase().includes("stock") ? 1 : 0,
    status: row.STATUS || "In Stock",
    tags: [],
    featured: false,
    attributes: {
      make: row.MAKE || undefined,
      model: row.MODEL || undefined,
      year: row.YEAR || undefined,
      mileage: row.ODOMETER || undefined,
      transmission: row.TRANSMISSIONTYPE || undefined,
      fuel_type: row.FUELTYPE || undefined,
      body_type: row.BODYSTYLE || undefined,
      exterior_color: row.EXTCOLOUR || undefined,
      interior_color: row.INTCOLOUR || undefined,
      engine_size: row.ENGINE || undefined,
      doors: row.DOORS || undefined,
      seats: undefined,
      condition: row.INVENTORYTYPE || undefined,
      drivetrain: row.DRIVETYPE || undefined,
      cylinders: row.CYLINDERS || undefined,
      odometer_type: row.ODOMETERTYPE || undefined,
      vehicle_type: row.VEHICLETYPE || undefined,
      vin: vin || undefined,
      stock_number: stock || undefined,
      trim: row.TRIM || undefined,
    },
    images: photos.length > 0 ? photos : null,
    videos: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    category: null,
  };
}

export function csvToInventoryItems(csvText: string): InventoryItem[] {
  const rows = parseCsv(csvText);
  return rows.map(mapRowToInventoryItem);
}

export function csvToInventoryDetailItem(
  csvText: string,
  slug: string
): InventoryDetailItem | null {
  const items = csvToInventoryItems(csvText);
  const item = items.find((v) => v.slug === slug);
  if (!item) return null;

  return {
    ...item,
    content: null,
    reorder_threshold: 0,
    product_schema: null,
  };
}

export function csvToInventoryListResponse(csvText: string) {
  const data = csvToInventoryItems(csvText);
  return {
    data,
    pagination: {
      totalItems: data.length,
      page: 1,
      limit: data.length,
      totalPages: 1,
    },
  };
}

export function csvToInventoryDetailResponse(csvText: string, slug: string) {
  const item = csvToInventoryDetailItem(csvText, slug);
  if (!item) return null;
  return {
    item,
    product_schema: null,
  };
}
