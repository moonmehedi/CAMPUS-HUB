import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InteractiveAttendanceSheet } from "./interactive-attendance-sheet";

const parseAttendanceData = (data) => {
  const students = [];
  const dateSet = new Set();

  data.attendance.forEach((entry) => {
    const parts = entry.split(", ");
    const student = {
      rollNumber: parts[0].split(":")[1],
      name: parts[1].split(":")[1].replace(/'/g, ""),
      attendance: {},
    };

    for (let i = 2; i < parts.length; i++) {
      const [classDate, status] = parts[i].split(":");
      student.attendance[classDate] = status;
      dateSet.add(classDate);
    }

    students.push(student);
  });

  return { students, dates: Array.from(dateSet).sort((a, b) => new Date(a) - new Date(b)) };
};

export function MainAttendanceSheet({ courseName, courseCode, onClose }) {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

//process the course code

const parts = courseCode.split("-");


// You can log or adjust the string if needed:
// e.g. replacing the dash with a space (if you need to display it somewhere)
const displayCourseCode = parts.join(" ");
// Extract the numeric portion from the course code
const processedCourseCode = parseInt(parts[1], 10);

console.log("Course Code:", processedCourseCode);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/attendance/course/${processedCourseCode}`);
        const data = await response.json();
        const { students, dates } = parseAttendanceData(data);
        setStudents(students);
        setDates(dates);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const calculateAttendancePercentage = (attendance) => {
    const presentCount = Object.values(attendance).filter((status) => status === "P").length;
    return ((presentCount / dates.length) * 100).toFixed(2);
  };

  const updateAttendance = (updatedStudents) => {
    setStudents(updatedStudents);
  };

  if (loading) {
    return <div className="text-center p-4">Loading attendance data...</div>;
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
                {dates.map((date) => (
                  <TableHead key={date} className="text-center">
                    <Button variant="ghost" onClick={() => setSelectedDate(date)}>
                      {date}
                    </Button>
                  </TableHead>
                ))}
                <TableHead className="text-center">Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.rollNumber}>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  {dates.map((date) => (
                    <TableCell key={date} className="text-center">
                      {student.attendance[date] || "A"}
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
        {selectedDate && (
          <InteractiveAttendanceSheet
            students={students}
            selectedDate={selectedDate}
            courseCode={processedCourseCode}
            onClose={() => setSelectedDate(null)}
            onUpdateAttendance={updateAttendance}
          />
        )}
      </div>
    </div>
  );
}
