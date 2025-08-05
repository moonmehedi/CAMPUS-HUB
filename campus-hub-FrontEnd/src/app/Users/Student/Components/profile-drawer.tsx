"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation"; // Import useRouter
import { useEffect, useState } from "react";
interface studentInfo {
  name: string;
  dept_name: string;
  roll: string;
  reg_no: string;
  dob: string;
  gender: string;
  mobile: string;
  email: string;
  batch: string;
  class_section: string;
  student_category: string;
  syllabus: string;
  father_name: string;
  mother_name: string;
  avatar: string;
}
export function ProfileDrawer() {
  const router = useRouter(); // Initialize the router
  const [studentInfo, setStudentInfo] = useState<studentInfo | null>(null);
  const studentInfoDummy = {
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
    status: "Active",
  };
  // const studentId = Number(localStorage.getItem("studentId"));
  const studentId = 202214008;
  useEffect(() => {
    if (isNaN(studentId)) {
      console.error(
        `Invalid student ID. Must be an integer. From Frontend ${studentId} as ${typeof studentId} profile drawer`
      );
      router.push("/");
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/studentInfo/${studentId}`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(`StudentDetails:${data}`);
          setStudentInfo(data);
        } else {
          console.error("Error Fetching Student Profile: ", data.error);
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [router]);
  const handleLogout = () => {
    // Redirect to the home page
    router.push("/");
  };

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
            {studentInfo && (
              <>
                <Avatar className="h-32 w-32">
                  <AvatarImage src={studentInfo.avatar} alt="Profile Picture" />
                  <AvatarFallback>MHM</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
                <p className="text-gray-500">{studentInfo.dept_name}</p>
              </>
            )}
          </div>
          <Separator className="my-4" />
          <div className="space-y-6">
            <InfoSection title="Personal Information">
              <InfoItem label="Student Roll" value={studentInfo?.roll || ""} />
              <InfoItem
                label="Registration No."
                value={studentInfo?.reg_no || ""}
              />
              <InfoItem label="Date of Birth" value={studentInfo?.dob || ""} />
              <InfoItem label="Gender" value={studentInfo?.gender || ""} />
            </InfoSection>
            <InfoSection title="Contact Information">
              <InfoItem
                label="Mobile Number"
                value={studentInfo?.mobile || ""}
              />
              <InfoItem label="Email" value={studentInfo?.email || ""} />
            </InfoSection>
            <InfoSection title="Academic Information">
              <InfoItem label="Batch" value={studentInfo?.batch || ""} />
              <InfoItem
                label="Class Section"
                value={studentInfo?.class_section || ""}
              />
              <InfoItem
                label="Student Category"
                value={studentInfo?.student_category || ""}
              />
              <InfoItem label="Syllabus" value={studentInfo?.syllabus || ""} />
              <InfoItem
                label="Department Name"
                value={studentInfo?.dept_name || ""}
              />
            </InfoSection>
            <InfoSection title="Additional Information">
              <InfoItem
                label="Father Name"
                value={studentInfo?.father_name || ""}
              />
              <InfoItem
                label="Mother Name"
                value={studentInfo?.mother_name || ""}
              />
              <InfoItem label="Quota" value={studentInfoDummy?.quota || ""} />
              <InfoItem
                label="Stipend"
                value={studentInfoDummy?.stipend || ""}
              />
              <InfoItem
                label="Active Status"
                value={studentInfoDummy?.status || ""}
              />
            </InfoSection>
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
          <Button
            variant="outline"
            className="w-full"
            size="lg"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-sm text-gray-500 flex-shrink-0">{label}:</span>
      <span className="text-sm font-medium text-right ml-2">{value}</span>
    </div>
  );
}
