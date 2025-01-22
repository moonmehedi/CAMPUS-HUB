"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
    <div className="scholarship-table-container">
      <Table className="scholarship-table">
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Application ID</TableHead>
            <TableHead className="font-semibold">Submission Date</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.applicationId}</TableCell>
              <TableCell>{application.submissionDate}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="action-button view-button"
                    onClick={() => handleView(application)}
                  >
                    View
                  </Button>
                  {application.status === "Pending" && (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="action-button verify-button"
                        onClick={() => handleVerify(application)}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="action-button forward-button"
                        onClick={() => handleReject(application)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {application.status === "Verified" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      className="action-button forward-button"
                      onClick={() => handleForward(application)}
                    >
                      Forward to Admin
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {selectedApplication && (
              <div>
                <p>
                  <strong>Name:</strong> {selectedApplication.name}
                </p>
                <p>
                  <strong>Application ID:</strong> {selectedApplication.applicationId}
                </p>
                <p>
                  <strong>Submission Date:</strong> {selectedApplication.submissionDate}
                </p>
                <p>
                  <strong>Status:</strong> {selectedApplication.status}
                </p>
                <p>
                  <strong>Details:</strong> {selectedApplication.details}
                </p>
              </div>
            )}
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>Are you sure you want to verify this application?</DialogDescription>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsVerifyModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmVerification}>Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

