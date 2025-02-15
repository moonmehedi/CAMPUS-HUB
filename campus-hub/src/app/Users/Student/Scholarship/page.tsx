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
import { SubmittedApplication } from "./apply/submit/page"

export default function ScholarshipApplicationPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const checkSubmission = async () => {
      const response = await new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 1000))
      setHasSubmitted(response)
    }

    checkSubmission()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFD7ED] to-[#60A3D9]">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-6">
            <div className="bg-white rounded-[30px] overflow-hidden p-8">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Search Section */}
                <div className="flex gap-4 w-full">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search scholarships..."
                      className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <Button 
                    className="h-12 px-6 text-lg bg-[#60A3D9] hover:bg-[#4A90D9] text-white rounded-lg"
                  >
                    Search
                  </Button>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800 my-8">
                  Scholarship Application
                </h1>

                {/* Application Status */}
                <div className="text-center space-y-6">
                  {hasSubmitted ? (
                    <SubmittedApplication />
                  ) : (
                    <div className="space-y-6">
                      <p className="text-lg text-gray-600">
                        You haven't submitted a scholarship application yet.
                      </p>
                      <div className="flex justify-center">
                        <Link href="/Users/Student/Scholarship/apply">
                          <Button className="h-12 px-8 text-lg bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                            Apply for Scholarship
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ChatbotButton />
          <ProfileDrawer />
          <ChatbotDialog />
        </div>
      </div>
    </div>
  )
}