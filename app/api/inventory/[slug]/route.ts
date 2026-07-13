import { NextRequest, NextResponse } from "next/server";
import { fetchInventoryCsv } from "../../../../lib/sftp-client";
import { csvToInventoryDetailResponse } from "../../../../lib/csv-mapper";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const csvText = await fetchInventoryCsv();
    const data = csvToInventoryDetailResponse(csvText, slug);
    if (!data) {
      return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to fetch inventory item" }, { status: 502 });
  }
}
