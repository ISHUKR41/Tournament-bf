import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../../lib/auth";
import { getFreeFireTeams } from "../../../../lib/database";

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.cookies.get("admin-token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teams = getFreeFireTeams();
    return NextResponse.json(teams);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}
