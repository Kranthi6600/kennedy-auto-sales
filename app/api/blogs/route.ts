import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://wehoware-saas.vercel.app";
const CLIENT_ID = "035053d7-da03-4a53-ae55-1797306cd7ad";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sp = new URLSearchParams({ clientId: CLIENT_ID });

  const passThrough = ["page", "limit", "search", "category", "featured", "sortBy", "sortOrder"];
  for (const key of passThrough) {
    const val = searchParams.get(key);
    if (val !== null) sp.set(key, val);
  }

  try {
    const res = await fetch(`${API_BASE}/api/public/blogs?${sp.toString()}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 502 });
  }
}
