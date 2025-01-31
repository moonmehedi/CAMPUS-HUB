"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Correct way to get route params
import { DashboardHeader } from "../../Components/dashboard-header";
import { Sidebar } from "../../Components/sidebar";
import { LeaveRequestForm } from "../../Components/leave-request-form";

export default function LeaveRequestDetailPage() {
  const { student_id } = useParams(); // ✅ Get student_id from URL params

  const [leaveDetails, setLeaveDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!student_id) return;

    async function fetchLeaveDetails() {
      try {
        const response = await fetch(`http://localhost:3000/leave/leave-requests/${student_id}`);
        const data = await response.json();
        console.log("Fetched Leave Details:", data.data); // 🛠️ Add this line
        if (data.success) {
          setLeaveDetails(data.data);
        } else {
          setError(data.message || "Failed to fetch leave details.");
        }
        

      } catch (err) {
        setError("An error occurred while fetching leave details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaveDetails();
  }, [student_id]);

  if (loading) return <p className="text-center">Loading leave details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container py-8">
            <LeaveRequestForm leaveDetails={leaveDetails} />
          </div>
        </main>
      </div>
    </div>
  );
}
