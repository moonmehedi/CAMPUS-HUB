import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar"
import { ExamScheduler } from "../Components/exam-scheduler"

export default function ExamSchedulerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <ExamScheduler />
          </div>
        </main>
      </div>
    </div>
  )
}

