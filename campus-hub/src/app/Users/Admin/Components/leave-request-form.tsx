"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Link from "next/link"

export function LeaveRequestForm() {
  const [isPdfOpen, setIsPdfOpen] = useState(false)

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl">Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> Sadia Jahan Moon</p>
            <p><strong>ID:</strong> 202114085</p>
            <p><strong>Level:</strong> Level 3</p>
            <p><strong>Department:</strong> CSE</p>
            <p><strong>Section:</strong> A</p>
            <p><strong>Course:</strong> CSE-303</p>
            <p><strong>Date:</strong> 15/12/2025</p>
            <p><strong>Hour:</strong> 10:00-10:50</p>
          </div>

          <div className="space-y-2">
            <p><strong>Reason:</strong> I have a medical appointment scheduled so that I can not attend the class.</p>
          </div>

          <div className="space-y-2">
            <p><strong>Medical Documents:</strong></p>
            <Dialog open={isPdfOpen} onOpenChange={setIsPdfOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">View Uploaded Document</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogTitle className="sr-only">Medical Document Details</DialogTitle>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold mb-4">Doctor Appointment Confirmation</h2>
                  <p className="mb-4">This is to confirm that you, Sadia Jahan Moon, have an appointment scheduled with the doctor.</p>
                  <h3 className="text-xl font-semibold mb-2">Appointment Details:</h3>
                  <ul className="list-disc list-inside mb-4">
                    <li>Doctor's Name: Dr. John Doe</li>
                    <li>Specialization: General Physician</li>
                    <li>Appointment Date: January 15, 2025</li>
                    <li>Appointment Time: 3:00 PM</li>
                    <li>Clinic Address: 123 Healthcare Street, Cityville, Country</li>
                  </ul>
                  <p className="mb-4">Please ensure to arrive at least 10 minutes before your scheduled time.</p>
                  <p>For any changes or cancellations, contact the clinic at (123) 456-7890.</p>
                  <p className="mt-4 font-semibold">Thank you.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex justify-center space-x-4">
          <Link href="/Users/Admin/Leave_requests">
            <Button 
              type="submit"
              
              className="w-32 bg-[#60A3D9] hover:bg-[#003B73]"
            >
              Cancel
            </Button>
            </Link>
            <Link href="/Users/Admin/Leave_requests">
              <Button 
                type="submit"
                className="w-32 bg-[#60A3D9] hover:bg-[#003B73]"
              >
                Approve
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
