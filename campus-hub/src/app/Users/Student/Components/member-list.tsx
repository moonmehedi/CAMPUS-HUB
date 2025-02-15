"use client"

import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '../styles/members.module.css'

interface Member {
  student_id: number
  name: string
  isActive: boolean
}

interface MembersListProps {
  members: Member[]
}

export function MembersList({ members }: MembersListProps) {
  const router = useRouter()

  return (
    <div className={styles.membersSection}>
      <div className={styles.membersList}>
        {members.map((member) => (
          <div
            key={member.student_id}
            className={styles.memberItem}
            onClick={() => router.push(`/Users/Student/community-chat/profile/${member.student_id}`)}
          >
            {member.isActive && <div className={styles.activeStatus} />}
            <Avatar>
            {/* <AvatarImage src={member.avatar} alt={member.name} /> */}
              <AvatarImage alt={member.name} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className={styles.memberName}>{member.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

