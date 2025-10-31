import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UNILAG Conference 2025",
  description: "UNILAG Conference 2025 - App",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#00A651",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "UNILAG Conf",
  },
  formatDetection: {
    telephone: false,
  },
}

import { Providers } from "@/components/providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.jpg" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UNILAG Conf" />
        <meta name="theme-color" content="#00A651" />
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
          {/* Service worker registration script */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js').then((reg) => {
                    console.log('[v0] SW registered:', reg)
                  }).catch((err) => {
                    console.log('[v0] SW registration failed:', err)
                  })
                }
              `,
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
