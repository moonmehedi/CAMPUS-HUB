import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { ScholarshipAdminView } from "../Components/scholarship-admin-view"
import "./scholarship-admin.css"

export default function ScholarshipAdminPage() {
  return (
    <div className="scholarship-admin-container">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="scholarship-admin-content">
            <ScholarshipAdminView />
          </div>
        </main>
      </div>
    </div>
  )
}
