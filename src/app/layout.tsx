import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'EnrolmentDesk — Admissions, organised.',
  description:
    'The admissions and enquiry management platform for independent tuition centres. Manage enquiries, schedule demo classes, track follow-ups and convert more admissions.',
  keywords: [
    'tuition centre software',
    'admissions management',
    'student enquiry tracking',
    'coaching institute CRM',
    'demo class scheduling',
    'education management India',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white dark:bg-[#070b14] text-surface-900 dark:text-surface-100 min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
