// ExamsPage.tsx
'use client'

import { StudentLayout } from "../Components/student-layout"
import { ExamCalendar } from "../Components/exam-calendar"

export default function ExamsPage() {
  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        <ExamCalendar />
      </div>
    </StudentLayout>
  )
}