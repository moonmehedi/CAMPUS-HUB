"use client"

interface ScholarshipApplication {
  name: string
  applicationId: string
  submissionDate: string
  status: string
}

const applications: ScholarshipApplication[] = [
  { name: "Alice Smith", applicationId: "Q-1001", submissionDate: "12/10/24", status: "Verified" },
  { name: "Bob Johnson", applicationId: "Q-1002", submissionDate: "13/10/24", status: "Verified" },
  { name: "Charlie Brown", applicationId: "Q-1003", submissionDate: "14/10/24", status: "Verified" },
  { name: "Diana Prince", applicationId: "Q-1004", submissionDate: "15/10/24", status: "Verified" },
  { name: "Ethan Hunt", applicationId: "Q-1005", submissionDate: "16/10/24", status: "Verified" },
  { name: "Fiona Gallagher", applicationId: "Q-1006", submissionDate: "17/10/24", status: "Verified" },
  { name: "George Bailey", applicationId: "Q-1007", submissionDate: "18/10/24", status: "Verified" },
  { name: "Hannah Montana", applicationId: "Q-1008", submissionDate: "19/10/24", status: "Verified" },
  { name: "Ian Malcolm", applicationId: "Q-1009", submissionDate: "20/10/24", status: "Verified" },
  { name: "Jane Doe", applicationId: "Q-1010", submissionDate: "21/10/24", status: "Verified" },
];

console.log(applications);


export function ScholarshipTable() {
  return (
    <div className="scholarship-table-container">
      <table className="scholarship-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Application ID</th>
            <th>Submission Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={index}>
              <td>{application.name}</td>
              <td>{application.applicationId}</td>
              <td>{application.submissionDate}</td>
              <td>{application.status}</td>
              <td>
                <div className="scholarship-table-actions">
                  <button className="btn btn-view">View</button>
                  <button className="btn btn-verify">Approve</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

