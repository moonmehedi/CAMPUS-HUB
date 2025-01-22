"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Student {
  id: string
  name: string
  selectedCourses: string[]
  addedCourses: string[]
  droppedCourses: string[]
}

const students: Student[] = [
  { 
    id: "1", 
    name: "John Doe", 
    selectedCourses: ["CSE 101", "CSE 201", "CSE 301"],
    addedCourses: ["CSE 101", "CSE 201"], 
    droppedCourses: ["CSE 301"] 
  },
  { 
    id: "2", 
    name: "Jane Smith", 
    selectedCourses: ["CSE 102", "CSE 202"],
    addedCourses: ["CSE 102", "CSE 202"], 
    droppedCourses: ["CSE 302"] 
  },
  { 
    id: "3", 
    name: "Bob Johnson", 
    selectedCourses: ["CSE 103", "CSE 203", "CSE 303"],
    addedCourses: ["CSE 103", "CSE 203"], 
    droppedCourses: [] 
  },
];

interface StudentRegistrationTableProps {
  isRegistrationLocked: boolean
}

export function StudentRegistrationTable({ isRegistrationLocked }: StudentRegistrationTableProps) {
  return (
    <div className="student-registration-table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Selected Courses</TableHead>
            <TableHead>View Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.selectedCourses.join(", ")}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="btn-view">
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{student.name}'s Course Registration Details</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <h3 className="font-semibold mb-2">Selected Courses:</h3>
                      <ul>
                        {student.selectedCourses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                      <h3 className="font-semibold mt-4 mb-2">Added Courses:</h3>
                      <ul>
                        {student.addedCourses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                      <h3 className="font-semibold mt-4 mb-2">Dropped Courses:</h3>
                      <ul>
                        {student.droppedCourses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isRegistrationLocked && (
        <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
          Registration is currently locked. Students cannot modify their course selections.
        </div>
      )}
    </div>
  )
}