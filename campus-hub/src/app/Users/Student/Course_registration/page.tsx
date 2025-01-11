'use client'

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
    return (
      <div className="course-registration-container">
        <div className="course-registration-layout">
          <Sidebar />
          <div className="course-registration-content">
            <Header />
            <main className="course-registration-main">
              <CourseRegistrationHeader />
              <SearchBar />
              <div className="mt-4">
                <h2 className="text-sm font-medium mb-2">Offered Courses (6)</h2>
                <CourseTable />
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
  