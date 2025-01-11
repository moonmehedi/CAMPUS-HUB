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

export function ProfileDrawer() {
  return (
    <Sheet>
      <SheetTrigger id="profile-drawer" className="hidden">
        Open Profile
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/0918307f-37a2-4fc5-b77d-28b6e8e020e2/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTE4MzA3Zi0zN2EyLTRmYzUtYjc3ZC0yOGI2ZThlMDIwZTIiLCJleHAiOjE3MzY2ODI3NjUsImlhdCI6MTczNjU5NjM2NX0.kjLRhjmnQRXrOlwcxNrhu7oKaPl0R3DazEgrhtd55a8" alt="Profile Picture" />
            <AvatarFallback>MH</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">Mehedi Hasan Moon</h2>
          <p className="text-gray-500">Student ID: 12345</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-background">
          <Button variant="outline" className="w-full" size="lg">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

