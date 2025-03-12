"use client"

import { formatDistanceToNow } from "date-fns"
import { MoreVertical } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Secret } from "@/lib/types"

interface SecretHeaderProps {
  secret: Secret
  onReport: () => void
}

export const SecretHeader = ({ secret, onReport }: SecretHeaderProps) => {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>👤</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{secret.username || "Anonymous"}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(secret.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="More options">
            <MoreVertical className="h-5 w-5" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[200px] bg-white dark:bg-gray-800 rounded-md shadow-lg p-1 z-50"
            sideOffset={5}
          >
            <DropdownMenu.Item
              className="flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
              onSelect={onReport}
            >
              Report
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

