'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, GraduationCap, Home, MessageCircle, MessagesSquare, ScrollText, Users2 } from 'lucide-react'

const navigation = [
  { name: "Campus Hub", href: "/Users/Student/Home", icon: Home },
  { name: "Notice", href: "/Users/Student/Notice", icon: ScrollText },
  { name: "Exam Scheduler", href: "/Users/Student/Exam_Scheduler", icon: Calendar },
  { name: "Course Registration", href: "/Users/Student/Course_registration", icon: BookOpen },
  { name: "Scholarship", href: "/Users/Student/Scholarship", icon: GraduationCap },
  { name: "Course Advisor", href: "/Users/Student/Course_Advisor", icon: Users2 },
  { name: "Leave Application", href: "/Users/Student/Leave_Application", icon: ScrollText },
  { name: "ChatBot", href: "/Users/Student/Chatbot", icon: MessageCircle },
  { name: "Community Chat", href: "/Users/Student/Community_Chat", icon: MessagesSquare },
];

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-blue-50 border-r">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-900">Campus Hub</h2>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                pathname === item.href
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-900"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

