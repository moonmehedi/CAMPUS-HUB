import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '../../../styles/profile.module.css'

const memberDetails = {
  id: '1',
  name: 'Arqam Bin Almas',
  avatar: '/placeholder.svg',
  studentRoll: '202214011',
  batch: 'CSE-22',
  mobileNumber: '01841225706',
  currentlyWorking: 'SoftBank BD'
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <Avatar className="h-32 w-32">
            <AvatarImage src={memberDetails.avatar} alt={memberDetails.name} />
            <AvatarFallback>{memberDetails.name[0]}</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-center font-semibold">{memberDetails.name}</h2>
        </div>
        <div className={styles.detailsSection}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Student Roll</div>
              <div className={styles.infoValue}>{memberDetails.studentRoll}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Batch</div>
              <div className={styles.infoValue}>{memberDetails.batch}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Mobile Number</div>
              <div className={styles.infoValue}>{memberDetails.mobileNumber}</div>
            </div>
            <div className={styles.infoItem}>
              <div className={styles.infoLabel}>Currently Working</div>
              <div className={styles.infoValue}>{memberDetails.currentlyWorking}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

