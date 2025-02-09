// pages/Users/Student/Notice/page.tsx
"use client"
import { useEffect, useState } from "react"
import { AlertCircle } from 'lucide-react'
import { StudentLayout } from "../Components/student-layout"  // Import the layout
import styles from '../styles/notice.module.css'

// Your existing Notice interface
interface NoticeProps {
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  type: string;
}

// Your existing Notice component
function Notice({ title, content, created_at, type}: NoticeProps) {
  return (
    <div className={`${styles.notice} ${styles[type]}`}>
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <AlertCircle className={styles.noticeIcon} />
          <h3 className={styles.noticeTitle}>{title}</h3>
        </div>
        <time className={styles.noticeTimestamp}>{created_at}</time>
      </div>
      <div className={styles.noticeContent}>
        <p className={styles.noticeMessage}>{content}</p>
      </div>
    </div>
  )
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeProps[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notices`);
        const data = await response.json();
        if (response.ok) {
          setNotices(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      }
    };
  
    fetchNotices();
  }, []);

  return (
    <StudentLayout>
      {/* This is your page-specific content */}
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-semibold">Notices</h2>
      </div>
      <div className={styles.noticeScrollContainer}>
        <div className="p-6 space-y-4">
          {notices.map((notice, index) => (
            <Notice key={index} {...notice} />
          ))}
        </div>
      </div>
    </StudentLayout>
  )
}