import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { freeFireRegistrationSchema } from "@/lib/validations";
import { ZodError } from "zod";

// Force dynamic rendering
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    try {
      freeFireRegistrationSchema.parse(body);
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

    // Register team in Supabase
    const result = await db.registerTeam({
      game: 'freefire',
      team_name: body.teamName,
      leader_name: body.leaderName,
      leader_whatsapp: body.leaderWhatsApp,
      leader_game_id: body.leaderUID,
      player2_name: body.player2.name,
      player2_game_id: body.player2.gameId,
      player3_name: body.player3.name,
      player3_game_id: body.player3.gameId,
      player4_name: body.player4.name,
      player4_game_id: body.player4.gameId,
      payment_screenshot: body.paymentScreenshot,
      transaction_id: body.transactionId,
      live_stream_vote: body.liveStreamVote,
      agreed_to_terms: body.agreedToTerms,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message:
          "🔥 Team registered successfully! Room ID will be shared on WhatsApp.",
        teamId: result.data?.id,
      });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to save team" },
        { status: 400 }
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
