import { NextRequest, NextResponse } from "next/server";
import { searchAll } from "@/lib/db";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchAll(q);
  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" },
  });
}
