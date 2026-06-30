import { NextRequest, NextResponse } from "next/server";

const API_BASE = "https://wehoware-saas.vercel.app";
const CLIENT_ID = "035053d7-da03-4a53-ae55-1797306cd7ad";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${API_BASE}/api/public/blogs/${slug}?clientId=${CLIENT_ID}`,
      { next: { revalidate: 60 } }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 502 });
  }
}
