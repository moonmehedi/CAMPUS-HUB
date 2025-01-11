import { ExamCalendar } from "../Components/exam-calendar"
import { Header } from "../Components/header"
import { Sidebar } from "../Components/sidebar"
import { ProfileDrawer } from "../Components/profile-drawer"
import { ChatbotButton } from "../Components/chatbot-button"
import { ChatbotDialog } from "../Components/chatbot-dialog"

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

