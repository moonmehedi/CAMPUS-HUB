import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AttendanceSheet } from "./attendance-sheet"

interface Instructor {
  image: string
  name: string
  initials: string
}

interface CourseCardProps {
  code: string
  name: string
  type: string
  credit: number
  instructors: Instructor[]
  color: "blue" | "purple"
}

const gradients = {
  blue: "from-[#003366] to-[#004080]",
  purple: "from-[#4B0082] to-[#663399]"
}

export function CourseCard({ code, name, type, credit, instructors, color }: CourseCardProps) {
  const [showAttendance, setShowAttendance] = useState(false)

  return (
    <>
      <Card 
        className={`bg-gradient-to-br ${gradients[color]} text-white hover:shadow-lg transition-shadow cursor-pointer`}
        onClick={() => setShowAttendance(true)}
      >
        <CardHeader className="pb-2">
          <p className="text-sm text-white/80">{code}</p>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-sm text-white/80 mb-4">{type}, {credit} Credit</p>
          <div className="flex -space-x-2">
            {instructors.map((instructor, i) => (
              <Avatar key={i} className="border-2 border-white/10">
                <AvatarImage src={instructor.image} alt={instructor.name} />
                <AvatarFallback>{instructor.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardContent>
      </Card>
      {showAttendance && (
        <AttendanceSheet 
          courseName={name} 
          courseCode={code} 
          onClose={() => setShowAttendance(false)} 
        />
      )}
    </>
  )
}
