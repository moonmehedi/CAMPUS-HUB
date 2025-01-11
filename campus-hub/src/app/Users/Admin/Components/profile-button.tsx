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
          <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/485c5c33-f665-47b0-833c-a499195d474a/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODVjNWMzMy1mNjY1LTQ3YjAtODMzYy1hNDk5MTk1ZDQ3NGEiLCJleHAiOjE3MzY2OTc0NDEsImlhdCI6MTczNjYxMTA0MX0.sqtflGyvXSA_b_jtA-3uvAYLtKXQb0PYoz4M5T5XJ6c" alt="Profile" />
          <AvatarFallback>MI</AvatarFallback>
        </Avatar>
      </Button>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/485c5c33-f665-47b0-833c-a499195d474a/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODVjNWMzMy1mNjY1LTQ3YjAtODMzYy1hNDk5MTk1ZDQ3NGEiLCJleHAiOjE3MzY2OTc0NDEsImlhdCI6MTczNjYxMTA0MX0.sqtflGyvXSA_b_jtA-3uvAYLtKXQb0PYoz4M5T5XJ6c" alt="Profile" />
              <AvatarFallback>MI</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">Major Iman</h3>
              <p className="text-sm text-muted-foreground">+1 234 567 890</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

