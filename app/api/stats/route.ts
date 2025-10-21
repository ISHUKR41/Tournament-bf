import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const stats = await db.getStats()
    
    if (!stats) {
      return NextResponse.json(
        { error: 'Unable to fetch stats' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      pubgTeams: stats.pubg_teams,
      freeFireTeams: stats.freefire_teams,
      pubgSlots: stats.pubg_slots,
      freeFireSlots: stats.freefire_slots,
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
