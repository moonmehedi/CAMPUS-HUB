// Components/student-layout.tsx
'use client'
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { ProfileDrawer } from "./profile-drawer"

type StudentLayoutProps = {
  children: React.ReactNode;
}

export function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#BFD7ED] to-[#60A3D9]">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          {/* Added max-height and overflow-auto to contain scrollable content */}
          <div className="flex-1 pt-2 pb-6 px-6 overflow-auto">
            <div className="bg-white rounded-[30px] h-full overflow-y-auto">
              {children}
            </div>
          </div>
          <ProfileDrawer />
        </div>
      </div>
    </div>
  )
}