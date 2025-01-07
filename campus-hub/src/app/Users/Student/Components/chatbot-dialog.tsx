'use client'

import { useState } from "react"
import { ArrowRight, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function ChatbotDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger id="chatbot-dialog" className="hidden">
        Open Chatbot
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat with AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          <div className="bg-blue-100 rounded-lg p-3 ml-auto max-w-[80%]">
            Hello! How can I help you today?
          </div>
        </div>
        <div className="flex gap-2 p-4 border-t">
          <Input placeholder="Type your message..." className="flex-1" />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="px-4 pb-4">
          <Link href="/chat">
            <Button variant="outline" className="w-full">
              Chat More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}

