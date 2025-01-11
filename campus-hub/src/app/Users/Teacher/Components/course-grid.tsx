import { CourseCard } from "./course-card"

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
        image: "/placeholder.svg",
        name: "Alan Johnson",
        initials: "AJ"
      },
      {
        image: "/placeholder.svg",
        name: "Sarah Wilson",
        initials: "SW"
      },
      {
        image: "/placeholder.svg",
        name: "Mike Brown",
        initials: "MB"
      }
    ]
  },
  {
    code: "CSE-310",
    name: "Data Communication",
    type: "Theory",
    credit: 3,
    color: "blue" as const,
    instructors: [
      {
        image: "/placeholder.svg",
        name: "Robert Clark",
        initials: "RC"
      },
      {
        image: "/placeholder.svg",
        name: "Emily Davis",
        initials: "ED"
      }
    ]
  }
]

interface CourseGridProps {
  onCourseSelect: (course: { name: string, code: string }) => void
}

export function CourseGrid({ onCourseSelect }: CourseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} {...course} onSelect={onCourseSelect} />
      ))}
    </div>
  )
}

