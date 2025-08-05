"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DashboardHeader } from "../../Components/dashboard-header";
import { Sidebar } from "../../Components/sidebar";
import { LeaveRequestForm } from "../../Components/leave-request-form";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

interface LeaveRequest {
  student_id: string;
  student_name: string;
  leave_date: string;
  class_period: string;
  dept: string;
  course_code: string;
  reason: string;
  document?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: LeaveRequest;
}

export default function LeaveRequestDetailPage() {
  const params = useParams();
  const student_id = params?.student_id as string;
  
  const [leaveDetails, setLeaveDetails] = useState<LeaveRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!student_id) return;

    async function fetchLeaveDetails() {
      try {
        const response = await fetch(
          `http://localhost:3000/leave/leave-requests/${student_id}`,
          { credentials: "include" }
        );
        
        const data: ApiResponse = await response.json();
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

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container px-8 py-8 mx-auto max-w-6xl">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5 mr-1" />
                Back to Leave Requests
              </button>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                  <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                </div>
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-50 border border-red-100 text-red-700 rounded-xl shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Header Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                                   bg-clip-text text-transparent mb-2">
                        Leave Request Details
                      </h1>
                      <p className="text-gray-500 dark:text-gray-400">
                        Viewing details for Student ID: {student_id}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
                >
                  {leaveDetails && <LeaveRequestForm leaveDetails={leaveDetails} />}
                </motion.div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}