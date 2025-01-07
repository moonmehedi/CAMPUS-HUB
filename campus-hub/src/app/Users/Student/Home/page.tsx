'use client'
import { Sidebar } from "../Components/sidebar";
import { Header } from "../Components/header";
import { ChatbotButton } from "../Components/chatbot-button";
import { ProfileDrawer } from "../Components/profile-drawer";
import { ChatbotDialog } from "../Components/chatbot-dialog";




export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
         <Header />
          <div className="flex-1 p-6">
            {/* Main content will go here */}
          </div>
          {/* Comment out one by one */}
          <ChatbotButton />
          <ProfileDrawer />
          <ChatbotDialog />
        </div>
      </div>
    </div>
  )
}

