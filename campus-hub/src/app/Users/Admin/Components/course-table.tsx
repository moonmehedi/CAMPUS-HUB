"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface Course {
  name: string
  availableSeats: number
}

const courses: Course[] = [
  { name: "CSE 101", availableSeats: 50 },
  { name: "CSE 102", availableSeats: 40 },
  { name: "CSE 103", availableSeats: 30 },
  { name: "CSE 201", availableSeats: 60 },
  { name: "CSE 202", availableSeats: 45 },
  { name: "CSE 203", availableSeats: 35 },
  { name: "CSE 301", availableSeats: 20 },
  { name: "CSE 302", availableSeats: 25 },
  { name: "CSE 303", availableSeats: 15 },
  { name: "CSE 401", availableSeats: 10 },
  { name: "CSE 402", availableSeats: 5 },
  { name: "CSE 403", availableSeats: 8 },
];

export function CourseTable() {
  const [lockedCourses, setLockedCourses] = useState<Set<number>>(new Set())

  const toggleLock = (index: number) => {
    setLockedCourses(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div className="course-table-container">
      <table className="course-table">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Total Seats</th>
            <th>Check Availability</th>
            <th>Lock Registration</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : ""}>
              <td>{course.name}</td>
              <td>{course.availableSeats}</td>
              <td>
                <Button variant="secondary" className="btn-view">
                  View
                </Button>
              </td>
              <td>
                <Switch
                  checked={lockedCourses.has(index)}
                  onChange={() => toggleLock(index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

