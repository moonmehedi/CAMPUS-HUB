'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const roles = [
  {
    title: 'Student',
    image: '/images/student.jpg',
    href: '/Users/Student/Login'
  },
  {
    title: 'Teacher',
    image: '/images/teacher.png',
    href: '/Users/Teacher/Login'
  },
  {
    title: 'Admin',
    image: '/images/admin.jpg',
    href: '/Users/Admin/Login'
  }
]

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex flex-col justify-center items-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        <motion.div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-4"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h1 className="text-3xl font-bold text-white text-center">Welcome to Campus Hub</h1>
        </motion.div>
        <div className="p-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 text-center mb-8"
          >
            Please select your role to continue:
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Link 
                  href={role.href}
                  className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl transition-all duration-300 ease-in-out h-full"
                >
                  <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-cyan-500 relative">
                    <Image
                      src={role.image}
                      layout="fill"
                      objectFit="cover"
                      alt={role.title}
                      className="transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-cyan-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 0.2 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <motion.h2 
                    className="text-xl font-semibold text-gray-800 group-hover:text-cyan-600 transition-colors duration-300 ease-in-out"
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {role.title}
                  </motion.h2>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

