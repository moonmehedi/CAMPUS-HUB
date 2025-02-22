"use client"

import * as React from "react"
import { addDays, addMonths, format, startOfWeek, isSameDay, parseISO, isBefore, isAfter } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Search, Pencil, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


interface Exam {
  id: number
  teacher_id: number | string
  exam_name: string
  exam_type: string
  exam_date: string
  start_time: string
  end_time: string
  room_number: string
}

interface CurrentUser {
  id: number | string;
  role: string;
}
const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00"
]

const examTypes = [
  { value: "CT1", label: "Class Test 1" },
  { value: "CT2", label: "Class Test 2" },
  { value: "CT3", label: "Class Test 3" },
  { value: "MID", label: "Mid Exam" },
  { value: "QUIZ", label: "Lab Quiz" },
  { value: "LAB", label: "Lab" }
]

const weekDays = ["SUN", "MON", "TUE", "WED", "THU"]

export function ExamScheduler() {
  const [selectedDate, setSelectedDate] = React.useState<Date>()
  const [showAddExam, setShowAddExam] = React.useState(false)
  const [showEditExam, setShowEditExam] = React.useState(false)
  const [exams, setExams] = React.useState<Exam[]>([])
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [view, setView] = React.useState<"day" | "week" | "month" | "year">("week")
  const [selectedExam, setSelectedExam] = React.useState<Exam | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false)
  const [currentUser] = React.useState<CurrentUser>({ id: '1002', role: 'teacher' })

  const validateExamSchedule = (
    examData: Partial<Exam>,
    date: Date
  ): string | null => {
    // 1. Prevent scheduling in the past
    const examDateTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${examData.start_time}`);
    const now = new Date();
    
    if (isBefore(examDateTime, now)) {
      return "Cannot schedule exams in the past";
    }

    // 2. Validate start time is before end time
    const startTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${examData.start_time}`);
    const endTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${examData.end_time}`);
    
    if (!isBefore(startTime, endTime)) {
      return "Start time must be before end time";
    }

    // 3. Check for overlapping exams
    const hasOverlap = exams.some(existing => {
      // Skip comparing with self when editing
      if (examData.id && existing.id === examData.id) return false;

      const existingStart = parseISO(`${existing.exam_date}T${existing.start_time}`);
      const existingEnd = parseISO(`${existing.exam_date}T${existing.end_time}`);

      // Check if exams are on the same day
      if (!isSameDay(startTime, existingStart)) return false;

      // Check for room conflict or teacher conflict
      const sameRoom = existing.room_number === examData.room_number;
      const sameTeacher = existing.teacher_id === currentUser.id;

      // Check time overlap
      const hasTimeOverlap = (
        (isAfter(startTime, existingStart) && isBefore(startTime, existingEnd)) ||
        (isAfter(endTime, existingStart) && isBefore(endTime, existingEnd)) ||
        (isBefore(startTime, existingStart) && isAfter(endTime, existingEnd))
      );

      return hasTimeOverlap && (sameRoom || sameTeacher);
    });

    if (hasOverlap) {
      return "This time slot conflicts with an existing exam in the same room or by the same teacher";
    }

    // 4. Check for 12-hour restriction on editing
    if (examData.id) {
      const hoursUntilExam = (examDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);
      if (hoursUntilExam < 12) {
        return "Cannot modify exams within 12 hours of scheduled time";
      }
    }

    return null;
};

    


  // Navigation and date calculations
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

  // API and data management
  React.useEffect(() => {
    fetchExams()
  }, [currentDate])
// Update fetchExams function
const fetchExams = async () => {
  try {
    setIsLoading(true);
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = addDays(weekStart, 4);

    const response = await fetch(
      `http://localhost:3000/exams/show?start=${format(weekStart, 'yyyy-MM-dd')}&end=${format(weekEnd, 'yyyy-MM-dd')}`
    );
    
    if (!response.ok) throw new Error('Failed to fetch exams');
    const data = await response.json();
    
    setExams(data);
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch exam schedules",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Add this before your handleAddExam function
const validateExamForm = (formData: FormData): boolean => {
  const required = ["courseName", "examType", "startTime", "endTime", "roomNumber"];
  for (const field of required) {
    if (!formData.get(field)) {
      toast({
        title: "Error",
        description: `${field} is required`,
        variant: "destructive",
      });
      return false;
    }
  }
  return true;
};
// Update your handleAddExam function
const handleAddExam = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const formData = new FormData(e.currentTarget);
    
    if (!selectedDate) {
      throw new Error('Please select a date');
    }

    const examData = {
      teacher_id: currentUser.id,
      exam_name: formData.get("courseName") as string,
      exam_type: formData.get("examType") as string,
      exam_date: format(selectedDate, 'yyyy-MM-dd'),
      start_time: `${formData.get("startTime")}:00`,
      end_time: `${formData.get("endTime")}:00`,
      room_number: formData.get("roomNumber") as string
    };

    // Validate the exam data
    const validationError = validateExamSchedule(examData, selectedDate);
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    const response = await fetch('http://localhost:4000/exams/store', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(examData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add exam');
    }

    await fetchExams();
    setShowAddExam(false);
    toast({
      title: "Success",
      description: "Exam schedule added successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to add exam schedule",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setShowAddExam(true)
  }

  const handleExamClick = (exam: Exam) => {
    setSelectedExam(exam)
    setShowEditExam(true)
  }
// Update your handleEditExam function
const handleEditExam = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!selectedExam) return;
  setIsLoading(true);

  try {
    const formData = new FormData(e.currentTarget);
    
    const examData = {
      ...selectedExam,
      exam_name: formData.get("courseName") as string,
      exam_type: formData.get("examType") as string,
      start_time: `${formData.get("startTime")}:00`,
      end_time: `${formData.get("endTime")}:00`,
      room_number: formData.get("roomNumber") as string,
    };

    // Validate the exam data
    const validationError = validateExamSchedule(
      examData, 
      parseISO(selectedExam.exam_date)
    );
    
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    const response = await fetch(`http://localhost:4000/exams/${selectedExam.id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(examData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update exam');
    }

    await fetchExams();
    setShowEditExam(false);
    setSelectedExam(null);
    
    toast({
      title: "Success",
      description: "Exam schedule updated successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to update exam schedule",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

const handleDeleteClick = () => {
  setShowDeleteConfirm(true);
};

 // Keep your existing handleDeleteExam but rename it to executeDelete
 const executeDelete = async () => {
  if (!selectedExam) return;

  try {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/exams/${selectedExam.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete exam');
    }

    await fetchExams();
    setShowEditExam(false);
    setSelectedExam(null);
    setShowDeleteConfirm(false);
    
    toast({
      title: "Success",
      description: "Exam schedule deleted successfully",
    });
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to delete exam schedule",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

// Add this helper function for exam display
const canModifyExam = (exam: Exam): boolean => {
  return currentUser.id === exam.teacher_id;
};

 // In your JSX, update the exam display logic
 const renderExam = (exam: Exam) => {
  const isOwnExam = canModifyExam(exam);
  return (
    <div
      key={exam.id}
      className="h-full rounded-lg p-3 bg-[#E6F0FF] border border-[#003B73]/20 hover:shadow-md transition-all cursor-pointer"
      onClick={() => isOwnExam && handleExamClick(exam)}
    >
      <div className="font-medium text-[#003B73]">
        {isOwnExam ? exam.exam_name : "Your Exam"}
      </div>
      <div className="text-sm mt-1 text-[#003B73]/75">
        {exam.exam_type}
      </div>
    </div>
  );
};

  
  return (
    <div className="space-y-6 p-6 max-w-[1400px] mx-auto">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#003B73]">Exam Scheduler</h1>
      </div>

      <div className="grid grid-cols-[300px,1fr] gap-6">
        {/* Calendar Picker */}
<div className="bg-gradient-to-b from-[#003B73] to-[#60A3D9] p-4 rounded-xl shadow-lg">
  <Calendar
    mode="single"
    selected={selectedDate}
    onSelect={handleDateSelect}
    disabled={(date) => date < new Date()}
    className="rounded-xl"
  />
</div>

        {/* Schedule View */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Controls Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {/* Navigation */}
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-lg p-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveDate('backward')}
                    className="hover:bg-white hover:text-[#003B73]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="px-4 font-medium text-gray-700">
                    {format(currentDate, "MMMM yyyy")}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => moveDate('forward')}
                    className="hover:bg-white hover:text-[#003B73]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentDate(new Date())}
                  className="text-[#003B73] hover:bg-[#003B73] hover:text-white transition-colors"
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
                        view === viewType 
                          ? "bg-[#003B73] text-white" 
                          : "hover:bg-white hover:text-[#003B73]"
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-[250px] border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="overflow-auto">
            {/* Days Header */}
            <div className="grid grid-cols-[120px,1fr] border-b">
              <div className="p-4 bg-gray-50 border-r" />
              <div className="grid grid-cols-5">
                {weekDates.map((date, i) => (
                  <div key={i} className="p-4 text-center border-r last:border-r-0">
                    <div className="text-sm font-medium text-gray-500">
                      {format(date, "EEE")}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {format(date, "d")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-[120px,1fr]">
                <div className="p-4 bg-gray-50 border-r text-sm font-medium text-gray-500 flex items-center justify-center">
                  {time}
                </div>
                <div className="grid grid-cols-5">
                  {weekDates.map((date, dayIndex) => {
                    const dayExams = exams.filter(
                      exam => isSameDay(exam.exam_date, date) && exam.start_time === time
                    )

                    return (
                      <div
                        key={`${date.toString()}-${time}`}
                        className={cn(
                          "p-2 border-r border-b last:border-r-0 min-h-[100px]",
                          isSameDay(date, new Date()) ? "bg-blue-50/50" : ""
                        )}
                      >
                        {dayExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="h-full rounded-lg p-3 bg-[#E6F0FF] border border-[#003B73]/20"
                          >
                            <div className="font-medium text-[#003B73]">
                              {exam.exam_name}
                            </div>
                            <div className="text-sm mt-1 text-[#003B73]/75">
                              {exam.exam_type}
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Exam Dialog - styled to match theme */}
      {/* Add Exam Dialog */}
  {/* Add Exam Dialog */}
<Dialog open={showAddExam} onOpenChange={setShowAddExam}>
  <DialogContent className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg max-w-md">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-[#003B73] text-center pb-2">
        Add Exam Schedule
      </DialogTitle>
      {selectedDate && (
        <p className="text-center text-gray-600">
          {format(selectedDate, "MMMM d, yyyy")}
        </p>
      )}
    </DialogHeader>

    <form onSubmit={handleAddExam} className="space-y-4 mt-4">
      {/* Course Name */}
      <div className="space-y-2">
        <Label htmlFor="courseName" className="text-gray-700">
          Course Name
        </Label>
        <Input
          id="courseName"
          name="courseName"
          placeholder="e.g. Software Engineering"
          className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10"
          required
        />
      </div>

      {/* Exam Type */}
      <div className="space-y-2">
        <Label htmlFor="examType" className="text-gray-700">
          Exam Type
        </Label>
        <Select name="examType" required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select exam type" />
          </SelectTrigger>
          <SelectContent>
            {examTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Room Number */}
      <div className="space-y-2">
        <Label htmlFor="roomNumber" className="text-gray-700">
          Room Number
        </Label>
        <Input
          id="roomNumber"
          name="roomNumber"
          placeholder="e.g. 401"
          className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10"
          required
        />
      </div>

      {/* Start Time */}
      <div className="space-y-2">
        <Label htmlFor="startTime" className="text-gray-700">
          Start Time
        </Label>
        <Select name="startTime" required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select start time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {format(new Date(`2024-01-01T${slot}`), 'h:mm a')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* End Time */}
      <div className="space-y-2">
        <Label htmlFor="endTime" className="text-gray-700">
          End Time
        </Label>
        <Select name="endTime" required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select end time" />
          </SelectTrigger>
          <SelectContent>
          // Fix the template literal syntax for time slots
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {format(new Date(`2024-01-01T${slot}`), 'h:mm a')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowAddExam(false)}
          disabled={isLoading}
          className="text-gray-600 hover:text-gray-700 border-gray-200"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#003B73] hover:bg-[#60A3D9] text-white transition-colors"
        >
          {isLoading ? "Scheduling..." : "Schedule Exam"}
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

{/* Edit Exam Dialog */}
<Dialog open={showEditExam} onOpenChange={setShowEditExam}>
  <DialogContent className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-100 shadow-lg max-w-md">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold text-[#003B73] text-center pb-2">
        Edit Exam Schedule
      </DialogTitle>
      {selectedExam && (
        <p className="text-center text-gray-600">
          {format(parseISO(selectedExam.exam_date), "MMMM d, yyyy")}
        </p>
      )}
    </DialogHeader>

    <form onSubmit={handleEditExam} className="space-y-4 mt-4">
      {/* Course Name */}
      <div className="space-y-2">
        <Label htmlFor="courseName" className="text-gray-700">
          Course Name
        </Label>
        <Input
          id="courseName"
          name="courseName"
          defaultValue={selectedExam?.exam_name}
          placeholder="e.g. Software Engineering"
          className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10"
          required
        />
      </div>

      {/* Exam Type */}
      <div className="space-y-2">
        <Label htmlFor="examType" className="text-gray-700">
          Exam Type
        </Label>
        <Select name="examType" defaultValue={selectedExam?.exam_type} required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select exam type" />
          </SelectTrigger>
          <SelectContent>
            {examTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Room Number */}
      <div className="space-y-2">
        <Label htmlFor="roomNumber" className="text-gray-700">
          Room Number
        </Label>
        <Input
          id="roomNumber"
          name="roomNumber"
          defaultValue={selectedExam?.room_number}
          placeholder="e.g. 401"
          className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10"
          required
        />
      </div>

      {/* Start Time */}
      <div className="space-y-2">
        <Label htmlFor="startTime" className="text-gray-700">
          Start Time
        </Label>
        <Select name="startTime" defaultValue={selectedExam?.start_time} required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select start time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {format(new Date(`2024-01-01T${slot}`), 'h:mm a')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* End Time */}
      <div className="space-y-2">
        <Label htmlFor="endTime" className="text-gray-700">
          End Time
        </Label>
        <Select name="endTime" defaultValue={selectedExam?.end_time} required>
          <SelectTrigger className="border-gray-200 focus:border-[#003B73] focus:ring-[#003B73]/10">
            <SelectValue placeholder="Select end time" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((slot) => (
              <SelectItem key={slot} value={slot}>
                {format(new Date(`2024-01-01T${slot}`), 'h:mm a')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="destructive"
          onClick={executeDelete}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete Exam
        </Button>
        
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowEditExam(false)}
            disabled={isLoading}
            className="text-gray-600 hover:text-gray-700 border-gray-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-[#003B73] hover:bg-[#60A3D9] text-white transition-colors"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  </DialogContent>
</Dialog>

  <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Delete Exam</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to delete this exam? This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={executeDelete}
          disabled={isLoading}
          className="bg-red-500 hover:bg-red-600"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

    </div>
  )
}

