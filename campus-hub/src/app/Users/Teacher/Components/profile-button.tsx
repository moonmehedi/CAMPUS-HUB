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
          <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/f8071f21-097d-4aa4-8958-f5d593203757/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmODA3MWYyMS0wOTdkLTRhYTQtODk1OC1mNWQ1OTMyMDM3NTciLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.NVL-Rv_I-yp-lZG7mdhCXPn5iB6EBgSJHyWQfzBjf6Y" alt="Profile" />
          <AvatarFallback>SJ</AvatarFallback>
        </Avatar>
      </Button>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24">
          <AvatarImage src="https://uniplex.mist.ac.bd:8443/admission-api/files/view/f8071f21-097d-4aa4-8958-f5d593203757/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmODA3MWYyMS0wOTdkLTRhYTQtODk1OC1mNWQ1OTMyMDM3NTciLCJleHAiOjE3MzY2OTU0MzYsImlhdCI6MTczNjYwOTAzNn0.NVL-Rv_I-yp-lZG7mdhCXPn5iB6EBgSJHyWQfzBjf6Y" alt="Profile" />
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback>SJ</AvatarFallback>
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

