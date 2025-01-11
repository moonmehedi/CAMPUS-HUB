"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BookOpen, GraduationCap, Home, LogOut, ScrollText, MessageCircle, UserPlus, UserCheck } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Campus Hub",
    icon: Home,
    href: "/Users/Admin/Home",
  },
  {
    title: "Notice",
    icon: ScrollText,
    href: "/Users/Admin/Notice",
  },
  {
    title: "Course Registration",
    icon: BookOpen,
    href: "/Users/Admin/Course_Registration",
  },
  {
    title: "Scholarship",
    icon: GraduationCap,
    href: "/Users/Admin/Scholarship",
  },
  {
    title: "Leave Requests",
    icon: ScrollText,
    href: "/Users/Admin/Leave_requests",
  },
  {
    title: "TrainBot",
    icon: MessageCircle,
    href: "/Users/Admin/TrainBot",
  },
  {
    title: "Add Student",
    icon: UserPlus, // Icon for adding a student
    href: "/Users/Admin/Add_Student",
  },
  {
    title: "Add Teacher",
    icon: UserCheck, // Icon for adding a teacher
    href: "/Users/Admin/Add_Teacher",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Perform any necessary logout operations (e.g., clearing tokens or session storage)
    console.log("User logged out")
    router.push("/") // Redirect to the main page after logout
  }

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
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Button>
        </div>
      </div>
    </aside>
  )
}
