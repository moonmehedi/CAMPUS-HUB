"use client"
import { useEffect, useState } from "react"
import { AlertCircle, Bell, Clock, Info } from 'lucide-react'
import { StudentLayout } from "../Components/student-layout"
import styles from '../styles/notice.module.css'
import { motion, AnimatePresence } from 'framer-motion'

interface NoticeProps {
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  type: string;
}

function Notice({ title, content, created_at, type}: NoticeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className={`${styles.notice} ${styles[type]}`}
    >
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <Bell className={`${styles.noticeIcon} ${styles[type]}`} />
          </motion.div>
          <h3 className={styles.noticeTitle}>{title}</h3>
          <span className={`${styles.typeTag} ${styles[type]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <div className={styles.noticeTimestamp}>
          <Clock size={14} />
          <time>{formattedDate}</time>
        </div>
      </div>
      <motion.div 
        className={styles.noticeContent}
        animate={{ height: isExpanded ? 'auto' : 'min-content' }}
      >
        <p className={`${styles.noticeMessage} ${!isExpanded && content.length > 250 ? styles.truncated : ''}`}>
          {content}
        </p>
        {content.length > 250 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className={styles.readMoreButton}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:3000/notices`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setNotices(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchNotices();
  }, []);

  return (
    <StudentLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen"
      >
        <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ rotate: -15 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Info className="w-6 h-6 text-blue-500" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Notices
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
            </div>
          </div>
        </div>

        <div className={styles.noticeScrollContainer}>
          {isLoading ? (
            <div className="flex flex-col gap-4 p-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.noticeSkeleton}>
                  <div className={styles.skeletonHeader} />
                  <div className={styles.skeletonContent} />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <div className="p-6 space-y-4">
                {notices.length > 0 ? (
                  notices.map((notice, index) => (
                    <Notice key={index} {...notice} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 text-gray-500"
                  >
                    No notices available at the moment
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </StudentLayout>
  )
}