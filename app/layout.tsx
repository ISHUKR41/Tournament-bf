import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/providers'

export const metadata: Metadata = {
  title: 'Tournament Registration - PUBG Mobile & Free Fire',
  description: 'Official tournament registration platform for PUBG Mobile and Free Fire Squad tournaments',
  keywords: 'PUBG Mobile, Free Fire, Tournament, Gaming, Esports, Registration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
