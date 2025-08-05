"use client"

import { Clock } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function LeaveRequestsList() {
  const requests = [
    {
      id: 1,
      title: "Leave request for doctor appointment",
      date: "12-DEC-2024",
      time: "11:19 pm",
    },
    // More requests can be added here
  ]

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="p-4 rounded-lg bg-[#EDF6FF] flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium">{request.title}</p>
              <p className="text-sm text-gray-600">
                {request.date} {request.time}
              </p>
            </div>
          </div>
          
          <Link href="/Users/Admin/Leave_requests/details">
            <Button
              variant="outline"
              size="sm"
              className="bg-white hover:bg-gray-100"
            >
              View details
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

