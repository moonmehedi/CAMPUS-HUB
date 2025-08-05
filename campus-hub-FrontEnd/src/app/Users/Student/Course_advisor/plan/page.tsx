'use client'

import { StudentLayout } from "../../Components/student-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, ArrowUp, RefreshCw } from "lucide-react" // Import icons for better UI

export default function PlanPage() {
  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Automated Course Adviser
          </h1>
          <p className="text-gray-600 text-lg">
            This term, you need to attend the following exams for retake or improvement.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid gap-8 mb-8">
          {/* Retake Section */}
          <div className="bg-white rounded-[20px] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <RefreshCw className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Retake Courses
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Credit Hour</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">DSA</td>
                    <td className="px-6 py-4">CSE-205</td>
                    <td className="px-6 py-4">3.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                        1.00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Improvement Section */}
          <div className="bg-white rounded-[20px] p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ArrowUp className="h-6 w-6 text-[#60A3D9]" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Improvement Courses
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Course Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Credit Hour</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">Compiler</td>
                    <td className="px-6 py-4">CSE-305</td>
                    <td className="px-6 py-4">3.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        2.75
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">Computer Architecture</td>
                    <td className="px-6 py-4">CSE-219</td>
                    <td className="px-6 py-4">3.00</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        3.00
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

         {/* Modified Action Button */}
         <div className="flex justify-center items-center mt-12 mb-6">
          <Link href="/Users/Student/Home">
            <Button className="bg-[#60A3D9] hover:bg-[#4A90D9] text-white px-12 py-4 rounded-xl transition-all duration-200 flex items-center gap-3 text-lg font-medium transform hover:scale-105">
              <BookOpen className="h-6 w-6" />
              View Exam Schedule
            </Button>
          </Link>
        </div>
      </div>
    </StudentLayout>
  )
}