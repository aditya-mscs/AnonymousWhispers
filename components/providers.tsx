"use client"

import type React from "react"

import { ThemeProvider } from "./theme-provider"
import { ToastProvider } from "./ui/toast-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}

