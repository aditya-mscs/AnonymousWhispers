"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import { X } from "lucide-react"

type ToastType = {
  id: string
  title: string
  description: string
  status: "success" | "error" | "info"
}

interface ToastContextType {
  toasts: ToastType[]
  showToast: (title: string, description: string, status: "success" | "error" | "info") => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const showToast = useCallback((title: string, description: string, status: "success" | "error" | "info") => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, title, description, status }])

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={() => dismissToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProps {
  toast: ToastType
  onDismiss: () => void
}

function Toast({ toast, onDismiss }: ToastProps) {
  const { title, description, status } = toast

  const bgColor = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }[status]

  return (
    <div className={`max-w-md p-4 rounded-md shadow-lg ${bgColor} text-white`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{title}</h3>
          <p>{description}</p>
        </div>
        <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-white/20" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

