import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import FloatingButton from '@/components/FloatingButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pet Diary',
  description: 'A diary for your beloved pets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <FloatingButton />
      </body>
    </html>
  )
}

