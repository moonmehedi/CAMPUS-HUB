'use client'

import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { ScholarshipTeacherView } from "../Components/scholarship-teacher-view"
import "../Scholarship/scholarship-applications.css"

export default function ScholarshipApplications() {
  return (
    <div className="scholarship-teacher-container">
      <div className="flex">
        <Sidebar />
<main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="scholarship-admin-content">
            <ScholarshipTeacherView />
          </div>
        </main>
      </div>
    </div>
  )
}
