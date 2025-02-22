"use client"
import Link from "next/link"
import { useState } from "react"
import { StudentLayout } from "../Components/student-layout"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Course data
const courses = [
  {
    code: "CSE-309",
    name: "Computer Network",
    type: "Theory",
    credit: 3,
    color: "blue" as const,
    instructors: [
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/55a436f6-604b-4d16-a1dd-bc6fdb46a456/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NWE0MzZmNi02MDRiLTRkMTYtYTFkZC1iYzZmZGI0NmE0NTYiLCJleHAiOjE3MzY2ODY3MDEsImlhdCI6MTczNjYwMDMwMX0.dOhnvJHeGzRE-x9AeoKY7jGlwlfJNQX7xTsl2vJ3imk",
        name: "John Doe",
        initials: "JD"
      },
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/6202bc51-e351-4ed4-bafd-fc256d0da88f/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MjAyYmM1MS1lMzUxLTRlZDQtYmFmZC1mYzI1NmQwZGE4OGYiLCJleHAiOjE3MzY2ODY3MDEsImlhdCI6MTczNjYwMDMwMX0.vFvx4QGf6CBvLm0QGJ-XvzjKVrADawgSAmsls1oFu7o",
        name: "Jane Smith",
        initials: "JS"
      }
    ]
  },
  {
    code: "CSE-316",
    name: "Digital System Design Sessional",
    type: "Sessional",
    credit: 0.75,
    color: "purple" as const,
    instructors: [
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/d1e41c9c-6a76-4bc4-9116-75c4709bc3cd/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkMWU0MWM5Yy02YTc2LTRiYzQtOTExNi03NWM0NzA5YmMzY2QiLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.A-HkJrMkuC2xFkRU38KDTDcgdCemEhnV0UvHxgCy1Bw",
        name: "Alan Johnson",
        initials: "AJ"
      }
    ]
  }
]

// Color mappings for course cards
const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-100", border: "border-blue-500", text: "text-blue-900" },
  purple: { bg: "bg-purple-100", border: "border-purple-500", text: "text-purple-900" }
}

// Course Grid Component
interface CourseGridProps {
  onCourseSelect: (course: { name: string, code: string }) => void;
}

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <div 
          key={i} 
          className={`p-4 border rounded-lg cursor-pointer hover:opacity-90 transition duration-300 
          ${colorMap[course.color].bg} ${colorMap[course.color].border}`}
          onClick={() => onCourseSelect(course)}
        >
          <h3 className={`text-lg font-semibold ${colorMap[course.color].text}`}>
            {course.name}
          </h3>
          <p className="text-gray-600">{course.code}</p>
          <p className="text-gray-600">Credit: {course.credit}</p>
          <Link href="/Users/Student/Attendance">
          <Button 
            className={`mt-4 ${colorMap[course.color].bg} ${colorMap[course.color].text} 
              border-2 border-${course.color}-500 rounded-md 
              hover:bg-sky-500 hover:text-white hover:border-sky-500 transition duration-300`} 
            onClick={() => console.log("View course:", course)}
          >
            View
          </Button>
          </Link>

        </div>
      ))}
    </div>
  )
}

export default function CoursesPage() {
  const [studentId, setStudentId] = useState("");

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Attendance Tracker
          </h1>
          <p className="text-gray-600">
            View your class attendance records.
          </p>
        </div>

        {/* Course Grid */}
        <CourseGrid onCourseSelect={(course) => console.log("Selected course:", course)} />
      </div>
    </StudentLayout>
  );
}
