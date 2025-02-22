"use client"

import { ScholarshipTable } from "./scholarship-table"
import { SearchBar } from "./search-bar"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

export function ScholarshipAdminView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 p-8"
    >
      <motion.header 
        className="scholarship-admin-header"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="scholarship-admin-title">Scholarship Management</h1>
          <div className="flex items-center space-x-2 text-white/80">
            <Clock className="w-5 h-5" />
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          className="stat-card"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-icon bg-indigo-100">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-title">Forwarded</span>
            <span className="stat-value text-indigo-600">5</span>
            <span className="stat-desc">Applications in review</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-icon bg-emerald-100">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-title">Approved</span>
            <span className="stat-value text-emerald-600">1</span>
            <span className="stat-desc">Successfully granted</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="stat-card"
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.2)"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="stat-icon bg-red-100">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-title">Rejected</span>
            <span className="stat-value text-red-600">1</span>
            <span className="stat-desc">Not qualified</span>
          </div>
        </motion.div>
      </div>

      <SearchBar />
      <ScholarshipTable />
    </motion.div>
  )
}