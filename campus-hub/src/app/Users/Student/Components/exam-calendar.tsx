'use client'

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ViewType = "day" | "week" | "month" | "year"

// Updated time slots from 8 AM to 3 PM
const timeSlots = Array.from({ length: 8 }, (_, i) => i + 8) // 8 AM to 3 PM

const daysOfWeek = [
  { short: "SUN", long: "Sunday" },
  { short: "MON", long: "Monday" },
  { short: "TUE", long: "Tuesday" },
  { short: "WED", long: "Wednesday" },
  { short: "THU", long: "Thursday" },
  { short: "FRI", long: "Friday" },
  { short: "SAT", long: "Saturday" },
]

const exams = [
  {
    id: 1,
    title: "Sociology CT2",
    date: new Date(2024, 0, 22), // January 22, 2024
    startTime: 8,
    duration: 1,
    color: "bg-purple-100 text-purple-900",
  },
  {
    id: 2,
    title: "Software Engineering CT1",
    date: new Date(2024, 0, 25), // January 25, 2024
    startTime: 8,
    duration: 1,
    color: "bg-blue-100 text-blue-900",
  },
]

export function ExamCalendar() {
  const [view, setView] = useState<ViewType>("week")
  const [currentDate] = useState(new Date(2024, 0, 22)) // January 22, 2024

  const startOfWeek = new Date(currentDate)
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    return date
  })

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-120px)] flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex-1 flex justify-start">
          <div className="relative w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exams..."
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center space-x-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline">Today</Button>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 flex justify-end">
          <div className="flex items-center rounded-lg border bg-card text-card-foreground shadow-sm">
            {(["day", "week", "month", "year"] as const).map((viewType) => (
              <Button
                key={viewType}
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none first:rounded-l-md last:rounded-r-md",
                  view === viewType && "bg-muted"
                )}
                onClick={() => setView(viewType)}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[auto,1fr] min-w-[800px]">
          <div className="w-20" /> {/* Increased width for time column */}
          <div className="grid grid-cols-7 text-center py-4 border-b">
            {dates.map((date, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-sm text-muted-foreground">
                  {daysOfWeek[i].short}
                </div>
                <div className="text-xl font-semibold mt-1">{date.getDate()}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[auto,1fr] divide-y min-w-[800px]">
          {timeSlots.map((hour) => (
            <div key={hour} className="grid grid-cols-[auto,1fr]">
              <div className="w-20 py-8 px-4 text-right text-sm text-muted-foreground">
                {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
              </div>
              <div className="grid grid-cols-7 border-l">
                {dates.map((date, dayIndex) => {
                  const exam = exams.find(
                    (e) =>
                      e.startTime === hour &&
                      e.date.getDate() === date.getDate() &&
                      e.date.getMonth() === date.getMonth()
                  )

                  return (
                    <div
                      key={dayIndex}
                      className={cn(
                        "border-r py-8 px-4", // Increased padding for larger cells
                        dayIndex === 6 && "border-r-0"
                      )}
                    >
                      {exam && (
                        <div
                          className={cn(
                            "p-2 rounded text-sm h-full",
                            exam.color
                          )}
                        >
                          {exam.title}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

