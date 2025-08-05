'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { StudentLayout } from "../Components/student-layout"

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    // Add user message to the chat
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }])
    setShowAnimation(false)

    try {
      // Send message to Django backend
      const response = await fetch('http://127.0.0.1:8000/blog/getResponse/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server')
      }

      const data = await response.json()

      // Add bot response to the chat
      setMessages(prev => [...prev, { text: data.message, isBot: true }])
    } catch (error) {
      console.error('Error:', error)
      // Handle error (e.g., show an error message to the user)
      setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", isBot: true }])
    }

    setInputMessage('')
  }

  return (
    <StudentLayout>
      <div className="h-[calc(100vh-140px)] flex flex-col">
        <div className="flex-1 flex flex-col h-full w-full rounded-lg overflow-hidden">
          {/* Chat header with gradient */}
          <div className="p-4 bg-gradient-to-r from-[#60A3D9] to-[#BFD7ED] text-white">
            <h2 className="text-xl font-semibold">AI Assistant</h2>
          </div>
          
          {/* Messages area with subtle background */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-[#F5F9FE]">
            {showAnimation ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#F5F9FE]">
                <div className="relative w-full max-w-3xl">
                  <img
                    src="https://i.pinimg.com/originals/39/b9/8f/39b98fd9cfae359c9d1fbee154bd279a.gif"
                    alt="AI thinking animation"
                    className="w-full h-full object-contain"
                  />
                  <div className="mt-8 text-center text-[#60A3D9] text-2xl font-medium animate-pulse">
                    How can I assist you today?
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-lg p-4 max-w-[80%] shadow-sm animate-slide-in",
                      msg.isBot 
                        ? "bg-[#E3F2FD] text-[#1E88E5] border border-[#BBDEFB]" 
                        : "bg-white text-[#37474F] border border-[#E3F2FD] ml-auto"
                    )}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Enhanced input area */}
          <div className="p-6 bg-white border-t border-[#E3F2FD]">
            <div className="flex gap-3 w-full">
              <Input 
                placeholder="Type your message..." 
                className="flex-1 h-12 px-4 text-base border-[#BFD7ED] focus:border-[#60A3D9] bg-[#F5F9FE]
                          transition-colors duration-200 rounded-lg"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage()
                  }
                }}
              />
              <Button 
                size="icon"
                className="h-12 w-12 bg-[#60A3D9] hover:bg-[#4A90D9] transition-colors duration-200
                         text-white rounded-lg shadow-md hover:shadow-lg"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}