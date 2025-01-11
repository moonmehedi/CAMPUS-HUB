"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type ViewType = "day" | "week" | "month" | "year"

const timeSlots = [
  "8 AM", "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM"
]

const daysOfWeek = [
  "SUN", "MON", "TUE", "WED", "THU"
]

const exams = [
  {
    id: 1,
    title: "Sociology CT2",
    date: new Date(2024, 0, 22), // January 22, 2024
    startTime: "8 AM",
    duration: 1,
    color: "bg-purple-100 text-purple-900",
  },
  {
    id: 2,
    title: "Software Engineering CT1",
    date: new Date(2024, 0, 25), // January 25, 2024
    startTime: "8 AM",
    duration: 1,
    color: "bg-blue-100 text-blue-900",
  },
];


export function ExamCalendar() {
  const [view, setView] = useState<ViewType>("week")
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 21)) // January 21, 2024 (Sunday)

  const goToToday = () => setCurrentDate(new Date())
  const goBack = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }
  const goForward = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(currentDate)
    date.setDate(currentDate.getDate() + i)
    return date
  })

  const monthYear = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-120px)] flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={goBack}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday}>Today</Button>
          <div className="text-lg font-semibold px-4">{monthYear}</div>
          <Button variant="ghost" size="icon" onClick={goForward}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
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
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search exams..."
              className="w-[200px] pl-8"
            />
          </div>
        </div>
      </div>
      <div className="text-center py-2 text-lg font-semibold border-b">{monthYear}</div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-[auto,1fr] min-w-[800px]">
          <div className="w-20" />
          <div className="grid grid-cols-5 text-center py-2 border-b">
            {dates.map((date, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-sm text-muted-foreground">
                  {daysOfWeek[i]}
                </div>
                <div className="text-lg font-semibold">{date.getDate()}</div>
              </div>
            ))}
          </div>
        </div>
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-[auto,1fr]">
            <div className="w-20 py-2 px-2 text-right text-sm text-muted-foreground">
              {time}
            </div>
            <div className="grid grid-cols-5 border-l">
              {dates.map((date, dayIndex) => {
                const exam = exams.find(
                  (e) =>
                    e.startTime === time &&
                    e.date.getDate() === date.getDate() &&
                    e.date.getMonth() === date.getMonth()
                )

                return (
                  <div
                    key={dayIndex}
                    className={cn(
                      "border-r h-16 p-1 flex flex-col justify-center", // Consistent placement
                      dayIndex === 4 && "border-r-0"
                    )}
                  >
                    {exam && (
                      <div
                        className={cn(
                          "p-1 rounded text-xs h-full flex items-center justify-center",
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
  )
}
