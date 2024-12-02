import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import FloatingButton from '@/components/FloatingButton'
import Script from 'next/script'

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
      <head>
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
          strategy="beforeInteractive"
        />
        <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <FloatingButton />
      </body>
    </html>
  )
}

