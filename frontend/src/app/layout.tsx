
import LayoutHeader from '@/components/layout/LayoutHeader'
import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'

const rubik = Rubik({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-rubik',
})

export const metadata: Metadata = {
  title: 'KulturKonnect',
  description: 'Unlock Munich. One culture at a time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans bg-minga-mint text-minga-blue min-h-screen flex flex-col`}>
        
        {/* TOP HEADER */}

        <LayoutHeader />
        
      

        {/* Main Content Area */}
        <div className="flex-1 relative z-0"> 
          {children}
        </div>

      </body>
    </html>
  )
}