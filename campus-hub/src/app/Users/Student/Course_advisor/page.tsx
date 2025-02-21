'use client'

import { useEffect, useState } from "react"
import { StudentLayout } from "../Components/student-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, TrendingUp, FileCheck } from "lucide-react"

// Define the Course interface
interface Course {
  course_code: string;
  course_name: string;
  credit: number;
  grade: number;
}

export default function CourseAdvisorPage() {
  const [studentId, setStudentId] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [courses1, setCourses1] = useState<Course[]>([]);
  const [CoursesData, setCoursesData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [cgpaProgress, setCgpaProgress] = useState(0);

  const goalCGPA = 3.00;

  
  // Function to fetch courses and calculate CGPA progress
  const fetchCourses = async () => {
    if (!studentId.trim()) return; // Prevent API call if input is empty
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/courseadvisor/courses-to-improve/${studentId}`,{ credentials: "include",});
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
      const response = await fetch(`http://localhost:3000/courses-to-exam/${studentId}`,{ credentials: "include",});
      //const response = await fetch(`http://localhost:3000/courseadvisor/courses-to-exam/${studentId}`);
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
      const response = await fetch(`http://localhost:3000/courseadvisor/all-result/${studentId}`,{ credentials: "include",});
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

  // Add type annotation to the calculateProgress function parameters
  
  // Calculate CGPA Progress based on courses data
  const calculateProgress = (coursesData: Course[]) => {
    let totalCredits = 0;
    let weightedGrades = 0;

    coursesData.forEach((course: Course) => {
      totalCredits += course.credit;
      weightedGrades += course.grade * course.credit;
    });

    const currentCGPA = weightedGrades / totalCredits;
    const progress = (currentCGPA / goalCGPA) * 100;
    setCgpaProgress(Math.min(progress, 100));
  };


  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Automated Course Adviser
          </h1>
          <p className="text-gray-600">
            Track your academic progress and get personalized course recommendations
          </p>
        </div>

        {/* CGPA Progress Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-lg mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            CGPA Progress Towards Target
          </h2>
          <div className="w-full bg-gray-100 rounded-full h-6 mb-2">
            <div
              className="bg-[#60A3D9] h-6 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${cgpaProgress}%` }}
            >
              <div className="h-full flex items-center justify-end">
                <span className="text-white text-sm px-3">
                  {cgpaProgress.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            Target CGPA: {goalCGPA.toFixed(2)}
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-[20px] p-6 shadow-lg mb-8">
          <div className="flex gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Enter your student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <Button 
              onClick={fetchCourses} 
              className="bg-[#60A3D9] hover:bg-[#4A90D9] text-white px-8 py-3 rounded-xl transition-all duration-200"
            >
              Fetch Courses
            </Button>
          </div>
        </div>

        {/* Course Tables */}
        <div className="grid gap-8 mb-8">
          {/* Improvement Courses Table */}
          <div className="bg-white rounded-[20px] p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-[#60A3D9]" />
              <h2 className="text-xl font-semibold text-gray-800">
                Courses You Can Do Better In
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Credit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : courses.length > 0 ? (
                    courses.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{course.course_code}</td>
                        <td className="px-6 py-4">{course.course_name}</td>
                        <td className="px-6 py-4">{course.credit}</td>
                        <td className="px-6 py-4">{course.grade}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Exams Table */}
          <div className="bg-white rounded-[20px] p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <FileCheck className="h-6 w-6 text-[#60A3D9]" />
              <h2 className="text-xl font-semibold text-gray-800">
                Recommended Exams To Take
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Credit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Recommended Exam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        Loading...
                      </td>
                    </tr>
                  ) : courses1.length > 0 ? (
                    courses1.map((course1, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">{course1.course_code}</td>
                        <td className="px-6 py-4">{course1.course_name}</td>
                        <td className="px-6 py-4">{course1.credit}</td>
                        <td className="px-6 py-4">{course1.grade}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            course1.grade === 0.00 
                              ? "bg-red-100 text-red-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {course1.grade === 0.00 ? "Retake" : "Improvement"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                        No courses found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link href="/Users/Student/Exam_Scheduler">
            <Button className="bg-[#60A3D9] hover:bg-[#4A90D9] text-white px-8 py-3 rounded-xl transition-all duration-200">
              View Exam Schedule
            </Button>
          </Link>
        </div>
      </div>
    </StudentLayout>
  )
}