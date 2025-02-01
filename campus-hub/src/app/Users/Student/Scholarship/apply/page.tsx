"use client"

import { Header } from "../../Components/header"
import { Sidebar } from "../../Components/sidebar"
import { ChatbotButton } from "../../Components/chatbot-button"
import { ProfileDrawer } from "../../Components/profile-drawer"
import { ChatbotDialog } from "../../Components/chatbot-dialog"
import { SearchBar } from "../../Components/search-bar"
import { ScholarshipForm } from "../../Components/scholarship-form"
import { useRouter } from "next/navigation"
import "../scholarship-application.css"
export default function ApplyScholarshipPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    console.log(data)
    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/Users/Student/Scholarship/apply/submit");
  }

  return (
    <div className="scholarship-application-container">
      <Header />
      <div className="scholarship-application-layout">
        <Sidebar />
        <div className="scholarship-application-content">
          <main className="scholarship-application-main">
            <div className="max-w-4xl mx-auto">
              <SearchBar />
              <h1 className="text-2xl font-bold mb-4">Scholarship Application Form</h1>
              <ScholarshipForm onSubmit={handleSubmit} />
            </div>
          </main>
        </div>
      </div>
      <ChatbotButton />
      <ProfileDrawer />
      <ChatbotDialog />
    </div>
  )
}