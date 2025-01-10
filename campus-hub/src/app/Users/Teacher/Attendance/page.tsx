'use client'

import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { WelcomeBanner } from "../Components/welcome-banner"
import { CourseGrid } from "../Components/course-grid"

export default function DashboardPage() {
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
              <CourseGrid />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

