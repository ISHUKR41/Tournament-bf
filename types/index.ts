export interface TeamMember {
  name: string
  gameId: string
}

export interface PUBGTeam {
  id: string
  teamName: string
  leaderName: string
  leaderWhatsApp: string
  leaderPUBGId: string
  player2: TeamMember
  player3: TeamMember
  player4: TeamMember
  paymentScreenshot: string
  transactionId: string
  liveStreamVote: 'yes' | 'no'
  agreedToTerms: boolean
  registeredAt: string
}

export interface FreeFireTeam {
  id: string
  teamName: string
  leaderName: string
  leaderWhatsApp: string
  leaderUID: string
  player2: TeamMember
  player3: TeamMember
  player4: TeamMember
  paymentScreenshot: string
  transactionId: string
  liveStreamVote: 'yes' | 'no'
  agreedToTerms: boolean
  registeredAt: string
}

export interface DatabaseStats {
  pubgTeams: number
  freeFireTeams: number
  pubgSlots: number
  freeFireSlots: number
}
