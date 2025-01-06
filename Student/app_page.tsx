import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChatbotButton } from "@/components/chatbot-button"
import { ProfileDrawer } from "@/components/profile-drawer"
import { ChatbotDialog } from "@/components/chatbot-dialog"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {/* Main content will go here */}
          </main>
          <ChatbotButton />
          <ProfileDrawer />
          <ChatbotDialog />
        </div>
      </div>
    </div>
  )
}

