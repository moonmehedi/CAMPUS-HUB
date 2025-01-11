import { ScholarshipTable } from "./scholarship-table"
import { SearchBar } from "./search-bar"

export function ScholarshipAdminView() {
  return (
    <div>
      <header className="scholarship-admin-header">
        <h1 className="scholarship-admin-title">Scholarship Admin View</h1>
      </header>
      <SearchBar />
      <ScholarshipTable />
    </div>
  )
}

