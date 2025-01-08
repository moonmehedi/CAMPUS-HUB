"use client"

import { Bell, Search, Settings } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProfileButton } from "../Components/profile-button"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b bg-background px-4">
      <div className="flex w-full items-center justify-between">
        <div className="relative w-full max-w-md ml-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Class, Documents, Activities..."
            className="w-full pl-10"
          />
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ProfileButton />
        </div>
      </div>
    </header>
  )
}

