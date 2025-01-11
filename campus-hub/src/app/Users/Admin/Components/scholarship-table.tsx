"use client"

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
                  <button className="btn btn-verify">Verify</button>
                  <button className="btn btn-forward">Forward</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

