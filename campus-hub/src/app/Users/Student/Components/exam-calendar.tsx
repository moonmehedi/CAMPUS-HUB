// exam-calendar.tsx
"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Search, Clock } from 'lucide-react'
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

// Example data structure for exams
const exams = [
  {
    id: 1,
    title: "Sociology",
    type: "CT2",
    room: "401",
    date: new Date(2025, 1, 1), // February 1, 2025
    startTime: "8 AM",
    endTime: "9 AM",
    duration: 1,
    color: "bg-[#E6F0FF] text-[#60A3D9] border border-[#60A3D9]/20",
  },
  {
    id: 2,
    title: "Software Engineering",
    type: "CT1",
    room: "402",
    date: new Date(2025, 1, 4), // February 4, 2025
    startTime: "10 AM",
    endTime: "11 AM",
    duration: 1,
    color: "bg-[#E6FFE6] text-[#4CAF50] border border-[#4CAF50]/20",
  },
];

export function ExamCalendar() {
  const [view, setView] = useState<ViewType>("week")
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 1))
  const currentDateTime = "2025-02-01 14:42:13"

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
    <div className="space-y-6">
      {/* Current Time Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-[#60A3D9]" />
            <span className="text-gray-700">{currentDateTime}</span>
          </div>
        </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Calendar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {/* Navigation Section */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-50 rounded-lg p-1">
                <Button variant="ghost" size="icon" onClick={goBack} className="hover:bg-white hover:text-[#60A3D9]">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-4 font-medium text-gray-700">{monthYear}</span>
                <Button variant="ghost" size="icon" onClick={goForward} className="hover:bg-white hover:text-[#60A3D9]">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="outline" 
                onClick={goToToday}
                className="text-[#60A3D9] hover:bg-[#60A3D9] hover:text-white transition-colors"
              >
                Today
              </Button>
            </div>

            {/* View Selection and Search */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-50 rounded-lg p-1">
                {(["day", "week", "month", "year"] as const).map((viewType) => (
                  <Button
                    key={viewType}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "rounded-lg transition-colors",
                      view === viewType ? "bg-[#60A3D9] text-white" : "hover:bg-white hover:text-[#60A3D9]"
                    )}
                    onClick={() => setView(viewType)}
                  >
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search exams..."
                  className="pl-10 w-[250px] border-gray-200 focus:border-[#60A3D9] focus:ring-[#60A3D9]/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="overflow-auto">
          {/* Days Header */}
          <div className="grid grid-cols-[100px,1fr] border-b">
            <div className="p-4 bg-gray-50 border-r" />
            <div className="grid grid-cols-5">
              {dates.map((date, i) => (
                <div key={i} className="p-4 text-center border-r last:border-r-0">
                  <div className="text-sm font-medium text-gray-500">{daysOfWeek[i]}</div>
                  <div className="text-lg font-semibold text-gray-700">{date.getDate()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-[100px,1fr]">
              <div className="p-4 bg-gray-50 border-r text-sm font-medium text-gray-500 flex items-center justify-center">
                {time}
              </div>
              <div className="grid grid-cols-5">
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
                        "p-2 border-r border-b last:border-r-0",
                        "min-h-[100px]"
                      )}
                    >
                      {exam && (
                        <div
                          className={cn(
                            "h-full rounded-lg p-3",
                            exam.color
                          )}
                        >
                          <div className="font-medium">{exam.title}</div>
                          <div className="text-sm mt-1 opacity-75">{exam.type}</div>
                          <div className="text-sm mt-1">Room {exam.room}</div>
                          <div className="text-sm mt-1">{`${exam.startTime} - ${exam.endTime}`}</div>
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