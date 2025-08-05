import { DashboardHeader } from "../../Components/dashboard-header"
import { Sidebar } from "../../Components/sidebar"
import { LeaveRequestForm } from "../../Components/leave-request-form"

export default function LeaveRequestDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <LeaveRequestForm />
          </div>
        </main>
      </div>
    </div>
  )
}

