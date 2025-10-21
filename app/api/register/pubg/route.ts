import { NextRequest, NextResponse } from "next/server";
import { savePUBGTeam, hasAvailableSlots } from "@/lib/database";
import { PUBGTeam } from "@/types";
import { pubgRegistrationSchema } from "@/lib/validations";
import { ZodError } from "zod";
import { invalidateCache } from "@/lib/cache";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if slots are available
    if (!hasAvailableSlots("pubg")) {
      return NextResponse.json(
        { error: "All slots are filled. Registration closed." },
        { status: 400 }
      );
    }

    // Validate with Zod schema
    try {
      pubgRegistrationSchema.parse(body);
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.errors[0];
        return NextResponse.json(
          {
            error: firstError.message,
            field: firstError.path.join("."),
            details: error.errors.map((e) => ({
              field: e.path.join("."),
              message: e.message,
            })),
          },
          { status: 400 }
        );
      }
      throw error;
    }

    const team: PUBGTeam = {
      id: `PUBG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      teamName: body.teamName,
      leaderName: body.leaderName,
      leaderWhatsApp: body.leaderWhatsApp,
      leaderPUBGId: body.leaderPUBGId,
      player2: body.player2,
      player3: body.player3,
      player4: body.player4,
      paymentScreenshot: body.paymentScreenshot,
      transactionId: body.transactionId,
      liveStreamVote: body.liveStreamVote,
      agreedToTerms: body.agreedToTerms,
      registeredAt: new Date().toISOString(),
    };

    const saved = savePUBGTeam(team);

    if (saved) {
      // Invalidate cache for real-time updates
      invalidateCache();

      return NextResponse.json({
        success: true,
        message:
          "🎉 Team registered successfully! Room ID will be shared on WhatsApp.",
        teamId: team.id,
      });
    } else {
      return NextResponse.json(
        { error: "Failed to save team" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
