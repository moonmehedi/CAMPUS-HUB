import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function CourseRegistrationHeader() {
  return (
    <div className="course-registration-header">
      <h1 className="course-registration-title">Course Registration</h1>
      <div className="course-registration-filter">
        <Input
          type="text"
          placeholder="Fall 2024"
        />
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
          Filter
        </Button>
      </div>
    </div>
  )
}

