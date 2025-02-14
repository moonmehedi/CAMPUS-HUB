import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Student {
  rollNumber: string;
  name: string;
  attendance: boolean;
  remark: string;
}

interface InteractiveAttendanceSheetProps {
  courseCode: string; // Course code passed as prop
  selectedDate: string;
  onClose: () => void;
  onUpdateAttendance: () => void;
}

export function InteractiveAttendanceSheet({
  courseCode,
  selectedDate,
  onClose,
  onUpdateAttendance,
}: InteractiveAttendanceSheetProps) {
  console.log("Selected date:", selectedDate);
  console.log("Course Code:", courseCode);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendanceForDate = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/attendance/by-date?courseCode=${courseCode}&date=${selectedDate}`
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        
        // Process the fetched data:
        // 1. Set remark to "No remark" if it's empty.
        // 2. Sort the students by their roll number.
        const processedData = data
          .map((student: Student) => ({
            ...student,
            remark: student.remark.trim() === "" ? "No remark" : student.remark,
          }))
          .sort((a: Student, b: Student) => parseInt(a.rollNumber) - parseInt(b.rollNumber));

        setStudents(processedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceForDate();
  }, [courseCode, selectedDate]);

  const handleAttendanceChange = (index: number, isPresent: boolean) => {
    const updatedStudents = students.map((student, i) =>
      i === index ? { ...student, attendance: isPresent } : student
    );
    setStudents(updatedStudents);
  };

  const handleSave = async () => {
    try {
      await fetch("http://localhost:3000/attendance/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          students.map((s) => ({
            roll: s.rollNumber,
            name: s.name,
            date: selectedDate,
            present: s.attendance ? "P" : "A",
            courseCode:courseCode
          }))
        ),
      });
      onUpdateAttendance();
      onClose();
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading attendance...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Attendance for {selectedDate}</h2>
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
            {students.map((student, index) => (
              <TableRow key={student.rollNumber}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <select
                    onChange={(e) =>
                      handleAttendanceChange(index, e.target.value === "present")
                    }
                    value={student.attendance ? "present" : "absent"}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </TableCell>
                <TableCell>{student.remark}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-end">
          <Button onClick={handleSave}>Save Attendance</Button>
        </div>
      </div>
    </div>
  );
}
