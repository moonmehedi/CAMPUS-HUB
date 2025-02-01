"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SubmittedApplication() {
  const [applicationData, setApplicationData] = useState({
    studentName: "",
    applicationNo: "",
    submissionDate: "",
  })

  useEffect(() => {
    // This would typically be an API call to fetch the application data
    const fetchApplicationData = async () => {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setApplicationData({
        studentName: "John Doe",
        applicationNo: "SCH" + Math.floor(1000000 + Math.random() * 9000000),
        submissionDate: new Date().toISOString().split('T')[0],
      })
    }

    fetchApplicationData()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">You have submitted the scholarship application form</h2>
      <table className="w-full mb-4">
        <tbody>
          <tr>
            <td className="font-medium">Student Name:</td>
            <td>{applicationData.studentName}</td>
          </tr>
          <tr>
            <td className="font-medium">Application No:</td>
            <td>{applicationData.applicationNo}</td>
          </tr>
          <tr>
            <td className="font-medium">Submission Date:</td>
            <td>{applicationData.submissionDate}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex gap-4">
        <Link href="/Users/Student/Scholarship/apply/submit/view_app">
          <Button variant="outline">View Application</Button>
        </Link>
        <Link href="/Users/Student/Scholarship/apply/submit/modify">
          <Button variant="outline">Modify Application</Button>
        </Link>
      </div>
    </div>
  )
}