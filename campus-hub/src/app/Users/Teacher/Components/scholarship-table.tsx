"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface ScholarshipApplication {
  name: string
  applicationId: string
  submissionDate: string
  status: string
}

const applications: ScholarshipApplication[] = Array(10).fill({
  name: "John Doe",
  applicationId: "Q-1001",
  submissionDate: "12/10/24",
  status: "Pending"
})

export function ScholarshipTable() {
  return (
    <div className="scholarship-table-container">
      <Table className="scholarship-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Application ID</TableHead>
            <TableHead>Submission Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application, index) => (
            <TableRow key={index}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.applicationId}</TableCell>
              <TableCell>{application.submissionDate}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                <div className="action-buttons">
                  <Button variant="secondary" size="sm" className="action-button view-button">
                    View
                  </Button>
                  <Button variant="secondary" size="sm" className="action-button verify-button">
                    Verify
                  </Button>
                  <Button variant="destructive" size="sm" className="action-button forward-button">
                    Forward
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

