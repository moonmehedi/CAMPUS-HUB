"use client"
import { useState, useEffect } from "react";
import { DashboardHeader } from "../Components/dashboard-header";
import { Sidebar } from "../Components/sidebar";

export default function LeaveRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        const response = await fetch("http://localhost:3000/leave/leave-requests"); 
        const data = await response.json();

        if (data.success) {
          setLeaveRequests(data.data);
        } else {
          setError(data.message || "Failed to fetch leave requests.");
        }
      } catch (err) {
        setError("An error occurred while fetching leave requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaveRequests();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">Leave Requests</h1>
            {loading ? (
              <p className="text-center">Loading leave requests...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : leaveRequests.length === 0 ? (
              <p className="text-center">No leave requests found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaveRequests.map((request) => (
                  <div
                    key={`${request.student_id}-${request.leave_date}-${request.class_period}`}
                    className="p-4 bg-white shadow rounded"
                  >
                    <h2 className="text-lg font-semibold">{request.student_name}</h2>
                    <p>Student ID: {request.student_id}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                      onClick={() =>
                        window.location.href = `/Users/Admin/Leave_requests/${request.student_id}`

                        //window.location.href = `/Users/Admin/Leave-requests/[student_id]}`
                        // window.location.href = `/Leave-requests/${request.student_id}`
                      }
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
