"use client"
import { useState } from 'react';
import { AlertCircle } from 'lucide-react'
import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import AddNoticeForm from './AddNoticeForm';
import styles from './notice.module.css'
import { Button } from "@nextui-org/button";

interface NoticeProps {
  user_id: string,
  message_id: string,
  title: string,
  message: string,
  timestamp: string,
  type?: 'urgent' | 'info'
}

function Notice({ user_id, message_id, title, message, timestamp, type = 'info' }: NoticeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Save the edited message logic here
  };

  return (
    <div className={`${styles.notice} ${styles[type]}`}>
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <AlertCircle className={styles.noticeIcon} />
          <h3 className={styles.noticeTitle}>{title}</h3>
        </div>
        <time className={styles.noticeTimestamp}>{timestamp}</time>
      </div>
      <div className={styles.noticeContent}>
        {isEditing ? (
          <textarea
            className={`${styles.noticeMessage} ${styles.noticeTextarea}`}
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
          />
        ) : (
          <p className={styles.noticeMessage}>{message}</p>
        )}
        {user_id === message_id && (
          <div className='flex flex-row-reverse flex-wrap gap-4 my-0.5 items-center'>
            {isEditing ? (
              <Button color='success' onClick={handleSaveClick}>Save</Button>
            ) : (
              <Button color='default' onClick={handleEditClick}>Edit</Button>
            )}
            <Button color='danger'>Delete</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const initialNotices = [
  {
    user_id: "admin",
    message_id: "1",
    title: 'Notice from Dept.Head',
    message: 'Dear Students and Faculties you are requested to be present at the auditorium at 11:50 am.Please be present there at time.',
    timestamp: '12-DEC-2024\n11:15 pm',
    type: 'urgent' as const,
  },
  {
    user_id: "abidT",
    message_id: "abidT",
    title: 'Exam Notice',
    message: 'Dear Students your CT exam will be conducted tomorrow at 9:00 am Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, hic? Necessitatibus totam, consectetur soluta quas nihil, ipsum molestias culpa, velit provident iste similique minima amet recusandae error quam ab. Libero.',
    timestamp: '12-DEC-2024\n10:15 pm',
    type: 'info' as const,
  },
  {
    user_id: "3",
    message_id: "4",
    title: 'Library Notice',
    message: 'The library will remain open during winter break from 9 AM to 5 PM.',
    timestamp: '12-DEC-2024\n9:30 pm',
    type: 'info' as const,
  },
  {
    message_id: "abidT",
    user_id: "abidT",
    title: 'Sports Day Announcement',
    message: 'Annual Sports Day will be held on December 20th. All students are encouraged to participate.',
    timestamp: '12-DEC-2024\n9:00 pm',
    type: 'info' as const,
  },
  {
    message_id: "5",
    user_id: "7",
    title: 'Urgent: System Maintenance',
    message: 'The campus portal will be under maintenance from 2 AM to 4 AM tomorrow.',
    timestamp: '12-DEC-2024\n8:45 pm',
    type: 'urgent' as const,
  },
]

export default function NoticePage() {
  const [notices, setNotices] = useState(initialNotices);

  const handleAddNotice = (newNotice: any) => {
    setNotices([newNotice, ...notices]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64"> {/* Added margin-left to account for fixed sidebar */}
          <DashboardHeader />
          <div className="flex-1 p-6 overflow-hidden">
            <div className="w-full h-full bg-white rounded-lg shadow-lg border flex flex-col">
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold">Notices</h2>
              </div>
              <div className="p-1 flex-1 overflow-auto ">
                <AddNoticeForm onAddNotice={handleAddNotice} />
              </div>
                <div className={styles.noticeScrollContainer}>
                  {notices.map((notice, index) => (
                    <Notice key={index} {...notice} />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



