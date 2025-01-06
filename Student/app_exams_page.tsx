import { ExamCalendar } from "@/components/exam-calendar"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ProfileDrawer } from "@/components/profile-drawer"
import { ChatbotButton } from "@/components/chatbot-button"
import { ChatbotDialog } from "@/components/chatbot-dialog"

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            <ExamCalendar />
          </main>
          <ChatbotButton />
          <ChatbotDialog />
          <ProfileDrawer />
        </div>
      </div>
    </div>
  )
}

