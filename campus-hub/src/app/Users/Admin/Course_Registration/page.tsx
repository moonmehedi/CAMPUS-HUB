import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { CourseRegistrationAdminView } from "../Components/course-registration-admin-view"
import "./course-registration-admin.css"

export default function CourseRegistrationAdminPage() {
  return (
    <div className="course-registration-admin-container">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="course-registration-admin-content">
            <CourseRegistrationAdminView />
          </div>
        </main>
      </div>
    </div>
  )
}

