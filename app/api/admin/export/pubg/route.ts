import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { getPUBGTeams } from "@/lib/database";
import { exportPUBGToExcel } from "@/lib/excel";

export async function GET(request: NextRequest) {
  try {
    // Verify admin token
    const token = request.cookies.get("admin-token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teams = getPUBGTeams();
    const excelBuffer = exportPUBGToExcel(teams);

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=PUBG_Teams_${
          new Date().toISOString().split("T")[0]
        }.xlsx`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  }
}
