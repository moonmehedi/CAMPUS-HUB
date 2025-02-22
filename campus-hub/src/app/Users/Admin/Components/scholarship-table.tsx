"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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
      <motion.div 
        className="scholarship-table-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full scholarship-table">
          <thead>
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Application ID</th>
              <th className="px-6 py-4">Submission Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {applications.map((application, index) => (
                <motion.tr
                  key={application.applicationId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <td className="px-6 py-4 font-medium">{application.name}</td>
                  <td className="px-6 py-4">{application.applicationId}</td>
                  <td className="px-6 py-4">{application.submissionDate}</td>
                  <td className="px-6 py-4">
                    <span className={`status-${application.status.toLowerCase().replace(" ", "-")}`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="scholarship-table-actions flex space-x-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedApplication(application)}
                        className="hover:bg-gray-100"
                      >
                        View
                      </Button>
                      {application.status === "Forwarded to Admin" && (
                        <>
                          <Button 
                            variant="default" 
                            size="sm" 
                            onClick={() => handleApprove(application.applicationId)}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Approve
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleReject(application.applicationId)}
                            className="bg-rose-600 hover:bg-rose-700"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="scholarship-dialog">
          <div className="dialog-container">
            <div className="dialog-header sticky top-0 z-10">
              <h2 className="text-xl font-semibold">Scholarship Application Details</h2>
            </div>
            <div className="dialog-scrollable-content">
              <div className="dialog-field">
                <span className="dialog-label">Applicant Name</span>
                <div className="dialog-value">{selectedApplication?.name}</div>
              </div>
              
              <div className="dialog-field">
                <span className="dialog-label">Application ID</span>
                <div className="dialog-value">{selectedApplication?.applicationId}</div>
              </div>
              
              <div className="dialog-field">
                <span className="dialog-label">Submission Date</span>
                <div className="dialog-value">{selectedApplication?.submissionDate}</div>
              </div>
              
              <div className="dialog-field">
                <span className="dialog-label">Status</span>
                <div className="dialog-value">
                  <span className={`status-badge status-${selectedApplication?.status.toLowerCase().replace(" ", "-")}`}>
                    {selectedApplication?.status}
                  </span>
                </div>
              </div>
              
              <div className="dialog-field">
                <span className="dialog-label">Application Details</span>
                <div className="dialog-message">
                  {selectedApplication?.details}
                </div>
              </div>

              {selectedApplication?.status === "Forwarded to Admin" && (
                <div className="dialog-actions">
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleReject(selectedApplication.applicationId)
                        setSelectedApplication(null)
                      }}
                      className="bg-white hover:bg-red-50 text-red-600 border-red-200"
                    >
                      Reject Application
                    </Button>
                    <Button
                      onClick={() => {
                        handleApprove(selectedApplication.applicationId)
                        setSelectedApplication(null)
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Approve Application
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}