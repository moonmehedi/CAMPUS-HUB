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
            <AvatarImage src="/placeholder.svg" alt="Profile Picture" />
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

