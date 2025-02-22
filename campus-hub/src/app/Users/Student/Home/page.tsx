'use client'
import { StudentLayout } from "../Components/student-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, GraduationCap, Calendar, Clock, ChevronRight, BookIcon, Target, Award } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const currentDate = new Date('2025-02-01 08:59:59')
  const currentUser = 'Anika Tasmin'
  const currentSemester = "Spring 2025"
  
  const courses = [
    { code: "CSE 4301", name: "Software Engineering", instructor: "Dr. Smith", progress: 65, color: "#4C51BF" },
    { code: "CSE 4302", name: "Database Systems", instructor: "Dr. Johnson", progress: 45, color: "#2B6CB0" },
    { code: "CSE 4303", name: "Computer Networks", instructor: "Dr. Williams", progress: 80, color: "#2C7A7B" }
  ]

  const exams = [
    { course: "CSE 4301", date: "2025-02-15", time: "10:00 AM", urgent: true },
    { course: "CSE 4302", date: "2025-02-20", time: "02:00 PM", urgent: false }
  ]

  const scholarships = [
    { name: "Merit Scholarship 2025", deadline: "2025-03-01", amount: "$5,000", urgent: true },
    { name: "Tech Excellence Award", deadline: "2025-03-15", amount: "$3,000", urgent: false }
  ]

  return (
    <StudentLayout>
      <div className="space-y-6 p-4">
        {/* Welcome Section with enhanced typography and timing */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent">
            Welcome back, {currentUser}!
          </h1>
          <div className="flex items-center justify-center gap-2 text-[#2C5282]">
            <Clock className="h-4 w-4" />
            <p className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} | {currentSemester}
            </p>
          </div>
        </div>

        {/* Sections Grid with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Current Courses Section */}
          <Card className="backdrop-blur-lg bg-white/90 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-[#4C51BF]" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Current Courses</CardTitle>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course, index) => (
                <div key={index} 
                     className="relative p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                     style={{ borderLeft: `4px solid ${course.color}` }}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#1E3A8A]">{course.code}</p>
                      <p className="text-[#4A5568] text-sm">{course.name}</p>
                      <p className="text-xs text-[#718096]">{course.instructor}</p>
                    </div>
                    <BookIcon className="h-4 w-4 text-[#4C51BF] opacity-50" />
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#4A5568]">Progress</span>
                      <span className="font-medium text-[#4C51BF]">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Exams Section */}
          <Card className="backdrop-blur-lg bg-white/90 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg">
                    <Target className="h-5 w-5 text-[#E53E3E]" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Upcoming Exams</CardTitle>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {exams.map((exam, index) => (
                <div key={index} 
                     className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                     style={{ borderLeft: `4px solid ${exam.urgent ? '#E53E3E' : '#4C51BF'}` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#1E3A8A]">{exam.course}</p>
                      <p className={`text-sm ${exam.urgent ? 'text-red-600 font-medium' : 'text-[#4A5568]'}`}>
                        {exam.date}
                      </p>
                      <p className="text-xs text-[#718096]">{exam.time}</p>
                    </div>
                    <Calendar className="h-4 w-4 text-[#4C51BF] opacity-50" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Scholarships Section */}
          <Card className="backdrop-blur-lg bg-white/90 border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-50 rounded-lg">
                    <Award className="h-5 w-5 text-[#D69E2E]" />
                  </div>
                  <CardTitle className="text-lg font-semibold">Scholarships</CardTitle>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <div key={index} 
                     className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                     style={{ borderLeft: `4px solid ${scholarship.urgent ? '#D69E2E' : '#4C51BF'}` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#1E3A8A]">{scholarship.name}</p>
                      <p className="text-sm text-[#4A5568]">Amount: {scholarship.amount}</p>
                      <p className={`text-xs ${scholarship.urgent ? 'text-yellow-600 font-medium' : 'text-[#718096]'}`}>
                        Deadline: {scholarship.deadline}
                      </p>
                    </div>
                    <GraduationCap className="h-4 w-4 text-[#4C51BF] opacity-50" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  )
}