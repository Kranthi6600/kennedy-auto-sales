import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.SAAS_API_BASE || "https://wehoware-saas.vercel.app";
const CLIENT_ID = process.env.SAAS_CLIENT_ID || "035053d7-da03-4a53-ae55-1797306cd7ad";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `${API_BASE}/api/public/blogs/${slug}/like?clientId=${CLIENT_ID}`,
      { method: "POST" }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Failed to like blog" }, { status: 502 });
  }
}
