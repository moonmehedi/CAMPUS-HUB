"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Header } from "@/app/Users/Student/Components/header"
import { Sidebar } from "@/app/Users/Student/Components/sidebar"
import { ChatbotButton } from "@/app/Users/Student/Components/chatbot-button"
import { ProfileDrawer } from "@/app/Users/Student/Components/profile-drawer"
import { ChatbotDialog } from "@/app/Users/Student/Components/chatbot-dialog"
import { SearchBar } from "@/app/Users/Student/Components/search-bar"
import { ScholarshipForm } from "@/app/Users/Student/Components/scholarship-form"
import "@/app/Users/Student/Scholarship/scholarship-application.css"

export default function ModifyApplicationPage() {
  const [applicationData, setApplicationData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // This would typically be an API call to fetch the application data
    const fetchApplicationData = async () => {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setApplicationData({
        name: "John Doe",
        phoneNo: "1234567890",
        fatherName: "John Doe Sr.",
        motherName: "Jane Doe",
        birthday: "1990-01-01",
        address: "123 Main St, Anytown, USA",
        classSection: "12A",
        currentScholarshipStatus: "None",
        rollNo: "001",
        registrationNo: "REG001",
        reason: "I am passionate about my studies and need financial assistance to continue my education.",
      })
    }

    fetchApplicationData()
  }, [])

  const handleSubmit = async (data: any) => {
    console.log(data)
    // Here you would typically send the updated data to your backend
    // For now, we'll just simulate a successful update
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/Users/Student/Scholarship/apply/submit");
  }

  if (!applicationData) {
    return <div>Loading...</div>
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
              <h1 className="text-2xl font-bold mb-4">Modify Scholarship Application</h1>
              <ScholarshipForm onSubmit={handleSubmit} initialData={applicationData} />
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