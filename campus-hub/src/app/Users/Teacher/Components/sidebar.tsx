"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Calendar, GraduationCap, Grid, LogOut, ScrollText, Users, UserSquare2 } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Campus Hub",
    icon: Grid,
    href: "/",
  },
  {
    title: "Notice",
    icon: ScrollText,
    href: "/notice",
  },
  {
    title: "Exam Scheduler",
    icon: Calendar,
    href: "/exam",
  },
  {
    title: "Course Registration",
    icon: BookOpen,
    href: "/courses",
    badge: "219/39",
  },
  {
    title: "Scholarship",
    icon: GraduationCap,
    href: "/scholarship",
  },
  {
    title: "Attendance",
    icon: UserSquare2,
    href: "/attendance",
  },
  {
    title: "Community Chat",
    icon: Users,
    href: "/chat",
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r bg-[#2B4B8C] text-white">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center p-6">
          <Grid className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Campus Hub</h1>
        </div>
        <div className="flex-1 space-y-4 p-4">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10",
                  pathname === item.href ? "bg-white/10" : "transparent"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
                {item.badge && (
                  <span className="ml-auto rounded bg-white/20 px-2 py-0.5 text-xs">
                    {item.badge}
                  </span>
                )}
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

