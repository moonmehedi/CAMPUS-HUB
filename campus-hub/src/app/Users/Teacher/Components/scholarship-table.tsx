"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

interface ScholarshipApplication {
  id: string
  name: string
  applicationId: string
  submissionDate: string
  status: "Pending" | "Verified" | "Forwarded to Admin" | "Rejected"
  details: string
}

const initialApplications: ScholarshipApplication[] = [
  {
    id: "1",
    name: "Alice Smith",
    applicationId: "Q-1001",
    submissionDate: "12/10/24",
    status: "Pending",
    details: "Application details for Alice Smith...",
  },
  {
    id: "2",
    name: "Bob Johnson",
    applicationId: "Q-1002",
    submissionDate: "13/10/24",
    status: "Pending",
    details: "Application details for Bob Johnson...",
  },
  {
    id: "3",
    name: "Charlie Brown",
    applicationId: "Q-1003",
    submissionDate: "14/10/24",
    status: "Pending",
    details: "Application details for Charlie Brown...",
  },
  {
    id: "4",
    name: "Diana Prince",
    applicationId: "Q-1004",
    submissionDate: "15/10/24",
    status: "Pending",
    details: "Application details for Diana Prince...",
  },
  {
    id: "5",
    name: "Ethan Hunt",
    applicationId: "Q-1005",
    submissionDate: "16/10/24",
    status: "Pending",
    details: "Application details for Ethan Hunt...",
  },
]

export function ScholarshipTable() {
  const [applications, setApplications] = useState<ScholarshipApplication[]>(initialApplications)
  const [selectedApplication, setSelectedApplication] = useState<ScholarshipApplication | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false)

  const handleView = (application: ScholarshipApplication) => {
    setSelectedApplication(application)
    setIsViewModalOpen(true)
  }

  const handleVerify = (application: ScholarshipApplication) => {
    setSelectedApplication(application)
    setIsVerifyModalOpen(true)
  }

  const confirmVerification = () => {
    if (selectedApplication) {
      const updatedApplications: ScholarshipApplication[] = applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: "Verified" as const } : app,
      );
      setApplications(updatedApplications);
      setIsVerifyModalOpen(false);
    }
  };
  
  const handleForward = (application: ScholarshipApplication) => {
    const updatedApplications: ScholarshipApplication[] = applications.map((app) =>
      app.id === application.id ? { ...app, status: "Forwarded to Admin" as const } : app,
    );
    setApplications(updatedApplications);
  };
  
  const handleReject = (application: ScholarshipApplication) => {
    const updatedApplications: ScholarshipApplication[] = applications.map((app) =>
      app.id === application.id ? { ...app, status: "Rejected" as const } : app,
    );
    setApplications(updatedApplications);
  };
  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-700 py-4">Name</TableHead>
            <TableHead className="font-semibold text-gray-700">Application ID</TableHead>
            <TableHead className="font-semibold text-gray-700">Submission Date</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <motion.tr
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <TableCell className="font-medium">{application.name}</TableCell>
              <TableCell className="text-gray-600">{application.applicationId}</TableCell>
              <TableCell className="text-gray-600">{application.submissionDate}</TableCell>
              <TableCell>
                <StatusBadge status={application.status} />
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-gray-100 transition-colors"
                    onClick={() => handleView(application)}
                  >
                    View
                  </Button>
                  
                  {application.status === "Pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                        onClick={() => handleVerify(application)}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleReject(application)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {application.status === "Verified" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => handleForward(application)}
                    >
                      Forward to Admin
                    </Button>
                  )}
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>

      <AnimatePresence>
        {(isViewModalOpen || isVerifyModalOpen) && (
          <Dialog 
            open={isViewModalOpen || isVerifyModalOpen} 
            onOpenChange={(open) => {
              setIsViewModalOpen(false)
              setIsVerifyModalOpen(false)
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {isViewModalOpen ? "Application Details" : "Verify Application"}
                  </DialogTitle>
                </DialogHeader>
                
                {isViewModalOpen && selectedApplication && (
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1 text-gray-500">Name</div>
                      <div className="col-span-2 font-medium">{selectedApplication.name}</div>
                    </div>
                    {/* Add similar grid layouts for other details */}
                  </div>
                )}

                {isVerifyModalOpen && (
                  <DialogDescription className="py-4">
                    Are you sure you want to verify this application?
                  </DialogDescription>
                )}

                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsViewModalOpen(false)
                      setIsVerifyModalOpen(false)
                    }}
                  >
                    Cancel
                  </Button>
                  {isVerifyModalOpen && (
                    <Button onClick={confirmVerification}>
                      Verify
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Verified: "bg-blue-50 text-blue-700 border-blue-200",
    "Forwarded to Admin": "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  }

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium border ${
      statusStyles[status as keyof typeof statusStyles]
    }`}>
      {status}
    </span>
  )
}