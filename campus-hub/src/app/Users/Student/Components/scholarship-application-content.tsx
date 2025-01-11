import { ScholarshipForm } from "./scholarship-form"
import { ApplicationsTable } from "./applications-table"
import { SearchBar } from "./search-bar"

export function ScholarshipApplicationContent() {
  return (
    <div>
      <h1 className="scholarship-application-title">Scholarship Application</h1>
      <div className="scholarship-application-sections">
        <section className="scholarship-form-section">
          <h2 className="section-title">Apply for Scholarship</h2>
          <ScholarshipForm />
        </section>
      </div>
    </div>
  )
}

