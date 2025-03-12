"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useCallback, memo, useState, useEffect } from "react"

export const ThemeToggle = memo(function ThemeToggle() {
  // Start with a null state to avoid rendering any icon during SSR
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
})

