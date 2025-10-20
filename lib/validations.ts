import { z } from 'zod'

// Team Member Schema
export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  gameId: z.string().min(1, 'Game ID is required').max(50, 'Game ID too long'),
})

// PUBG Team Member Schema (9-10 digits)
export const pubgTeamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  gameId: z.string()
    .min(9, 'PUBG ID must be 9 or 10 digits')
    .max(10, 'PUBG ID must be 9 or 10 digits')
    .regex(/^[0-9]+$/, 'PUBG ID must contain only numbers'),
})

// Free Fire Team Member Schema (8-12 digits)
export const freeFireTeamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name too long'),
  gameId: z.string()
    .min(8, 'Free Fire UID must be 8 to 12 digits')
    .max(12, 'Free Fire UID must be 8 to 12 digits')
    .regex(/^[0-9]+$/, 'Free Fire UID must contain only numbers'),
})

// PUBG Registration Schema
export const pubgRegistrationSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters').max(50, 'Team name too long'),
  leaderName: z.string().min(2, 'Leader name is required').max(50, 'Name too long'),
  leaderWhatsApp: z.string()
    .min(10, 'WhatsApp number must be 10 digits')
    .max(10, 'WhatsApp number must be 10 digits')
    .regex(/^[0-9]+$/, 'Only numbers allowed'),
  leaderPUBGId: z.string()
    .min(9, 'PUBG ID must be 9 or 10 digits')
    .max(10, 'PUBG ID must be 9 or 10 digits')
    .regex(/^[0-9]+$/, 'PUBG ID must contain only numbers'),
  player2: pubgTeamMemberSchema,
  player3: pubgTeamMemberSchema,
  player4: pubgTeamMemberSchema,
  paymentScreenshot: z.string().min(1, 'Payment screenshot is required'),
  transactionId: z.string().min(5, 'Transaction ID is required').max(100, 'Transaction ID too long'),
  liveStreamVote: z.enum(['yes', 'no']),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to terms and conditions',
  }),
})

// Free Fire Registration Schema
export const freeFireRegistrationSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters').max(50, 'Team name too long'),
  leaderName: z.string().min(2, 'Leader name is required').max(50, 'Name too long'),
  leaderWhatsApp: z.string()
    .min(10, 'WhatsApp number must be 10 digits')
    .max(10, 'WhatsApp number must be 10 digits')
    .regex(/^[0-9]+$/, 'Only numbers allowed'),
  leaderUID: z.string()
    .min(8, 'Free Fire UID must be 8 to 12 digits')
    .max(12, 'Free Fire UID must be 8 to 12 digits')
    .regex(/^[0-9]+$/, 'Free Fire UID must contain only numbers'),
  player2: freeFireTeamMemberSchema,
  player3: freeFireTeamMemberSchema,
  player4: freeFireTeamMemberSchema,
  paymentScreenshot: z.string().min(1, 'Payment screenshot is required'),
  transactionId: z.string().min(5, 'Transaction ID is required').max(100, 'Transaction ID too long'),
  liveStreamVote: z.enum(['yes', 'no']),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to terms and conditions',
  }),
})

// Admin Login Schema
export const adminLoginSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Types
export type PUBGRegistrationInput = z.infer<typeof pubgRegistrationSchema>
export type FreeFireRegistrationInput = z.infer<typeof freeFireRegistrationSchema>
export type AdminLoginInput = z.infer<typeof adminLoginSchema>
