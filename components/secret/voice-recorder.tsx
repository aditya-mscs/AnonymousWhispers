"use client"

import { useState, useRef } from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceRecorderProps {
  onTranscript: (text: string) => void
  onStatusChange: (status: { title: string; description: string; status: "success" | "error" | "info" }) => void
}

// Declare SpeechRecognition interface
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}

export function VoiceRecorder({ onTranscript, onStatusChange }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      onStatusChange({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition.",
        status: "error",
      })
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

        onTranscript(transcript)
      }

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error)
        stopRecording()

        onStatusChange({
          title: "Error recording",
          description: `Speech recognition error: ${event.error}`,
          status: "error",
        })
      }

      recognition.start()
      recognitionRef.current = recognition
      setIsRecording(true)

      onStatusChange({
        title: "Recording started",
        description: "Speak now. Your voice will be converted to text.",
        status: "info",
      })
    } catch (error) {
      console.error("Error starting speech recognition:", error)
      onStatusChange({
        title: "Error starting recording",
        description: "Could not start speech recognition.",
        status: "error",
      })
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
      setIsRecording(false)

      onStatusChange({
        title: "Recording stopped",
        description: "Your speech has been converted to text.",
        status: "success",
      })
    }
  }

  return (
    <>
      {!isRecording ? (
        <Button
          variant="outline"
          size="icon"
          onClick={startRecording}
          className="rounded-full border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          aria-label="Record your secret"
        >
          <Mic className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          onClick={stopRecording}
          className="rounded-full border-red-500 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 animate-pulse"
          aria-label="Stop recording"
        >
          <MicOff className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}

