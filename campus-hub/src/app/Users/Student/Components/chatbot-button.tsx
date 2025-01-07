'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function ChatbotButton() {
  return (
    <Button
      onClick={() => document.getElementById('chatbot-dialog')?.click()}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}

