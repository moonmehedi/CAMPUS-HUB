'use client'

import { LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from 'next/navigation' // Import useRouter

export function ProfileDrawer() {
  const router = useRouter() // Initialize the router
  const studentInfo = {
    name: "Md. Mehedi Hasan Moon",
    department: "Computer Science & Engineering",
    roll: "202214048",
    regNo: "131401220048",
    dob: "12/07/2002",
    gender: "Male",
    mobile: "01990276149",
    email: "moonmehedi8@gmail.com",
    batch: "CSE-22",
    section: "A",
    category: "Civil",
    syllabus: "Undergraduate Syllabus, 2021 (Dept. of CSE)",
    fatherName: "Lasker Nazrul Islam",
    motherName: "Mahafuza Begum",
    quota: "Military Ward",
    stipend: "Spring 2024: 35%, Fall 2024: 35%",
    status: "Active"
  }

  const handleLogout = () => {
    // Redirect to the home page
    router.push('/')
  }

  return (
    <Sheet>
      <SheetTrigger id="profile-drawer" className="hidden">
        Open Profile
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] lg:w-[640px]">
        <SheetHeader>
          <SheetTitle>Student Profile</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-10rem)] pr-4">
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/0918307f-37a2-4fc5-b77d-28b6e8e020e2/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTE4MzA3Zi0zN2EyLTRmYzUtYjc3ZC0yOGI2ZThlMDIwZTIiLCJleHAiOjE3MzY2ODI3NjUsImlhdCI6MTczNjU5NjM2NX0.kjLRhjmnQRXrOlwcxNrhu7oKaPl0R3DazEgrhtd55a8" alt="Profile Picture" />
              <AvatarFallback>MHM</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
            <p className="text-gray-500">{studentInfo.department}</p>
          </div>
          <Separator className="my-4" />
          <div className="space-y-6">
            <InfoSection title="Personal Information">
              <InfoItem label="Student Roll" value={studentInfo.roll} />
              <InfoItem label="Registration No." value={studentInfo.regNo} />
              <InfoItem label="Date of Birth" value={studentInfo.dob} />
              <InfoItem label="Gender" value={studentInfo.gender} />
            </InfoSection>
            <InfoSection title="Contact Information">
              <InfoItem label="Mobile Number" value={studentInfo.mobile} />
              <InfoItem label="Email" value={studentInfo.email} />
            </InfoSection>
            <InfoSection title="Academic Information">
              <InfoItem label="Batch" value={studentInfo.batch} />
              <InfoItem label="Class Section" value={studentInfo.section} />
              <InfoItem label="Student Category" value={studentInfo.category} />
              <InfoItem label="Syllabus" value={studentInfo.syllabus} />
              <InfoItem label="Department Name" value={studentInfo.department} />
            </InfoSection>
            <InfoSection title="Additional Information">
              <InfoItem label="Father Name" value={studentInfo.fatherName} />
              <InfoItem label="Mother Name" value={studentInfo.motherName} />
              <InfoItem label="Quota" value={studentInfo.quota} />
              <InfoItem label="Stipend" value={studentInfo.stipend} />
              <InfoItem label="Active Status" value={studentInfo.status} />
            </InfoSection>
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
          <Button variant="outline" className="w-full" size="lg" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function InfoSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}:</span>
      <span className="text-sm font-medium text-right ml-2">{value}</span>
    </div>
  )
}
