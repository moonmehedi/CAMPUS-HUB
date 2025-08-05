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
  courseCode: string;
  selectedDate: string;
  onClose: () => void;
  onUpdateAttendance: (updatedStudents: Student[]) => void;
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
          `http://localhost:3000/attendance/by-date?courseCode=${courseCode}&date=${selectedDate}`,
          {
            credentials: "include", // ✅ Ensures session cookies are sent
          }
        );

        const data = await response.json();
        console.log("Fetched data:", data);
        
        if (!Array.isArray(data)) {
          console.error("Expected an array but got:", data);
          setStudents([]); // Prevents the undefined error
          return;
        }
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
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          students.map((s) => ({
            roll: s.rollNumber,
            name: s.name,
            date: selectedDate,
            present: s.attendance ? "P" : "A",
            courseCode: courseCode
          }))
        ),
      });
      onUpdateAttendance(students); // Pass updated students to the parent component
      onClose();
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  const get_date_and_period = (date: string): string => {
    const parts = date.split("-");
    return parts.slice(1).join("-");
  };

  const isEditable = () => {
    const today = new Date();
    const selected = new Date(get_date_and_period(selectedDate));
    console.log("Today:", today);
    console.log("Selected:", selected);
    const diffTime = Math.abs(today.getTime() - selected.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log("Diff days:", diffDays);
    return diffDays <= 377;
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
                    disabled={!isEditable()}
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
          <Button onClick={handleSave} disabled={!isEditable()}>Save Attendance</Button>
        </div>
      </div>
    </div>
  );
}
