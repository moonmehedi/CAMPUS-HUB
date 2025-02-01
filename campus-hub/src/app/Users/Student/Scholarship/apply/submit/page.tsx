import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubmittedApplication() {
  // This data would typically come from your backend
  const applicationData = {
    studentName: "John Doe",
    applicationNo: "SCH2023001",
    submissionDate: "2023-05-15",
  }

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
        <Link href="/scholarship/view-application">
          <Button variant="outline">View Application</Button>
        </Link>
        <Link href="/scholarship/modify-application">
          <Button variant="outline">Modify Application</Button>
        </Link>
      </div>
    </div>
  )
}

