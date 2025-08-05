'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function WelcomeBanner() {
  const [teacherName, setTeacherName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth_teacher', {
          credentials: 'include'
        });

        const data = await response.json();

        if (data.isAuthenticated) {
          setTeacherName(data.name || 'Teacher');
        } else {
          // Redirect to login if not authenticated
          router.push('/teacher-login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/teacher-login');
      } finally {
        setIsLoading(false);
      }
    };

    // First try to get from localStorage if "remember me" was checked
    const savedName = localStorage.getItem('teacherName');
    if (savedName) {
      setTeacherName(savedName);
      setIsLoading(false);
    }

    // Still check with server to ensure session is valid
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div 
          className="relative overflow-hidden rounded-lg p-8 text-white flex items-center"
          style={{
            background: 'linear-gradient(180deg, #003B73 0%, #006FD9 100%)'
          }}
        >
          <div className="relative z-10 flex-1">
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div 
        className="relative overflow-hidden rounded-lg p-8 text-white flex items-center"
        style={{
          background: 'linear-gradient(180deg, #003B73 0%, #006FD9 100%)'
        }}
      >
        <div className="relative z-10 flex-1">
          <h1 className="text-3xl font-bold">Welcome Back, {teacherName}</h1>
        </div>

        {/* Image Section */}
        <div className="relative h-30 w-30 flex-shrink-0 ml-4">
          <Image
            src="/Teacher-bg.svg"
            alt="Teacher background"
            layout="fill"
            objectFit="contain"
            className="opacity-70"
          />
        </div>
      </div>
    </div>
  )
}