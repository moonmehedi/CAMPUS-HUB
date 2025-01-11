import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { LeaveRequestsList } from "../Components/leave-request-list"

export default function LeaveRequestsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">Leave Request</h1>
            <LeaveRequestsList />
          </div>
        </main>
      </div>
    </div>
  )
}

