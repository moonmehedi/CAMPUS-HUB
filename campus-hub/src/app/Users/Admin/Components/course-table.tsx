"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface Course {
  name: string
  availableSeats: number
}

const courses: Course[] = Array(12).fill({ name: "CSE", availableSeats: 100 })

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
            <th>Available Seats</th>
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

