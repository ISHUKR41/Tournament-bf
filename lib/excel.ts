import * as XLSX from 'xlsx'
import { PUBGTeam, FreeFireTeam } from '@/types'

export function exportPUBGToExcel(teams: PUBGTeam[]): ArrayBuffer {
  const worksheet = XLSX.utils.json_to_sheet(
    teams.map((team, index) => ({
      'S.No': index + 1,
      'Team Name': team.teamName,
      'Leader Name': team.leaderName,
      'Leader WhatsApp': team.leaderWhatsApp,
      'Leader PUBG ID': team.leaderPUBGId,
      'Player 2 Name': team.player2.name,
      'Player 2 ID': team.player2.gameId,
      'Player 3 Name': team.player3.name,
      'Player 3 ID': team.player3.gameId,
      'Player 4 Name': team.player4.name,
      'Player 4 ID': team.player4.gameId,
      'Transaction ID': team.transactionId,
      'Live Stream Vote': team.liveStreamVote.toUpperCase(),
      'Registered At': new Date(team.registeredAt).toLocaleString(),
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'PUBG Teams')
  
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
}

export function exportFreeFireToExcel(teams: FreeFireTeam[]): ArrayBuffer {
  const worksheet = XLSX.utils.json_to_sheet(
    teams.map((team, index) => ({
      'S.No': index + 1,
      'Team Name': team.teamName,
      'Leader Name': team.leaderName,
      'Leader WhatsApp': team.leaderWhatsApp,
      'Leader UID': team.leaderUID,
      'Player 2 Name': team.player2.name,
      'Player 2 UID': team.player2.gameId,
      'Player 3 Name': team.player3.name,
      'Player 3 UID': team.player3.gameId,
      'Player 4 Name': team.player4.name,
      'Player 4 UID': team.player4.gameId,
      'Transaction ID': team.transactionId,
      'Live Stream Vote': team.liveStreamVote.toUpperCase(),
      'Registered At': new Date(team.registeredAt).toLocaleString(),
    }))
  )

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Free Fire Teams')
  
  return XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
}
