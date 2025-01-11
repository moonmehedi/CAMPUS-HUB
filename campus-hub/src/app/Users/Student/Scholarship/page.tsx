import { Header } from "../Components/header"
import { Sidebar } from "../Components/sidebar"
import { ScholarshipApplicationContent } from "../Components/scholarship-application-content"
import "../Scholarship/scholarship-application.css"

export default function ScholarshipApplicationPage() {
  return (
    <div className="scholarship-application-container">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <Header />
          <div className="scholarship-application-content">
            <ScholarshipApplicationContent />
          </div>
        </main>
      </div>
    </div>
  )
}

