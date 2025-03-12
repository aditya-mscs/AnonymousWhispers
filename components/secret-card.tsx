"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share, MoreVertical } from "lucide-react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import * as Avatar from "@radix-ui/react-avatar"
import type { Secret, Comment } from "@/lib/types"
import { getUsernameFromStorage } from "@/lib/username-generator"

interface SecretCardProps {
  secret: Secret
}

export function SecretCard({ secret }: SecretCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(secret.likes || 0)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>(secret.comments || [])
  const [toast, setToast] = useState<{
    title: string
    description: string
    status: "success" | "error" | "info"
  } | null>(null)

  const showToast = (title: string, description: string, status: "success" | "error" | "info") => {
    setToast({ title, description, status })
    setTimeout(() => setToast(null), 3000)
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Anonymous Dark Secret",
          text: secret.content.substring(0, 50) + "...",
          url: `${window.location.origin}/secret/${secret.id}`,
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        navigator.clipboard.writeText(`${window.location.origin}/secret/${secret.id}`)
        showToast("Link copied", "Secret link copied to clipboard", "success")
      }
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const handleAddComment = () => {
    if (commentText.trim().length === 0) return

    const username = getUsernameFromStorage()

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content: commentText,
      timestamp: Date.now(),
      username,
    }

    setComments((prev) => [newComment, ...prev])
    setCommentText("")
  }

  const getDarknessColor = (level: number) => {
    if (level <= 3) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (level <= 6) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    if (level <= 8) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-md overflow-hidden">
      <div className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center overflow-hidden rounded-full bg-purple-500">
              <Avatar.Fallback className="text-white text-sm">👤</Avatar.Fallback>
            </Avatar.Root>
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
                  onSelect={() => {
                    showToast("Report submitted", "Thank you for helping keep our community safe.", "success")
                  }}
                >
                  Report
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="px-4 py-2">
        <p className="whitespace-pre-line">{secret.content}</p>
      </div>

      <div className="px-4 pt-0 pb-4 flex flex-col">
        <hr className="my-3 border-border" />
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            <span>{likeCount}</span>
          </button>

          <button
            className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{comments.length}</span>
          </button>

          <button
            className="flex items-center text-sm hover:bg-gray-100 dark:hover:bg-gray-800 px-2 py-1 rounded"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>

          <div className="ml-auto">
            <span className={`text-xs px-2 py-1 rounded-full ${getDarknessColor(secret.darknessLevel)}`}>
              {secret.darknessLevel}/10
            </span>
          </div>
        </div>

        {showComments && (
          <div className="mt-4 w-full">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 bg-background"
                />
                <button
                  onClick={handleAddComment}
                  disabled={commentText.trim().length === 0}
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Post
                </button>
              </div>

              {comments.length > 0 ? (
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                      <div className="flex gap-2">
                        <Avatar.Root className="inline-flex h-6 w-6 select-none items-center justify-center overflow-hidden rounded-full bg-purple-500">
                          <Avatar.Fallback className="text-white text-xs">👤</Avatar.Fallback>
                        </Avatar.Root>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.username || "Anonymous"}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 max-w-md p-4 rounded-md shadow-lg ${
            toast.status === "success" ? "bg-green-500" : toast.status === "error" ? "bg-red-500" : "bg-blue-500"
          } text-white`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      )}
    </div>
  )
}

