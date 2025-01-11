import { SearchBar } from "./search-bar"
import { CourseTable } from "./course-table"

export function CourseRegistrationAdminView() {
  return (
    <div>
      <h1 className="course-registration-admin-title">Course Registration Admin View</h1>
      <SearchBar />
      <CourseTable />
    </div>
  )
}

