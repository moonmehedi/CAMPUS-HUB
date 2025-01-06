'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Icons } from '@/components/icons'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9fc] relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/students-bg.svg"
          alt="Students background"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="bg-gradient-to-b from-[#2f3b52] to-[#1a1f2e] rounded-xl shadow-2xl p-8">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">
                STUDENT LOGIN
              </h1>
            </div>

            <form onSubmit={onSubmit}>
              <div className="flex flex-col space-y-4">
                <div className="space-y-2">
                  <Input
                    id="username"
                    placeholder="USER NAME"
                    type="text"
                    disabled={isLoading}
                    className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    placeholder="PASSWORD"
                    type="password"
                    disabled={isLoading}
                    className="bg-transparent border-white/20 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-blue-600" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Log in
                </Button>

                <Button 
                  type="button" 
                  variant="outline" 
                  className="bg-white text-gray-900 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Sign in with Google
                </Button>

                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-400 hover:text-white transition-colors text-center"
                >
                  Forget Password? Reset Now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

