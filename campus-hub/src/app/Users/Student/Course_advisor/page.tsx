'use client'

import { useEffect, useState } from "react";
import { Sidebar } from "../Components/sidebar";
import { Header } from "../Components/header";
import { ProfileDrawer } from "../Components/profile-drawer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CourseAdvisorPage() {
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState([]);  // Courses for improvement
  const [courses1, setCourses1] = useState([]); // Courses with recommended exams
  const [CoursesData, setCoursesData] = useState([]); // Full course list with grades
  const [loading, setLoading] = useState(false);
  const [cgpaProgress, setCgpaProgress] = useState(0); // State for CGPA progress

  const goalCGPA = 3.00; // The target CGPA for the student

  // Function to fetch courses and calculate CGPA progress
  const fetchCourses = async () => {
    if (!studentId.trim()) return; // Prevent API call if input is empty
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/courses-to-improve/${studentId}`);
      const result = await response.json();

      if (result.success) {
        setCourses(result.data);
        calculateProgress(result.data); // Calculate progress based on courses data
      } else {
        console.error("Error fetching courses:", result.message);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }

    try {
      const response = await fetch(`http://localhost:3000/courses-to-exam/${studentId}`);
      const result = await response.json();

      if (result.success) {
        setCourses1(result.data);
      } else {
        console.error("Error fetching courses1:", result.message);
      }
    } catch (error) {
      console.error("Error fetching courses1:", error);
    }

    try {
      const response = await fetch(`http://localhost:3000/all-result/${studentId}`);
      const result = await response.json();

      if (result.success) {
        setCoursesData(result.data);
        calculateProgress(result.data); // Recalculate progress using the full course list
      } else {
        console.error("Error fetching courses2:", result.message);
      }
    } catch (error) {
      console.error("Error fetching courses2:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate CGPA Progress based on courses data
  const calculateProgress = (coursesData) => {
    let totalCredits = 0;
    let weightedGrades = 0;

    coursesData.forEach(course => {
      totalCredits += course.credit;
      weightedGrades += course.grade * course.credit;
    });

    const currentCGPA = weightedGrades / totalCredits;
    const progress = (currentCGPA / goalCGPA) * 100;
    setCgpaProgress(Math.min(progress, 100)); // Cap at 100%
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-100 m-4 rounded-3xl shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center bg-blue-100 py-2 rounded-lg">
                Automated Course Adviser
              </h1>
              <h2 className="text-xl mt-6 mb-4 text-center">
                Your CGPA Progress Towards Target
              </h2>

              {/* CGPA Progress Bar */}
              <div className="mb-6">
                <div className="text-center mb-2">Current CGPA Progress</div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${cgpaProgress}%` }}
                  />
                </div>
                <div className="text-center mt-2">{cgpaProgress.toFixed(2)}%</div>
              </div>
            </div>

            {/* Input Field for Student ID */}
            <div className="mb-6 flex justify-center">
              <input
                type="text"
                placeholder="Insert your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="border border-gray-400 rounded-lg px-4 py-2 w-64"
              />
              <Button 
                onClick={fetchCourses} 
                className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              >
                Fetch Courses
              </Button>
            </div>

            {/* First Table */}
            <h2 className="text-xl mt-6 mb-4 text-center">
                Courses You Can Do Better In
              </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Course Code</th>
                    <th className="px-4 py-2 text-left">Course Name</th>
                    <th className="px-4 py-2 text-left">Credit</th>
                    <th className="px-4 py-2 text-left">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">Loading...</td>
                    </tr>
                  ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={index}>
                        <td className="border-t px-4 py-2">{course.course_code}</td>
                        <td className="border-t px-4 py-2">{course.course_name}</td>
                        <td className="border-t px-4 py-2">{course.credit}</td>
                        <td className="border-t px-4 py-2">{course.grade}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <br />

            {/* Second Table with Recommended Exam Type */}
            <h2 className="text-xl mt-6 mb-4 text-center">
                Recommended Exams To Take
              </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white shadow-md rounded-lg">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Course Code</th>
                    <th className="px-4 py-2 text-left">Course Name</th>
                    <th className="px-4 py-2 text-left">Credit</th>
                    <th className="px-4 py-2 text-left">Grade</th>
                    <th className="px-4 py-2 text-left">Recommended Exam Type</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">Loading...</td>
                    </tr>
                  ) : courses1.length > 0 ? (
                    courses1.map((course1, index) => (
                      <tr key={index}>
                        <td className="border-t px-4 py-2">{course1.course_code}</td>
                        <td className="border-t px-4 py-2">{course1.course_name}</td>
                        <td className="border-t px-4 py-2">{course1.credit}</td>
                        <td className="border-t px-4 py-2">{course1.grade}</td>
                        <td className="border-t px-4 py-2">
                          {course1.grade === 0.00 ? "Retake" : "Improvement"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-4">No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <Link href={`/Users/Student/Exam_Scheduler`}>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg">
                 Exam Schedule
                </Button>
              </Link>
            </div>
          </main>

          <ProfileDrawer />
        </div>
      </div>
    </div>
  );
}
