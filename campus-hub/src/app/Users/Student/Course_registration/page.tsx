'use client'
import { useState } from 'react'
import { StudentLayout } from "../Components/student-layout"
import { ChatbotButton } from "../Components/chatbot-button"
import { ProfileDrawer } from "../Components/profile-drawer"
import { ChatbotDialog } from "../Components/chatbot-dialog"
import { CourseRegistrationHeader } from "../Components/course-registration-header"
import { CourseTable } from "../Components/course-table"
import { SearchBar } from "../Components/search-bar"
import { Clock } from 'lucide-react'
import "../Course_Registration/course-registration.css"

export default function CourseRegistrationPage() {
  const [isRegistrationLocked, setIsRegistrationLocked] = useState(false)
  const currentDateTime = "2025-02-01 13:47:07" // Using the provided UTC time
  const currentUser = "maisha27"

  setTimeout(() => {
    setIsRegistrationLocked(true)
  }, 60000)

  return (
    <StudentLayout>
      <main className="course-registration-main">
        {/* Time and User Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#60A3D9]" />
              <span className="text-gray-700">{currentDateTime}</span>
            </div>
            <div className="text-gray-700">
              Welcome, <span className="font-medium text-[#60A3D9]">{currentUser}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100">
          <CourseRegistrationHeader isRegistrationLocked={isRegistrationLocked} />
          <SearchBar />
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-medium text-gray-700">Offered Courses</h2>
              <span className="px-2.5 py-0.5 bg-[#60A3D9]/10 text-[#60A3D9] rounded-full text-sm font-medium">
                6
              </span>
            </div>
            <CourseTable isRegistrationLocked={isRegistrationLocked} />
          </div>
        </div>
      </main>
      <ChatbotButton />
      <ProfileDrawer />
      <ChatbotDialog />
    </StudentLayout>
  )
}