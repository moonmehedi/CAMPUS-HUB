import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InteractiveAttendanceSheet } from "./interactive-attendance-sheet"

interface Student {
  rollNumber: string
  name: string
  attendance: boolean[]
  remark: string
}

interface MainAttendanceSheetProps {
  courseName: string
  courseCode: string
  onClose: () => void
}

const generateStudents = (): Student[] => {
  return [
    { rollNumber: "202214003", name: "Abdullah Faisal", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214008", name: "Anika Tasnim", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214019", name: "Farzana Mozammel Samia", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214024", name: "Iftekhar Ul Islam", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214033", name: "Maisha Nanjeeba", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214039", name: "Md. Ariful Islam Khan", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214049", name: "Md. Nahul Rahman", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214055", name: "Md. Sabbir Hossain", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202114025", name: "G.M.Fahim Tazwar", attendance: Array(14).fill(true), remark: "No Remark" },
    { rollNumber: "202214048", name: "Mehedi Hasan Moon", attendance: Array(14).fill(false), remark: "Sick" }
  ];
};


export function MainAttendanceSheet({ courseName, courseCode, onClose }: MainAttendanceSheetProps) {
  const [students, setStudents] = useState(generateStudents())
  const [selectedClass, setSelectedClass] = useState<number | null>(null)

  const calculateAttendancePercentage = (attendance: boolean[]) => {
    const presentCount = attendance.filter(Boolean).length
    return ((presentCount / attendance.length) * 100).toFixed(2)
  }

  const updateAttendance = (updatedStudents: Student[]) => {
    setStudents(updatedStudents)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-7xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{courseName} ({courseCode}) - Attendance Sheet</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Name</TableHead>
                {Array.from({ length: 14 }, (_, i) => (
                  <TableHead key={i} className="text-center">
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedClass(i)}
                    >
                      Class-{i + 1}
                    </Button>
                  </TableHead>
                ))}
                <TableHead className="text-center">Attendance Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.rollNumber}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {student.attendance.map((present, index) => (
                    <TableCell key={index} className="text-center">
                      {present ? "P" : "A"}
                    </TableCell>
                  ))}
                  <TableCell className="text-center">
                    {calculateAttendancePercentage(student.attendance)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedClass !== null && (
          <InteractiveAttendanceSheet
            students={students}
            classIndex={selectedClass}
            onClose={() => setSelectedClass(null)}
            onUpdateAttendance={updateAttendance}
          />
        )}
      </div>
    </div>
  )
}

