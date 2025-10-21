import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/supabase";

// Force dynamic rendering for admin routes
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  // This route should only be called by authenticated admin
  // Authentication check happens in the frontend
  
  try {
    const teams = await db.getTeams('freefire');

    // Convert to old format for compatibility
    const formattedTeams = teams.map(team => ({
      id: team.id,
      teamName: team.team_name,
      leaderName: team.leader_name,
      leaderWhatsApp: team.leader_whatsapp,
      leaderUID: team.leader_game_id,
      player2: { name: team.player2_name, gameId: team.player2_game_id },
      player3: { name: team.player3_name, gameId: team.player3_game_id },
      player4: { name: team.player4_name, gameId: team.player4_game_id },
      paymentScreenshot: team.payment_screenshot,
      transactionId: team.transaction_id,
      liveStreamVote: team.live_stream_vote,
      agreedToTerms: team.agreed_to_terms,
      registeredAt: team.registered_at,
    }));

    return NextResponse.json(formattedTeams);
  } catch (error) {
    console.error("Error fetching Free Fire teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}