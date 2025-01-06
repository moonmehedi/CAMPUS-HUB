import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProfileDrawer } from "@/components/profile-drawer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm h-[calc(100vh-180px)] flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="bg-blue-100 rounded-lg p-3 ml-auto max-w-[80%]">
                  Hello! How can I help you today?
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2 max-w-4xl mx-auto">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </main>
          <ProfileDrawer />
        </div>
      </div>
    </div>
  )
}

