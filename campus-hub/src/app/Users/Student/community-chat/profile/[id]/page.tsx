"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StudentLayout } from "../../../Components/student-layout"
import { GraduationCap, Phone, Briefcase, User } from "lucide-react" // Import icons
import styles from "../../../styles/profile.module.css"

const memberDetails = {
  id: "1",
  name: "Arqam Bin Almas",
  avatar: "https://media.licdn.com/dms/image/v2/D5603AQEkIGl2qoJm0A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674890799757?e=1741824000&v=beta&t=0QbIN20PoAsb-4Jdmfbey0oLtxkYNIwtUq8YT2_xeec",
  studentRoll: "202214011",
  batch: "CSE-22",
  mobileNumber: "01841225706",
  currentlyWorking: "SoftBank BD",
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <StudentLayout>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <Avatar className={styles.avatar}>
                <AvatarImage src={memberDetails.avatar} alt={memberDetails.name} />
                <AvatarFallback>{memberDetails.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <h2 className={styles.name}>{memberDetails.name}</h2>
          </div>

          {/* Info Cards */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <User className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Student Roll</div>
                <div className={styles.infoValue}>{memberDetails.studentRoll}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <GraduationCap className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Batch</div>
                <div className={styles.infoValue}>{memberDetails.batch}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Phone className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Mobile Number</div>
                <div className={styles.infoValue}>{memberDetails.mobileNumber}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Briefcase className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Currently Working</div>
                <div className={styles.infoValue}>{memberDetails.currentlyWorking}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  )
}