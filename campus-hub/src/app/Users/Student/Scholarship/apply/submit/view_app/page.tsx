"use client"

import { useEffect, useState } from "react"
import { Header } from "@/app/Users/Student/Components/header"
import { Sidebar } from "@/app/Users/Student/Components/sidebar"
import { ChatbotButton } from "@/app/Users/Student/Components/chatbot-button"
import { ProfileDrawer } from "@/app/Users/Student/Components/profile-drawer"
import { ChatbotDialog } from "@/app/Users/Student/Components/chatbot-dialog"
import { SearchBar } from "@/app/Users/Student/Components/search-bar"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import "@/app/Users/Student/Scholarship/scholarship-application.css"

export default function ViewApplicationPage() {
  const [applicationData, setApplicationData] = useState<any>(null)

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
              <h1 className="text-2xl font-bold mb-4">View Scholarship Application</h1>
              <div className="bg-white p-6 rounded-lg shadow-md">
                {Object.entries(applicationData).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <h3 className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</h3>
                    <p>{value as string}</p>
                  </div>
                ))}
              </div>
              
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