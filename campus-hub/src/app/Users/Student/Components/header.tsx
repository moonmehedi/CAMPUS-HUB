'use client'

import { Bell, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-6 justify-end gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/0918307f-37a2-4fc5-b77d-28b6e8e020e2/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTE4MzA3Zi0zN2EyLTRmYzUtYjc3ZC0yOGI2ZThlMDIwZTIiLCJleHAiOjE3MzY2ODI3NjUsImlhdCI6MTczNjU5NjM2NX0.kjLRhjmnQRXrOlwcxNrhu7oKaPl0R3DazEgrhtd55a8" alt="Profile" />
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer" onSelect={() => document.getElementById('profile-drawer')?.click()}>
              View Profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

