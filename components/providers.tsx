'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { Toaster as Sonner } from 'sonner'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3000,
            refetchInterval: 3000,
            refetchOnWindowFocus: true,
            retry: 2,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Sonner 
        richColors 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </QueryClientProvider>
  )
}
