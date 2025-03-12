"use client"

import { useState } from "react"

interface CommentFormProps {
  onAddComment: (content: string) => void
}

export const CommentForm = ({ onAddComment }: CommentFormProps) => {
  const [commentText, setCommentText] = useState("")

  const handleSubmit = () => {
    if (commentText.trim().length === 0) return
    onAddComment(commentText)
    setCommentText("")
  }

  return (
    <div className="flex space-x-2">
      <textarea
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-400 bg-background"
      />
      <button
        onClick={handleSubmit}
        disabled={commentText.trim().length === 0}
        className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        Post
      </button>
    </div>
  )
}

