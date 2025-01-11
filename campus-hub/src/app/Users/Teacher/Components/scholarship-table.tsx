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

const applications: ScholarshipApplication[] = [
  { name: "Alice Smith", applicationId: "Q-1001", submissionDate: "12/10/24", status: "Pending" },
  { name: "Bob Johnson", applicationId: "Q-1002", submissionDate: "13/10/24", status: "Pending" },
  { name: "Charlie Brown", applicationId: "Q-1003", submissionDate: "14/10/24", status: "Pending" },
  { name: "Diana Prince", applicationId: "Q-1004", submissionDate: "15/10/24", status: "Pending" },
  { name: "Ethan Hunt", applicationId: "Q-1005", submissionDate: "16/10/24", status: "Pending" },
  { name: "Fiona Gallagher", applicationId: "Q-1006", submissionDate: "17/10/24", status: "Pending" },
  { name: "George Bailey", applicationId: "Q-1007", submissionDate: "18/10/24", status: "Pending" },
  { name: "Hannah Montana", applicationId: "Q-1008", submissionDate: "19/10/24", status: "Pending" },
  { name: "Ian Malcolm", applicationId: "Q-1009", submissionDate: "20/10/24", status: "Pending" },
  { name: "Jane Doe", applicationId: "Q-1010", submissionDate: "21/10/24", status: "Pending" },
];

export function ScholarshipTable() {
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
                  <Button variant="secondary" size="sm" className="action-button forward-button">
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
