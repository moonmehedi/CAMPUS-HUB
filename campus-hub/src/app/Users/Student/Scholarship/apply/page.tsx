"use client"

import { StudentLayout } from "../../Components/student-layout"
import { SearchBar } from "../../Components/search-bar"
import { ScholarshipForm } from "../../Components/scholarship-form"
import { useRouter } from "next/navigation"
import "../scholarship-application.css"

export default function ApplyScholarshipPage() {
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    console.log(data)
    // Here you would typically send the data to your backend
    // For now, we'll just simulate a successful submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/Users/Student/Scholarship/apply/submit");
  }

  return (
    <StudentLayout>
      <div className="p-8 space-y-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Search Section */}
          <div className="flex gap-4 w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search scholarships..."
                className="w-full h-12 px-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <button 
              className="h-12 px-6 text-lg bg-[#60A3D9] hover:bg-[#4A90D9] text-white rounded-lg transition-colors duration-200"
            >
              Search
            </button>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Scholarship Application Form
            </h1>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <ScholarshipForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}