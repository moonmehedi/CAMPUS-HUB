"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ScholarshipApplication {
  name: string
  applicationId: string
  submissionDate: string
  status: "Pending" | "Verified" | "Forwarded to Admin" | "Approved" | "Rejected by Admin"
  details: string
}

const initialApplications: ScholarshipApplication[] = [
  {
    name: "Alice Smith",
    applicationId: "Q-1001",
    submissionDate: "12/10/24",
    status: "Forwarded to Admin",
    details: "Alice is a promising student with excellent academic records.",
  },
  {
    name: "Bob Johnson",
    applicationId: "Q-1002",
    submissionDate: "13/10/24",
    status: "Forwarded to Admin",
    details: "Bob has shown exceptional skills in extracurricular activities.",
  },
  {
    name: "Charlie Brown",
    applicationId: "Q-1003",
    submissionDate: "14/10/24",
    status: "Forwarded to Admin",
    details: "Charlie comes from a low-income family and shows great potential.",
  },
  {
    name: "Diana Prince",
    applicationId: "Q-1004",
    submissionDate: "15/10/24",
    status: "Forwarded to Admin",
    details: "Diana has impressive leadership qualities.",
  },
  {
    name: "Ethan Hunt",
    applicationId: "Q-1005",
    submissionDate: "16/10/24",
    status: "Forwarded to Admin",
    details: "Ethan's application is still under initial review.",
  },
]

export function ScholarshipTable() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>(initialApplications)
  const [selectedApplication, setSelectedApplication] = useState<ScholarshipApplication | null>(null)

  const handleApprove = (applicationId: string) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) => (app.applicationId === applicationId ? { ...app, status: "Approved" } : app)),
    )
  }

  const handleReject = (applicationId: string) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.applicationId === applicationId ? { ...app, status: "Rejected by Admin" } : app,
      ),
    )
  }

  return (
    <>
      <div className="scholarship-table-container overflow-x-auto">
        <table className="w-full scholarship-table">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Application ID</th>
              <th className="px-4 py-2">Submission Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{application.name}</td>
                <td className="px-4 py-2">{application.applicationId}</td>
                <td className="px-4 py-2">{application.submissionDate}</td>
                <td className={`px-4 py-2 status-${application.status.toLowerCase().replace(" ", "-")}`}>
                  {application.status}
                </td>
                <td className="px-4 py-2">
                  <div className="scholarship-table-actions flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                      View
                    </Button>
                    {application.status === "Forwarded to Admin" && (
                      <>
                        <Button variant="default" size="sm" onClick={() => handleApprove(application.applicationId)}>
                          Approve
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleReject(application.applicationId)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedApplication?.name}'s Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>
              <strong>Application ID:</strong> {selectedApplication?.applicationId}
            </p>
            <p>
              <strong>Submission Date:</strong> {selectedApplication?.submissionDate}
            </p>
            <p>
              <strong>Status:</strong> {selectedApplication?.status}
            </p>
            <p>
              <strong>Details:</strong> {selectedApplication?.details}
            </p>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

