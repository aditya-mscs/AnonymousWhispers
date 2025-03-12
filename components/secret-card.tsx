"use client"

import { useState, useCallback } from "react"
import type { Secret, Comment } from "@/lib/types"
import { getUsernameFromStorage } from "@/lib/username-generator"
import { SecretHeader } from "@/components/secret/secret-header"
import { SecretActions } from "@/components/secret/secret-actions"
import { CommentForm } from "@/components/secret/comment-form"
import { CommentList } from "@/components/secret/comment-list"
import { useToast } from "./ui/toast-context"

interface SecretCardProps {
  secret: Secret
}

export function SecretCard({ secret }: SecretCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(secret.likes || 0)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState<Comment[]>(secret.comments || [])
  const { showToast } = useToast()

  const handleLike = useCallback(() => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }, [liked])

  const handleShare = useCallback(async () => {
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
  }, [secret.content, secret.id, showToast])

  const handleAddComment = useCallback((content: string) => {
    const username = getUsernameFromStorage()

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      timestamp: Date.now(),
      username,
    }

    setComments((prev) => [newComment, ...prev])
  }, [])

  const handleReport = useCallback(() => {
    showToast("Report submitted", "Thank you for helping keep our community safe.", "success")
  }, [showToast])

  const toggleComments = useCallback(() => {
    setShowComments((prev) => !prev)
  }, [])

  return (
    <div className="bg-card border border-border rounded-lg shadow-md overflow-hidden">
      <div className="p-4 pb-2">
        <SecretHeader secret={secret} onReport={handleReport} />
      </div>

      <div className="px-4 py-2">
        <p className="whitespace-pre-line">{secret.content}</p>
      </div>

      <div className="px-4 pt-0 pb-4 flex flex-col">
        <hr className="my-3 border-border" />

        <SecretActions
          likeCount={likeCount}
          commentCount={comments.length}
          darknessLevel={secret.darknessLevel}
          isLiked={liked}
          onLike={handleLike}
          onComment={toggleComments}
          onShare={handleShare}
        />

        {showComments && (
          <div className="mt-4 w-full">
            <div className="space-y-4">
              <CommentForm onAddComment={handleAddComment} />
              <CommentList comments={comments} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

