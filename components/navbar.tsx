"use client"

import { useState, useCallback, memo, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { getUsernameFromStorage, regenerateUsername } from "@/lib/username-generator"
import { cn } from "@/lib/utils"

export const Navbar = memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // Start with "Anonymous" for server-side rendering
  const [username, setUsername] = useState("Anonymous")

  // Update username after component mounts on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUsername(getUsernameFromStorage())
    }
  }, [])

  const handleRegenerateUsername = useCallback(() => {
    const newUsername = regenerateUsername()
    setUsername(newUsername)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div className="border-b border-border">
      <div className="flex h-16 items-center px-4">
        <div className="md:hidden mr-2">
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center md:justify-start">
          <Link href="/" className="font-bold text-xl">
            Anonymous Dark Secrets
          </Link>

          <nav className="hidden md:flex ml-10 space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              Home
            </Link>
            <Link href="/trending" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              Trending
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-sm">
            You are: <span className="font-bold">{username}</span>
          </span>
          <button
            onClick={handleRegenerateUsername}
            className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            New Identity
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/trending"
            className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={closeMenu}
          >
            Trending
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={closeMenu}
          >
            About
          </Link>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm">
              You are: <span className="font-bold">{username}</span>
            </span>
            <button
              onClick={handleRegenerateUsername}
              className="text-sm px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              New Identity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

