'use client'

import { useEffect, useState } from "react"
import { StudentLayout } from "../Components/student-layout"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// Define the Attendance interface
interface Attendance {
  date: string;
  class_period: string;
  course_code: string;
  present: boolean | null;
  remark: string | null;
}

export default function AttendancePage() {
  const [studentId, setStudentId] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch attendance records
  const fetchAttendance = async () => {
    
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/courseadvisor/attendance`, { credentials: "include" });
      const result = await response.json();
      console.log(result.data);
      
      // Log the result to check if remark is correctly fetched
      console.log("API Response:", result);

      if (result.success) {
        setAttendanceRecords(result.data);
      } else {
        console.error("Error fetching attendance records:", result.message);
      }
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
    setLoading(false);
  };

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Attendance Tracker
          </h1>
          <p className="text-gray-600">
            View your class attendance records.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-[20px] p-6 shadow-lg mb-8">
          <div className="flex gap-4 items-center justify-center">
            
            <Button 
              onClick={fetchAttendance} 
              className="bg-[#60A3D9] hover:bg-[#4A90D9] text-white px-8 py-3 rounded-xl transition-all duration-200"
            >
              Fetch Attendance
            </Button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="bg-white rounded-[20px] p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Attendance Records
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Class Period</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Code</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Attendance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Remark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : attendanceRecords.length > 0 ? (
                  attendanceRecords.map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">{record.date}</td>
                      <td className="px-6 py-4">{record.class_period}</td>
                      <td className="px-6 py-4">{record.course_code}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          record.present === true
                            ? "bg-green-100 text-green-700"
                            : record.present === false
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                        }`}>
                          {record.present === true ? "Present" : record.present === false ? "Absent" : "Null"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          record.remark === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : record.remark === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                        }`}>
                          {record.remark || "Null"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
