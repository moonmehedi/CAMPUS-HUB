"use client"

import { useEffect, useState } from "react"
import { Header } from "../Components/header"
import { Sidebar } from "../Components/sidebar"
import { ChatbotButton } from "../Components/chatbot-button"
import { ProfileDrawer } from "../Components/profile-drawer"
import { ChatbotDialog } from "../Components/chatbot-dialog"
import { SearchBar } from "../Components/search-bar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import "./scholarship-application.css"
import "./apply/page.tsx"
import { SubmittedApplication } from "./apply/submit/page"

export default function ScholarshipApplicationPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const checkSubmission = async () => {
      // This would typically be an API call to check if the user has submitted an application
      const response = await new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000))
      setHasSubmitted(response)
    }

    checkSubmission()
  }, [])

  return (
    <div className="scholarship-application-container">
      <Header />
      <div className="scholarship-application-layout">
        <Sidebar />
        <div className="scholarship-application-content">
          <main className="scholarship-application-main">
            <div className="max-w-4xl mx-auto">
              <SearchBar />
              <h1 className="text-2xl font-bold mb-4">Scholarship Application</h1>
              {hasSubmitted ? (
                <SubmittedApplication />
              ) : (
                <div>
                  <p className="mb-4">You haven't submitted a scholarship application yet.</p>
                  <Link href="/Users/Student/Scholarship/apply">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Apply for Scholarship</Button>
                  </Link>
                </div>
              )}
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