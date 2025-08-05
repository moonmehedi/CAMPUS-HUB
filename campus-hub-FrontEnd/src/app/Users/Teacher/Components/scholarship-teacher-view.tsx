import { ScholarshipTable } from "./scholarship-table"
import { SearchBar } from "./search-bar"
import { motion } from "framer-motion"

export function ScholarshipTeacherView() {
  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2 }
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <header className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 tracking-tight"
        >
          Scholarship Admin View
        </motion.h1>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Application Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <motion.div 
            custom={0}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg border border-indigo-200 transform transition-all hover:shadow-lg"
          >
            <span className="block text-indigo-800 font-medium mb-2">Forwarded</span>
            <span className="text-3xl font-bold text-indigo-900">5</span>
          </motion.div>

          <motion.div 
            custom={1}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 transform transition-all hover:shadow-lg"
          >
            <span className="block text-green-800 font-medium mb-2">Approved</span>
            <span className="text-3xl font-bold text-green-900">1</span>
          </motion.div>

          <motion.div 
            custom={2}
            variants={statsVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border border-red-200 transform transition-all hover:shadow-lg"
          >
            <span className="block text-red-800 font-medium mb-2">Rejected</span>
            <span className="text-3xl font-bold text-red-900">1</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <SearchBar />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <ScholarshipTable />
      </motion.div>
    </motion.div>
  )
}