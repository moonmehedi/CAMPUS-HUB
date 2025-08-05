'use client'

import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { ScholarshipTeacherView } from "../Components/scholarship-teacher-view"
import { motion } from "framer-motion"

export default function ScholarshipApplications() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <motion.main 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 pl-64"
        >
          <DashboardHeader />
          <div className="p-6">
            <ScholarshipTeacherView />
          </div>
        </motion.main>
      </div>
    </div>
  )
}