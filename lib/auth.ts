import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'tournament-registration-secure-jwt-key-2024'
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10) // Change this password!

export interface AdminUser {
  username: string
  role: 'admin'
}

export async function verifyAdmin(username: string, password: string): Promise<boolean> {
  if (username !== ADMIN_USERNAME) return false
  return bcrypt.compare(password, ADMIN_PASSWORD_HASH)
}

export function generateToken(user: AdminUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser
  } catch {
    return null
  }
}
