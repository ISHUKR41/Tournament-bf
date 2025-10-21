import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const stats = await db.getStats()
    
    if (!stats) {
      // Fallback to default stats if database not configured
      return NextResponse.json({
        pubgTeams: 0,
        freeFireTeams: 0,
        pubgSlots: 25,
        freeFireSlots: 12,
      })
    }

    return NextResponse.json({
      pubgTeams: stats.pubg_teams,
      freeFireTeams: stats.freefire_teams,
      pubgSlots: stats.pubg_slots,
      freeFireSlots: stats.freefire_slots,
    })
  } catch (error) {
    console.error('Stats API error:', error)
    // Return default stats on error
    return NextResponse.json({
      pubgTeams: 0,
      freeFireTeams: 0,
      pubgSlots: 25,
      freeFireSlots: 12,
    })
  }
}
