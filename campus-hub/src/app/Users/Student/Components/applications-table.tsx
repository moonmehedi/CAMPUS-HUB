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

interface Application {
  name: string
  applicationId: string
  submissionDate: string
  status: string
}

const applications: Application[] = Array(12).fill({
  name: "John Doe",
  applicationId: "Q-1001",
  submissionDate: "12/10/24",
  status: "Pending"
})

export function ApplicationsTable() {
  return (
    <div className="applications-table-container">
      <Table>
        <TableHeader className="bg-blue-50">
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
            <TableRow key={index} className={index % 2 === 0 ? "bg-blue-50" : ""}>
              <TableCell>{application.name}</TableCell>
              <TableCell>{application.applicationId}</TableCell>
              <TableCell>{application.submissionDate}</TableCell>
              <TableCell>{application.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700"
                  >
                    View
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700"
                  >
                    Approve
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

