import { Header } from "../Components/header"
import { Sidebar } from "../Components/sidebar"
import { ScholarshipApplicationContent } from "../Components/scholarship-application-content"
import "../Scholarship/scholarship-application.css"

export default function ScholarshipApplicationPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="scholarship-application-container">
            <div className="scholarship-application-content">
              
              <ScholarshipApplicationContent />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



