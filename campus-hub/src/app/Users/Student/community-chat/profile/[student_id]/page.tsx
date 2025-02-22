"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StudentLayout } from "../../../Components/student-layout";
import { GraduationCap, Phone, Briefcase, User } from "lucide-react"; // Import icons
import styles from "../../../styles/profile.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
// const memberDetails = {
//   student_id: "1",
//   name: "Arqam Bin Almas",
//   avatar: "https://media.licdn.com/dms/image/v2/D5603AQEkIGl2qoJm0A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674890799757?e=1741824000&v=beta&t=0QbIN20PoAsb-4Jdmfbey0oLtxkYNIwtUq8YT2_xeec",
//   roll: "202214011",
//   batch: "CSE-22",
//   mobile: "01841225706",
//   currentlyWorking: "SoftBank BD",
// }
interface MemberDetails {
  student_id: number;
  name: string;
  avatar: string; // optional
  roll: string;
  batch: string;
  mobile: string;
  currentlyWorking: string;
}

export default function ProfilePage() {
  const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(
    null
  );
  const params = useParams();
  const router = useRouter();
  const student_id = Number(params.student_id);
  useEffect(() => {
    if (isNaN(student_id)) {
      console.error(`Invalid student ID. Must be an integer. From Frontend ${student_id} as ${typeof student_id}`);
      router.push("/Users/Student/community-chat");
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/members/${student_id}`,
          { credentials: "include" }
        );
        const data = await response.json();
        if (response.ok) {
          console.log(`MemberDetails:${data}`);
          setMemberDetails(data);
        } else {
          console.error("Error Fetching Profile: ", data.error);
          router.push("/Users/Student/community-chat");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [student_id, router]);
  return (
    <StudentLayout>
      <div className={styles.container}>
        <div className={styles.profileCard}>
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <Avatar className={styles.avatar}>
                {memberDetails && (
                  <>
                    <AvatarImage
                      src={memberDetails.avatar}
                      alt={memberDetails.name}
                    />
                    <AvatarFallback>{memberDetails.name[0]}</AvatarFallback>
                  </>
                )}
              </Avatar>
            </div>
            {memberDetails && (
              <h2 className={styles.name}>{memberDetails.name}</h2>
            )}
          </div>

          {/* Info Cards */}
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <User className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Student Roll</div>
                <div className={styles.infoValue}>{memberDetails?.roll}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <GraduationCap className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Batch</div>
                <div className={styles.infoValue}>{memberDetails?.batch}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Phone className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Mobile Number</div>
                <div className={styles.infoValue}>{memberDetails?.mobile}</div>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.iconWrapper}>
                <Briefcase className={styles.icon} />
              </div>
              <div className={styles.infoContent}>
                <div className={styles.infoLabel}>Currently Working</div>
                <div className={styles.infoValue}>
                  {memberDetails?.currentlyWorking}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
