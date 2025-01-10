import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

interface AttendanceSheetProps {
  courseName: string
  courseCode: string
  onClose: () => void
}

interface Student {
  id: string
  name: string
  attendance: boolean[]
  remark: string
}

const generateMockStudents = (count: number): Student[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `ST${(i + 1).toString().padStart(3, '0')}`,
    name: `Student ${i + 1}`,
    attendance: Array.from({ length: 14 }, () => Math.random() > 0.2),
    remark: ''
  }))
}

export function AttendanceSheet({ courseName, courseCode, onClose }: AttendanceSheetProps) {
  const [students, setStudents] = useState(generateMockStudents(10))

  const handleAttendanceChange = (studentIndex: number, classIndex: number) => {
    setStudents(prevStudents => {
      const newStudents = [...prevStudents]
      newStudents[studentIndex] = {
        ...newStudents[studentIndex],
        attendance: [
          ...newStudents[studentIndex].attendance.slice(0, classIndex),
          !newStudents[studentIndex].attendance[classIndex],
          ...newStudents[studentIndex].attendance.slice(classIndex + 1)
        ]
      }
      return newStudents
    })
  }

  const handleRemarkChange = (studentIndex: number, remark: string) => {
    setStudents(prevStudents => {
      const newStudents = [...prevStudents]
      newStudents[studentIndex] = { ...newStudents[studentIndex], remark }
      return newStudents
    })
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
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                {Array.from({ length: 14 }, (_, i) => (
                  <TableHead key={i} className="w-[50px] text-center">C{i + 1}</TableHead>
                ))}
                <TableHead className="w-[200px]">Remark</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, studentIndex) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {student.attendance.map((present, classIndex) => (
                    <TableCell key={classIndex} className="text-center">
                      <input
                        type="checkbox"
                        checked={present}
                        onChange={() => handleAttendanceChange(studentIndex, classIndex)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Input
                      value={student.remark}
                      onChange={(e) => handleRemarkChange(studentIndex, e.target.value)}
                      placeholder="Add remark"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

