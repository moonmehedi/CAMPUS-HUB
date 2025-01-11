'use client'

import { useState } from "react"
import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { WelcomeBanner } from "../Components/welcome-banner"
import { CourseGrid } from "../Components/course-grid"
import { MainAttendanceSheet } from "../Components/main-attendance-sheet"

export default function DashboardPage() {
  const [selectedCourse, setSelectedCourse] = useState<{ name: string, code: string } | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8 space-y-8">
            <WelcomeBanner />
            <div>
              <h2 className="text-2xl font-semibold mb-6">Your Courses</h2>
              <CourseGrid onCourseSelect={setSelectedCourse} />
            </div>
          </div>
          {selectedCourse && (
            <MainAttendanceSheet
              courseName={selectedCourse.name}
              courseCode={selectedCourse.code}
              onClose={() => setSelectedCourse(null)}
            />
          )}
        </main>
      </div>
    </div>
  )
}

