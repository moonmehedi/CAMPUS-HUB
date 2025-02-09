"use client"

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '../styles/members.module.css'

interface Member {
  id: string
  name: string
  avatar?: string
  isActive: boolean
}

interface MembersListProps {
  members: Member[]
}

export function MembersList({ members }: MembersListProps) {
  const router = useRouter()
  const activeMembers = members.filter(member => member.isActive)

  return (
    <div className={styles.membersList}>
      {/* Active Members */}
      {activeMembers.length > 0 && (
        <div className="mb-6">
          <div className={styles.sectionTitle}>
            Online
          </div>
          {activeMembers.map((member) => (
            <div
              key={member.id}
              className={styles.memberItem}
              onClick={() => router.push(`/Users/Student/community-chat/profile/${member.id}`)}
            >
              <div className={styles.avatarWrapper}>
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {member.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className={styles.activeStatus} />
              </div>
              <span className={styles.memberName}>{member.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Offline Members */}
      <div>
        <div className={styles.sectionTitle}>
          Offline
        </div>
        {members.filter(member => !member.isActive).map((member) => (
          <div
            key={member.id}
            className={styles.memberItem}
            onClick={() => router.push(`/Users/Student/community-chat/profile/${member.id}`)}
          >
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {member.name[0]}
              </AvatarFallback>
            </Avatar>
            <span className={styles.memberName}>{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}