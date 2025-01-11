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
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/d1e41c9c-6a76-4bc4-9116-75c4709bc3cd/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkMWU0MWM5Yy02YTc2LTRiYzQtOTExNi03NWM0NzA5YmMzY2QiLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.A-HkJrMkuC2xFkRU38KDTDcgdCemEhnV0UvHxgCy1Bw",
        name: "Alan Johnson",
        initials: "AJ"
      },
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/202919ed-0e8b-49f1-8f33-2cb24bfa6931/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMDI5MTllZC0wZThiLTQ5ZjEtOGYzMy0yY2IyNGJmYTY5MzEiLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.ZxhDoL7iOEDZQ_5MS99b2UYcyhExwhGxp2sTlZPJ1tc",
        name: "Sarah Wilson",
        initials: "SW"
      },
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/f8071f21-097d-4aa4-8958-f5d593203757/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmODA3MWYyMS0wOTdkLTRhYTQtODk1OC1mNWQ1OTMyMDM3NTciLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.NVL-Rv_I-yp-lZG7mdhCXPn5iB6EBgSJHyWQfzBjf6Y",
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
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/f8071f21-097d-4aa4-8958-f5d593203757/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmODA3MWYyMS0wOTdkLTRhYTQtODk1OC1mNWQ1OTMyMDM3NTciLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.NVL-Rv_I-yp-lZG7mdhCXPn5iB6EBgSJHyWQfzBjf6Y",
        name: "Robert Clark",
        initials: "RC"
      },
      {
        image: "https://uniplex.mist.ac.bd:8443/admission-api/files/view/d1e41c9c-6a76-4bc4-9116-75c4709bc3cd/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkMWU0MWM5Yy02YTc2LTRiYzQtOTExNi03NWM0NzA5YmMzY2QiLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.A-HkJrMkuC2xFkRU38KDTDcgdCemEhnV0UvHxgCy1Bw",
        
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

