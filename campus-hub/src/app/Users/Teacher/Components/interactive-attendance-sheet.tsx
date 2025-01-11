import { useState } from "react"
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  rollNumber: string
  name: string
  attendance: boolean[]
  remark: string
}

interface InteractiveAttendanceSheetProps {
  students: Student[]
  classIndex: number
  onClose: () => void
  onUpdateAttendance: (updatedStudents: Student[]) => void
}

export function InteractiveAttendanceSheet({ 
  students, 
  classIndex, 
  onClose, 
  onUpdateAttendance 
}: InteractiveAttendanceSheetProps) {
  const [localStudents, setLocalStudents] = useState(students)

  const handleAttendanceChange = (studentIndex: number, isPresent: boolean) => {
    const updatedStudents = localStudents.map((student, index) => {
      if (index === studentIndex) {
        const newAttendance = [...student.attendance]
        newAttendance[classIndex] = isPresent
        return { ...student, attendance: newAttendance }
      }
      return student
    })
    setLocalStudents(updatedStudents)
  }

  const handleSave = () => {
    onUpdateAttendance(localStudents)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Class-{classIndex + 1} Attendance</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localStudents.map((student, index) => (
              <TableRow key={student.rollNumber}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <select
                    onChange={(e) => {
                      const isPresent = e.target.value === 'present';
                      handleAttendanceChange(index, isPresent);
                    }}
                    value={student.attendance[classIndex] ? 'present' : 'absent'}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </TableCell>
                <TableCell>{student.remark || "No Remark"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave}>Save Attendance</Button>
        </div>
      </div>
    </div>
  )
}

