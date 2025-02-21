import { ScholarshipTable } from "./scholarship-table"
import { SearchBar } from "./search-bar"

export function ScholarshipTeacherView() {
  return (
    <div className="space-y-6">
      <header className="scholarship-teacher-header">
        <h1 className="scholarship-teacher-title">Scholarship Admin View</h1>
      </header>
      <div className="scholarship-teacher-summary bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Application Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-indigo-100 p-4 rounded">
            <span className="block text-indigo-800 font-medium">Forwarded</span>
            <span className="text-2xl font-bold text-indigo-900">5</span>
          </div>
          <div className="bg-green-100 p-4 rounded">
            <span className="block text-green-800 font-medium">Approved</span>
            <span className="text-2xl font-bold text-green-900">1</span>
          </div>
          <div className="bg-red-100 p-4 rounded">
            <span className="block text-red-800 font-medium">Rejected</span>
            <span className="text-2xl font-bold text-red-900">1</span>
          </div>
        </div>
      </div>
      <SearchBar />
      <ScholarshipTable />
    </div>
  )
}

