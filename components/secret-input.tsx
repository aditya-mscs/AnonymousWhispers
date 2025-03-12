"use client"

import { useState, useRef, useCallback } from "react"
import { Mic, MicOff, Send } from "lucide-react"
import { createSecret } from "@/lib/actions"
import { getUsernameFromStorage } from "@/lib/username-generator"
import { useToast } from "./ui/toast-context"

// Define SpeechRecognition and SpeechRecognitionEvent types
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
  interface SpeechRecognition extends EventTarget {
    continuous: boolean
    interimResults: boolean
    lang: string
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
    start: () => void
    stop: () => void
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult
    length: number
    item(index: number): SpeechRecognitionResult
  }

  interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative
    length: number
    item(index: number): SpeechRecognitionAlternative
    isFinal: boolean
  }

  interface SpeechRecognitionAlternative {
    transcript: string
    confidence: number
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: SpeechRecognitionError
  }

  type SpeechRecognitionError =
    | "no-speech"
    | "aborted"
    | "audio-capture"
    | "network"
    | "not-allowed"
    | "service-not-allowed"
    | "bad-grammar"
    | "language-not-supported"
}

export function SecretInput() {
  const [secret, setSecret] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startRecording = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      showToast("Speech recognition not supported", "Your browser doesn't support speech recognition.", "error")
      return
    }

    try {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("")

        setSecret((prev) => prev + " " + transcript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        stopRecording()

        showToast("Error recording", `Speech recognition error: ${event.error}`, "error")
      }

      recognition.start()
      recognitionRef.current = recognition
      setIsRecording(true)

      showToast("Recording started", "Speak now. Your voice will be converted to text.", "info")
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      showToast("Error starting recording", "Could not start speech recognition.", "error")
    }
  }, [showToast])

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
      setIsRecording(false)

      showToast("Recording stopped", "Your speech has been converted to text.", "success")
    }
  }, [showToast])

  const handleSubmit = useCallback(async () => {
    if (secret.length < 10) {
      showToast("Secret too short", "Your secret must be at least 10 characters long.", "error")
      return
    }

    // Check for URLs or potential phishing attempts
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/g
    if (urlRegex.test(secret)) {
      showToast("URLs not allowed", "For security reasons, URLs are not allowed in secrets.", "error")
      return
    }

    setIsSubmitting(true)

    try {
      const username = getUsernameFromStorage()

      await createSecret({
        content: secret,
        username,
        timestamp: Date.now(),
      })

      setSecret("")

      showToast("Secret shared", "Your secret has been shared anonymously.", "success")
    } catch (error) {
      showToast("Error", "Failed to share your secret. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }, [secret, showToast])

  return (
    <div className="bg-card border border-purple-700 rounded-lg shadow-md">
      <div className="p-4">
        <div className="space-y-4">
          <textarea
            id="secret-input"
            name="secret-input"
            placeholder="Share your secret... (min 10 characters)"
            className="w-full min-h-[120px] p-3 text-lg border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 bg-background"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            aria-label="Secret input"
          />

          <div className="flex justify-between items-center">
            <div>
              {!isRecording ? (
                <button
                  type="button"
                  aria-label="Record your secret"
                  onClick={startRecording}
                  className="p-2 rounded-full border border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                >
                  <Mic className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Stop recording"
                  onClick={stopRecording}
                  className="p-2 rounded-full border border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 animate-pulse"
                >
                  <MicOff className="h-5 w-5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={secret.length < 10 || isSubmitting}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">Sharing</span>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </>
              ) : (
                <>
                  <span className="mr-2">Share Anonymously</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

