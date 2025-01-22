'use client'
import { useState } from 'react'
import { Sidebar } from "../Components/sidebar"
import { Header } from "../Components/header"
import { ChatbotButton } from "../Components/chatbot-button"
import { ProfileDrawer } from "../Components/profile-drawer"
import { ChatbotDialog } from "../Components/chatbot-dialog"
import { CourseRegistrationHeader } from "../Components/course-registration-header"
import { CourseTable } from "../Components/course-table"
import { SearchBar } from "../Components/search-bar"
import "../Course_Registration/course-registration.css"

export default function CourseRegistrationPage() {
  const [isRegistrationLocked, setIsRegistrationLocked] = useState(false)

  // In a real application, you would fetch this state from an API
  // For demonstration purposes, we'll use a timeout to simulate the admin locking the registration
  setTimeout(() => {
    setIsRegistrationLocked(true)
  }, 60000) // Lock after 1 minute

  return (
    <div className="course-registration-container">
      <div className="course-registration-layout">
        <Sidebar />
        <div className="course-registration-content">
          <Header />
          <main className="course-registration-main">
            <CourseRegistrationHeader isRegistrationLocked={isRegistrationLocked} />
            <SearchBar />
            <div className="mt-4">
              <h2 className="text-sm font-medium mb-2">Offered Courses (6)</h2>
              <CourseTable isRegistrationLocked={isRegistrationLocked} />
            </div>
          </main>
          <ChatbotButton />
          <ProfileDrawer />
          <ChatbotDialog />
        </div>
      </div>
    </div>
  )
}