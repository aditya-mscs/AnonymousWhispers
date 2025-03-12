"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AdBannerProps {
  position: "top" | "bottom" | "inline"
  format?: "banner" | "square" | "skyscraper"
}

export function AdBanner({ position, format = "banner" }: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  // Determine dimensions based on format
  let height: string
  let width: string

  switch (format) {
    case "square":
      height = "250px"
      width = "250px"
      break
    case "skyscraper":
      height = "600px"
      width = "120px"
      break
    case "banner":
    default:
      height = "90px"
      width = "100%"
      break
  }

  return (
    <div
      className={`relative bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden
        ${position === "top" ? "mb-6" : ""} 
        ${position === "bottom" ? "mt-6" : ""}`}
      style={{ height, width }}
    >
      <button
        className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 z-10"
        onClick={() => setIsVisible(false)}
        aria-label="Close advertisement"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex flex-col justify-center items-center h-full w-full p-4">
        <p className="text-sm font-bold mb-2">Advertisement</p>
        <div className="flex-1 w-full relative">
          {/* Placeholder for actual ad content */}
          <img
            src="/placeholder.svg?height=250&width=970"
            alt="Advertisement"
            className="object-cover w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                const fallback = document.createElement("div")
                fallback.className =
                  "flex h-full w-full justify-center items-center bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                fallback.innerText = "Ad Space Available"
                parent.appendChild(fallback)
              }
            }}
          />
        </div>
        <a
          href="mailto:ads@anonymoussecrets.com"
          className="text-xs text-gray-500 dark:text-gray-400 mt-1 hover:underline"
        >
          Advertise with us
        </a>
      </div>
    </div>
  )
}

