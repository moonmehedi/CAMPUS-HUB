import { DashboardHeader } from "../Components/dashboard-header"
import { Sidebar } from "../Components/sidebar";
import { WelcomeBanner } from "../Components/welcome-banner"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <WelcomeBanner />
          </div>
        </main>
      </div>
    </div>
  )
}

