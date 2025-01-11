'use client'

import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { SearchBar } from "../Components/search-bar"
import { ScholarshipTable } from "../Components/scholarship-table"
import "../Scholarship/scholarship-applications.css"

export default function ScholarshipApplications() {
  return (
    <div className="scholarship-page">
      <div className="scholarship-layout">
        <Sidebar />
        <main className="scholarship-main">
          <DashboardHeader />
          <div className="scholarship-content">
            <header className="scholarship-header">
              <h1 className="scholarship-title">Scholarship Applications</h1>
            </header>
            <SearchBar />
            <ScholarshipTable />
          </div>
        </main>
      </div>
    </div>
  )
}

