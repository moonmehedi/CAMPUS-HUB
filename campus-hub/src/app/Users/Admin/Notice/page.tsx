"use client";
import { useEffect, useState } from "react";
import { AlertCircle, Bell, Clock } from "lucide-react";
import { Sidebar } from "../Components/sidebar";
import { DashboardHeader } from "../Components/dashboard-header";
import AddNoticeForm from "./AddNoticeForm";
import styles from "./notice.module.css";
import { Button } from "@nextui-org/button";
import { motion, AnimatePresence } from 'framer-motion';

const adminId = 3; //needs to be dynamic after implementing cookies

interface NoticeProps {
  notice_id: string;
  admin_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  type: string;
}

function Notice({
  notice_id,
  admin_id,
  title,
  content,
  created_at,
  type,
  adminId,
  onDelete,
  refreshNotices,
}: NoticeProps & {
  adminId: number;
  onDelete: (id: string) => void;
  refreshNotices: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(`http://localhost:3000/notices/${notice_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, content: editedContent }),
      });
      if (!response.ok) {
        console.error("Failed to Update Notices");
      }
      refreshNotices();
    } catch (error) {
      console.error("Error Updating Notice: ", error);
    }
  };

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
      exit={{ opacity: 0, y: -20 }}
      className={`${styles.notice} ${styles[type]}`}
    >
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.2 }}>
            <Bell className={`${styles.noticeIcon} ${styles[type]}`} />
          </motion.div>
          <h3 className={styles.noticeTitle}>{title}</h3>
          <span className={`${styles.typeTag} ${styles[type]}`}>
            Admin Notice
          </span>
        </div>
        <div className={styles.noticeTimestamp}>
          <Clock size={14} />
          <time>{formattedDate}</time>
        </div>
      </div>
      <div className={styles.noticeContent}>
        {isEditing ? (
          <motion.textarea
            className={styles.noticeTextarea}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileFocus={{ scale: 1.01 }}
          />
        ) : (
          <motion.p
            className={`${styles.noticeMessage} ${!isExpanded && content.length > 250 ? 'truncated' : ''}`}
            onClick={() => content.length > 250 && setIsExpanded(!isExpanded)}
          >
            {content}
          </motion.p>
        )}
        {content.length > 250 && !isEditing && (
          <Button
            size="sm"
            variant="light"
            color="danger"
            className="mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </Button>
        )}
        {admin_id === adminId && (
          <motion.div 
            className={styles.actionButtons}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isEditing ? (
              <Button
                color="success"
                onClick={handleSaveClick}
                className="shadow-md hover:shadow-lg transition-all"
              >
                Save
              </Button>
            ) : (
              <Button
                color="danger"
                variant="flat"
                onClick={handleEditClick}
                className="shadow-md hover:shadow-lg transition-all"
              >
                Edit
              </Button>
            )}
            <Button
              color="danger"
              variant="flat"
              onClick={() => onDelete(notice_id)}
              className="shadow-md hover:shadow-lg transition-all"
            >
              Delete
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotices = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/notices`);
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

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAddNotice = async (newNotice: Omit<NoticeProps, 'notice_id' | 'created_at'>) => {
    try {
      const response = await fetch('http://localhost:3000/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice),
      });

      if (response.ok) {
        const {addedNotice} = await response.json();
        setNotices([addedNotice[0], ...notices]);
        alert('Notice added successfully!');
      } else {
        const { error } = await response.json();
        alert(`Error adding notice: ${error}`);
      }
    } catch (err) {
      console.error('Error adding notice:', err);
    }
  };
  const handleDeleteNotice = async (noticeId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notices/${noticeId}`,
        {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ adminId }),
        }
      );
      if (response.ok) {
        setNotices(notices.filter((notice) => notice.notice_id !== noticeId));
        alert('Notice Deleted successfully!');
      } else {
        console.error("Failed to delete notice");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          <DashboardHeader />
          <div className="flex-1 p-6 overflow-hidden">
            <div className="w-full h-full bg-white rounded-lg shadow-lg border flex flex-col">
              <motion.div 
                className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ rotate: -15 }}
                      animate={{ rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Bell className="w-6 h-6 text-red-500" />
                    </motion.div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                      Admin Notices
                    </h2>
                  </div>
                  <div className="text-sm text-gray-500">
                    {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
                  </div>
                </div>
              </motion.div>
              
              <div className="p-4">
                <AddNoticeForm onAddNotice={handleAddNotice} />
              </div>

              <AnimatePresence>
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
                  ) : notices.length > 0 ? (
                    notices.map((notice) => (
                      <Notice
                        key={notice.notice_id}
                        {...notice}
                        adminId={adminId}
                        onDelete={handleDeleteNotice}
                        refreshNotices={fetchNotices}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-gray-500"
                    >
                      No notices available
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}