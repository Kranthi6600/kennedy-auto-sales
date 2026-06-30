import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.SAAS_API_BASE!;
const CLIENT_ID = process.env.SAAS_CLIENT_ID!;

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
