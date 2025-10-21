import { NextResponse } from "next/server";
import { getStats } from "../../../lib/database";
import { getCachedStats, setCachedStats } from "../../../lib/cache";

// Force dynamic rendering and disable caching for real-time updates
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // Check cache first
    const cached = getCachedStats();
    if (cached) {
      return NextResponse.json(cached, {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
    }

    // Get fresh stats
    const stats = getStats();

    // Update cache
    setCachedStats(stats);

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
