"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, GraduationCap, Home, LogOut, ScrollText, MessageCircle } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Campus Hub",
    icon: Home,
    href: "/Users/Student/Home",
  },
  {
    title: "Notice",
    icon: ScrollText,
    href: "/Users/Student/Notice",
  },
  {
    title: "Course Registration",
    icon: BookOpen,
    href: "/Users/Student/Course_registration",
  },
  {
    title: "Scholarship",
    icon: GraduationCap,
    href: "/Users/Student/Scholarship",
  },
  {
    title: "TrainBot",
    icon: MessageCircle,
    href: "/Users/Student/TrainBot",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-gradient-to-b from-[#003B73] to-[#60A3D9] text-white">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center p-6">
          <Home className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Campus Hub</h1>
        </div>
        <div className="flex-1 space-y-12 p-4">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-lg px-3 py-3 text-base font-medium hover:bg-white/10",
                  pathname === item.href ? "bg-white/10" : "transparent"
                )}
              >
                <item.icon className="mr-3 h-7 w-7" />
                {item.title}
              </span>
            </Link>
          ))}
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
    </aside>
  )
}

