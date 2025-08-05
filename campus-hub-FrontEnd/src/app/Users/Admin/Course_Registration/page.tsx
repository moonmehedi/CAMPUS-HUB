'use client'
import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { CourseRegistrationAdminView } from "../Components/course-registration-admin-view"
import "./course-registration-admin.css"
import { useState } from 'react'

export default function CourseRegistrationAdminPage() {
  const [isRegistrationLocked, setIsRegistrationLocked] = useState(false)

  return (
    <div className="course-registration-admin-container">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="course-registration-admin-content">
            <CourseRegistrationAdminView 
              isRegistrationLocked={isRegistrationLocked}
              setIsRegistrationLocked={setIsRegistrationLocked}
            />
          </div>
        </main>
      </div>
    </div>
  )
}