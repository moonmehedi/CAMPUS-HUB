"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, X } from 'lucide-react'

interface Course {
  serial: number
  courseCode: string
  courseType: string
  syllabus: string
  section: string
  regType: string
  contactHours: string
  regStatus: string
  status: string
}

const courses: Course[] = [
  {
    serial: 1,
    courseCode: "CSE-305",
    courseType: "Theory",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "3.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
  {
    serial: 2,
    courseCode: "CSE-315",
    courseType: "Theory",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "3.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
  {
    serial: 3,
    courseCode: "CSE-319",
    courseType: "Theory",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "3.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
  {
    serial: 4,
    courseCode: "CSE-325",
    courseType: "Sessional",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "3.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
  {
    serial: 5,
    courseCode: "CSE-363",
    courseType: "Sessional",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "3.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
  {
    serial: 6,
    courseCode: "GERM-356",
    courseType: "Sessional",
    syllabus: "2021",
    section: "A",
    regType: "Regular",
    contactHours: "2.00",
    regStatus: "Not Registered",
    status: "NULL"
  },
]

export function CourseTable() {
  return (
    <div className="course-table-container">
      <Table className="course-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Serial</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Course Type</TableHead>
            <TableHead>Syllabus</TableHead>
            <TableHead>Course Sec.</TableHead>
            <TableHead>Reg. Type</TableHead>
            <TableHead>Contact Hrs.</TableHead>
            <TableHead>Reg. Status</TableHead>
            <TableHead className="text-center">Add</TableHead>
            <TableHead className="text-center">Drop</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.serial}</TableCell>
              <TableCell>{course.courseCode}</TableCell>
              <TableCell>{course.courseType}</TableCell>
              <TableCell>{course.syllabus}</TableCell>
              <TableCell>{course.section}</TableCell>
              <TableCell>{course.regType}</TableCell>
              <TableCell>{course.contactHours}</TableCell>
              <TableCell>{course.regStatus}</TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="course-action-button add"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell className="text-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="course-action-button drop"
                >
                  <X className="h-4 w-4" />
                </Button>
              </TableCell>
              <TableCell>{course.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

