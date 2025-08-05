"use client"
import { useState, useEffect } from "react";
import { DashboardHeader } from "../Components/dashboard-header";
import { Sidebar } from "../Components/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MagnifyingGlassIcon, // This replaces SearchIcon
  CalendarIcon, 
  UserIcon, 
  ClockIcon 
} from "@heroicons/react/24/outline"; 

interface LeaveRequest {
  student_id: string;
  student_name: string;
  leave_date: string;
  class_period: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data: LeaveRequest[];
}

export default function LeaveRequestsPage() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function fetchLeaveRequests() {
      try {
        const response = await fetch("http://localhost:3000/leave/leave-requests", {
          credentials: "include",
        });
        const data: ApiResponse = await response.json();
        
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

  const filteredRequests = leaveRequests.filter((request) =>
    request.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-900">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pl-64">
          <DashboardHeader />
          <div className="container px-8 py-8 mx-auto max-w-7xl">
            {/* Header Section */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 
                             bg-clip-text text-transparent">
                  Leave Requests
                </h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-2 rounded-lg ${
                      view === 'grid' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    } transition-all duration-200`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-2 rounded-lg ${
                      view === 'list' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-gray-100 text-gray-600'
                    } transition-all duration-200`}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name..."
                  className="w-full md:w-96 pl-10 pr-4 py-3 rounded-xl border border-gray-200 
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition-all duration-200 bg-white shadow-sm
                           dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin"></div>
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
                  </div>
                </div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 bg-red-50 border border-red-100 text-red-700 rounded-xl shadow-sm"
                >
                  {error}
                </motion.div>
              ) : filteredRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center p-12 bg-white rounded-xl shadow-sm"
                >
                  <img
                    src="/empty-state.svg"
                    alt="No requests"
                    className="w-48 h-48 mx-auto mb-6 opacity-75"
                  />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No leave requests found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={view === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                  }
                >
                  {filteredRequests.map((request) => (
                    <motion.div
                      key={`${request.student_id}-${request.leave_date}-${request.class_period}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md 
                                transition-all duration-300 border border-gray-100 dark:border-gray-700
                                ${view === 'list' ? 'p-4' : 'p-6'}`}
                    >
                      <div className={view === 'list' ? "flex items-center justify-between" : ""}>
                        <div>
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <UserIcon className="h-5 w-5 text-blue-500" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                              {request.student_name}
                            </h2>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>ID: {request.student_id}</span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-300">
                              <ClockIcon className="h-4 w-4 mr-2" />
                              <span>{new Date(request.leave_date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            window.location.href = `/Users/Admin/Leave_requests/${request.student_id}`;
                          }}
                          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 
                                   hover:from-blue-600 hover:to-blue-700 text-white rounded-lg 
                                   transition-all duration-300 transform hover:-translate-y-0.5
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                   shadow-sm hover:shadow flex items-center justify-center space-x-2"
                        >
                          <span>View Details</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}