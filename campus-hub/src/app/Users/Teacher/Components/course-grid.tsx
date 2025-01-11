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
        image: "/placeholder.svg",
        name: "John Doe",
        initials: "JD"
      },
      {
        image: "/placeholder.svg",
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

export function CourseGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </div>
  )
}

