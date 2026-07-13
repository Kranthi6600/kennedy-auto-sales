import { NextRequest, NextResponse } from "next/server";
import { fetchInventoryCsv } from "../../../lib/sftp-client";
import { csvToInventoryListResponse, csvToInventoryItems } from "../../../lib/csv-mapper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") || "";
  const featured = searchParams.get("featured");
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const limit = searchParams.get("limit");

  try {
    const csvText = await fetchInventoryCsv();
    let items = csvToInventoryItems(csvText);

    if (type) {
      items = items.filter((v) => v.type === type);
    }
    if (featured === "true") {
      items = items.filter((v) => v.featured);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter((v) => {
        const haystack = `${v.title} ${v.attributes?.make || ""} ${v.attributes?.model || ""} ${v.attributes?.body_type || ""}`.toLowerCase();
        return haystack.includes(q);
      });
    }

    items.sort((a, b) => {
      let cmp = 0;
      if (sortBy === "price") {
        cmp = (a.price ?? 0) - (b.price ?? 0);
      } else if (sortBy === "title") {
        cmp = a.title.localeCompare(b.title);
      } else {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      return sortOrder === "asc" ? cmp : -cmp;
    });

    if (limit) {
      const n = parseInt(limit, 10);
      if (!isNaN(n)) items = items.slice(0, n);
    }

    return NextResponse.json({
      data: items,
      pagination: {
        totalItems: items.length,
        page: 1,
        limit: items.length,
        totalPages: 1,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 502 });
  }
}
