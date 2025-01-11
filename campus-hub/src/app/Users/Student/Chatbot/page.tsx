'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Sidebar } from "../Components/sidebar"
import { Header } from "../Components/header"
import { ProfileDrawer } from "../Components/profile-drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  text: string;
  isBot: boolean;
}

export default function ChatPage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, isBot: false }])
    
    // Hide animation
    setShowAnimation(false)
    
    // Add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Thanks for your question!", isBot: true }])
    }, 1000)

    setInputMessage('')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="w-full h-full rounded-lg shadow-lg border border-black flex flex-col" style={{ backgroundColor: '#f8f9fe' }} >
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                {showAnimation ? (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#f8f9fe' }}>
                    <div className="relative w-[80vw] h-[60vh] max-w-3xl max-h-[600px]">
                      <img
                        src="https://i.pinimg.com/originals/39/b9/8f/39b98fd9cfae359c9d1fbee154bd279a.gif"
                        alt="AI thinking animation"
                        className="w-full h-full object-contain"
                      />
                      <div className="mt-8 text-center text-gray-600 text-2xl animate-pulse">
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
                          "rounded-lg p-3 max-w-[80%] animate-slide-in",
                          msg.isBot ? "bg-blue-100" : "bg-gray-100 ml-auto"
                        )}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2 w-full mx-auto px-4">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
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
                    onClick={handleSendMessage}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ProfileDrawer />
        </div>
      </div>
    </div>
  )
}

