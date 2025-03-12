import type React from "react"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import "./globals.css"

export const metadata = {
  title: "Anonymous Dark Secrets",
  description: "Share your darkest secrets anonymously without judgment",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'