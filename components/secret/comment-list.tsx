import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Comment } from "@/lib/types"

interface CommentListProps {
  comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  if (comments.length === 0) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">No comments yet. Be the first to comment!</p>
    )
  }

  return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div key={comment.id} className="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
          <div className="flex gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>👤</AvatarFallback>
            </Avatar>
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
  )
}

