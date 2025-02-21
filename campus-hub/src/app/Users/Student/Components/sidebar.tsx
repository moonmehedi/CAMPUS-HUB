'use client'

import Link from "next/link"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, Calendar, GraduationCap, Home, MessageCircle, MessagesSquare, ScrollText, Users2 } from 'lucide-react'

const navigation = [
  { name: "Home", href: "/Users/Student/Home", icon: Home },
  { name: "Notice", href: "/Users/Student/Notice", icon: ScrollText },
  { name: "Exam Scheduler", href: "/Users/Student/Exam_Scheduler", icon: Calendar },
  { name: "Course Registration", href: "/Users/Student/Course_registration", icon: BookOpen },
  { name: "Scholarship", href: "/Users/Student/Scholarship", icon: GraduationCap },
  { name: "Course advisor", href: "/Users/Student/Course_advisor", icon: Users2 },
  { name: "Leave Application", href: "/Users/Student/Leave_Application", icon: ScrollText },
  { name: "ChatBot", href: "/Users/Student/Chatbot", icon: MessageCircle },
  { name: "Community Chat", href: "/Users/Student/community-chat", icon: MessagesSquare },
];

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64">
      <div className="p-6 flex items-center gap-3">
        {/* Add your icon here */}
        <img 
          src="/images/icon.svg"
          alt=""
          className="w-8 h-8"
        />
        <h2 className="text-2xl font-bold text-black">Campus Hub</h2>
      </div>
      <nav className="flex-1 space-y-1 px-4">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                pathname === item.href
                  ? "bg-white/20 text-black"
                  : "text-black/70 hover:bg-white/20 hover:text-black"
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