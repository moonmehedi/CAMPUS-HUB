"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function ProfileButton() {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setShowProfile(true)}
      >
        <Avatar>
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
      </Button>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>AH</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Abid Hossain</h3>
              <p className="text-sm text-muted-foreground">+1 234 567 890</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

