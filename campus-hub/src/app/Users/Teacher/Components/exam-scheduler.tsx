"use client"

import * as React from "react"
import { addDays, addMonths, format, startOfWeek, isSameDay, parseISO } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Exam {
  id: string
  date: Date
  courseName: string
  examType: string
  time: string
}

const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM"
]

const weekDays = ["SUN", "MON", "TUE", "WED", "THU"]

export function ExamScheduler() {
  const [selectedDate, setSelectedDate] = React.useState<Date>()
  const [showAddExam, setShowAddExam] = React.useState(false)
  const [exams, setExams] = React.useState<Exam[]>([])
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState<"day" | "week" | "month" | "year">("week")

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setShowAddExam(true)
  }

  const handleAddExam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    if (selectedDate) {
      const newExam: Exam = {
        id: Math.random().toString(),
        date: selectedDate,
        courseName: formData.get("courseName") as string,
        examType: formData.get("examType") as string,
        time: formData.get("time") as string,
      }
      
      setExams([...exams, newExam])
      setShowAddExam(false)
    }
  }

  const moveDate = (direction: 'forward' | 'backward') => {
    if (view === "day") {
      setCurrentDate(prev => direction === 'forward' ? addDays(prev, 1) : addDays(prev, -1))
    } else if (view === "week") {
      setCurrentDate(prev => direction === 'forward' ? addDays(prev, 7) : addDays(prev, -7))
    } else if (view === "month") {
      setCurrentDate(prev => direction === 'forward' ? addMonths(prev, 1) : addMonths(prev, -1))
    } else if (view === "year") {
      setCurrentDate(prev => direction === 'forward' ? addMonths(prev, 12) : addMonths(prev, -12))
    }
  }

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 })
  const weekDates = weekDays.map((_, index) => addDays(weekStart, index))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-center">Exam Scheduler</h2>
      </div>
      
      <div className="flex gap-7">
        <div className="w-70">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border bg-gradient-to-b from-[#003B73] to-[#60A3D9] text-white"
          />
        </div>

        <div className="flex-1 rounded-lg border mr-8 mb-4">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveDate('backward')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => moveDate('forward')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">
                {format(currentDate, "MMMM yyyy")}
              </h2>
            </div>
            <div className="flex gap-1">
              <Button 
                variant={view === "day" ? "destructive" : "secondary"} 
                size="sm"
                onClick={() => setView("day")}
              >
                Day
              </Button>
              <Button 
                variant={view === "week" ? "destructive" : "secondary"} 
                size="sm"
                onClick={() => setView("week")}
              >
                Week
              </Button>
              <Button 
                variant={view === "month" ? "destructive" : "secondary"} 
                size="sm"
                onClick={() => setView("month")}
              >
                Month
              </Button>
              <Button 
                variant={view === "year" ? "destructive" : "secondary"} 
                size="sm"
                onClick={() => setView("year")}
              >
                Year
              </Button>
            </div>
          </div>

          <div
  className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr] border-b"
  style={{ rowGap: "20px" }} // Adds space between rows
>
  <div className="p-4 text-center font-medium text-lg">Time</div> {/* Increased padding and font size */}
  {weekDates.map((date) => (
    <div
      key={date.toString()}
      className={cn(
        "p-4 text-center text-lg", // Increased padding and font size
        isSameDay(date, new Date()) ? "bg-muted" : ""
      )}
    >
      <div className="font-medium">{format(date, "EEE")}</div>
      <div className="text-sm text-muted-foreground">
        {format(date, "d")}
      </div>
    </div>
  ))}
</div>

          <div className="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr]">
            {timeSlots.map((time) => (
              <React.Fragment key={time}>
                   <div
                    className="border-r p-4 text-right text-sm text-muted-foreground"
                    style={{ height: "80px" }} // Adjust the height here
                  >
                    {time}
                  </div>
                {weekDates.map((date) => (
                  <div
                    key={`${date.toString()}-${time}`}
                    className={cn(
                      "border-r border-b p-2",
                      isSameDay(date, new Date()) ? "bg-muted" : ""
                    )}
                  >
                    {exams
                      .filter(
                        (exam) =>
                          isSameDay(exam.date, date) &&
                          exam.time === time
                      )
                      .map((exam) => (
                        <div
                          key={exam.id}
                          className="mb-1 rounded bg-blue-100 p-2 text-xs"
                        >
                          <div className="font-medium">{exam.courseName}</div>
                          <div>{exam.examType}</div>
                        </div>
                      ))}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showAddExam} onOpenChange={setShowAddExam}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Exam Schedule</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddExam} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input
                id="courseName"
                name="courseName"
                placeholder="e.g. Software Engineering"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select name="examType" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CT1">Class Test 1</SelectItem>
                  <SelectItem value="CT2">Class Test 2</SelectItem>
                  <SelectItem value="MID">Mid Exam</SelectItem>
                  <SelectItem value="CT3">Class Test 3</SelectItem>
                  <SelectItem value="QUIZ">Lab Quiz</SelectItem>
                  <SelectItem value="ONLINE">Lab Online</SelectItem>
                  <SelectItem value="FINAL">Final Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select name="time" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowAddExam(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Exam</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

