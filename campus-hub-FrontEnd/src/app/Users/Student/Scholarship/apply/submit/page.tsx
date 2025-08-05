"use client"
import { StudentLayout } from "../../../Components/student-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react" // Import the check icon

export function SubmittedApplication() {
  // Using the provided current date and user
  const applicationData = {
    studentName: "maisha27",
    applicationNo: "SCH2025001",
    submissionDate: "2025-02-01 09:51:56",
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-8 px-4">
      {/* Success Icon and Message */}
      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Application Submitted Successfully!
        </h2>
        <p className="text-gray-600">
          Your scholarship application has been received and is being processed.
        </p>
      </div>

      {/* Application Details Card */}
      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4 border-b pb-2">
          Application Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Student Name</span>
            <span className="font-medium text-gray-800">{applicationData.studentName}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Application No</span>
            <span className="font-medium text-gray-800">{applicationData.applicationNo}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Submission Date</span>
            <span className="font-medium text-gray-800">{applicationData.submissionDate}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link href="/Users/Student/Scholarship/view-application">
          <Button 
            variant="outline" 
            className="h-11 px-6 text-base border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            View Application
          </Button>
        </Link>
        <Link href="/Users/Student/Scholarship/modify-application">
          <Button 
            variant="outline"
            className="h-11 px-6 text-base border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
          >
            Modify Application
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function SubmitPage() {
  return (
    <StudentLayout>
      <div className="p-6">
        <SubmittedApplication />
      </div>
    </StudentLayout>
  )
}