"use client"

import { Heart, MessageCircle, Share } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SecretActionsProps {
  likeCount: number
  commentCount: number
  darknessLevel: number
  isLiked: boolean
  onLike: () => void
  onComment: () => void
  onShare: () => void
}

export const SecretActions = ({
  likeCount,
  commentCount,
  darknessLevel,
  isLiked,
  onLike,
  onComment,
  onShare,
}: SecretActionsProps) => {
  const getDarknessVariant = (level: number) => {
    if (level <= 3) return "blue"
    if (level <= 6) return "yellow"
    if (level <= 8) return "orange"
    return "red"
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
        onClick={onLike}
      >
        <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        <span>{likeCount}</span>
      </button>

      <button
        className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
        onClick={onComment}
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        <span>{commentCount}</span>
      </button>

      <button
        className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
        onClick={onShare}
      >
        <Share className="h-4 w-4 mr-1" />
        <span>Share</span>
      </button>

      <div className="ml-auto">
        <Badge variant={getDarknessVariant(darknessLevel)}>{darknessLevel}/10</Badge>
      </div>
    </div>
  )
}

