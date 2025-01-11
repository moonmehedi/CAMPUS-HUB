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
          <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/becc4c6c-a257-4231-b1d2-065603fade12/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZWNjNGM2Yy1hMjU3LTQyMzEtYjFkMi0wNjU2MDNmYWRlMTIiLCJleHAiOjE3MzY2ODY2NjEsImlhdCI6MTczNjYwMDI2MX0.Y20NJ9T0hp9Vsz5afdte_pVQcfgXYf5ZqhLO4F17M94" alt="Profile" />
          <AvatarFallback>SH</AvatarFallback>
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
              <h3 className="text-lg font-semibold">Sadia Hossain</h3>
              <p className="text-sm text-muted-foreground">+1 234 567 890</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

