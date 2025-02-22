"use client"

import { useState, useEffect } from "react"
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
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (showProfile) {
      fetch('http://localhost:3000/auth_admin', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(data => setProfileData(data.admin))
        .catch(error => console.error('Error fetching profile data:', error))
    }
  }, [showProfile])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setShowProfile(true)}
      >
        <Avatar>
          <AvatarImage src={profileData?.avatar || "default-avatar-url"} alt="Profile" />
          <AvatarFallback>{profileData?.initials || "?"}</AvatarFallback>
        </Avatar>
      </Button>

      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile Details</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 p-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profileData?.avatar || "default-avatar-url"} alt="Profile" />
              <AvatarFallback>{profileData?.initials || "?"}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{profileData?.name || "Loading..."}</h3>
              <p className="text-sm text-muted-foreground">{profileData?.phone || "Loading..."}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

