'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, GraduationCap, Home, MessageCircle, MessagesSquare, ScrollText, Users2 } from 'lucide-react'

const navigation = [
  { name: "Campus Hub", href: "/", icon: Home },
  { name: "Notice", href: "/notice", icon: ScrollText },
  { name: "Exam Scheduler", href: "/exams", icon: Calendar },
  { name: "Course Registration", href: "/courses", icon: BookOpen },
  { name: "Scholarship", href: "/scholarship", icon: GraduationCap },
  { name: "Course Advisor", href: "/advisor", icon: Users2 },
  { name: "Leave Application", href: "/leave", icon: ScrollText },
  { name: "ChatBot", href: "/chat", icon: MessageCircle },
  { name: "Community Chat", href: "/community", icon: MessagesSquare },
]

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

