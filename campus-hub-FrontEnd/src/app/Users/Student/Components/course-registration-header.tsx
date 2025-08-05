import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface CourseRegistrationHeaderProps {
  isRegistrationLocked: boolean
}

export function CourseRegistrationHeader({ isRegistrationLocked }: CourseRegistrationHeaderProps) {
  const [semester, setSemester] = useState("Fall 2024")

  return (
    <div className="course-registration-header">
      <h1 className="course-registration-title">Course Registration</h1>
      <div className="flex items-center gap-4">
        <div className="course-registration-filter">
          <Input
            type="text"
            placeholder="Fall 2024"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          />
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Filter
          </Button>
        </div>
        <div className={`registration-status ${isRegistrationLocked ? 'bg-red-500' : 'bg-green-500'} text-white px-4 py-2 rounded-md`}>
          {isRegistrationLocked ? 'Registration Locked' : 'Registration Open'}
        </div>
      </div>
    </div>
  )
}

