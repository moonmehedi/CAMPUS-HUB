"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Sidebar } from "../Components/sidebar";
import { DashboardHeader } from "../Components/dashboard-header";
import AddNoticeForm from "./AddNoticeForm";
import styles from "./notice.module.css";
import { Button } from "@nextui-org/button";
import { number } from "zod";
import { motion } from "framer-motion";

// const teacherId = 1002; // Needs to be dynamic after implementing cookies
interface NoticeProps {
  notice_id: string;
  teacher_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  type: string;
}

function Notice({
  notice_id,
  teacher_id,
  title,
  content,
  created_at,
  type,
  teacherId,
  onDelete,
  refreshNotices,
}: NoticeProps & {
  teacherId: number;
  onDelete: (id: string) => void;
  refreshNotices: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await fetch(
        `http://localhost:3000/notices/${notice_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teacherId, content: editedContent }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to Update Notice");
        return;
      }

      refreshNotices(); // ⬅ Fetch the latest data instead of reloading
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
      className={`${styles.notice} ${styles[type]}`}
    >
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <AlertCircle className={`${styles.noticeIcon} ${styles[type]}`} />
          <h3 className={styles.noticeTitle}>{title}</h3>
          <span className={`${styles.typeTag} ${styles[type]}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        <time className={styles.noticeTimestamp}>{formattedDate}</time>
      </div>
      <div className={styles.noticeContent}>
        {isEditing ? (
          <motion.textarea
            className={styles.textarea}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            whileFocus={{ scale: 1.01 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <p className={styles.noticeMessage}>{content}</p>
        )}
        {teacher_id === teacherId && (
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
                color="default" 
                onClick={handleEditClick}
                className="shadow-md hover:shadow-lg transition-all"
              >
                Edit
              </Button>
            )}
            <Button 
              color="danger" 
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
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const router = useRouter();
  const fetchNotices = async () => {
    try {
      const response = await fetch(`http://localhost:3000/notices`,{
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    }
  };

  useEffect(() => {
    const savedDteacherId = localStorage.getItem('teacherId');
    setTeacherId(savedDteacherId ? parseInt(savedDteacherId, 10) : null);
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth_teacher", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data)
        if (data.isAuthenticated) {
          setTeacherId(data.teacher_id);
        } else {
          router.push("/Users/Teacher/Login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/Users/Teacher/Login");
      }
    };
    checkAuth(), fetchNotices();
  }, [router]);

  const handleAddNotice = async (
    newNotice: Omit<NoticeProps, "notice_id" | "created_at">
  ) => {
    try {
      const response = await fetch("http://localhost:3000/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNotice),
        credentials: "include",
      });
      const result = await response.json()
      console.log("API Response:", result); // Debugging step
      if (response.ok) {
        const { addedNotice } = result;
        console.log("Added Notice:", JSON.stringify(result));
        if (addedNotice && typeof addedNotice === "object") {
          setNotices([addedNotice, ...notices]); // No [0] index needed
        }
        alert("Notice added successfully!");
      } else {
        const { error } = await response.json();
        alert(`Error adding notice: ${error}`);
      }
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  const handleDeleteNotice = async (noticeId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/notices/${noticeId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ teacherId }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotices(notices.filter((notice) => notice.notice_id !== noticeId));
        alert("Notice Deleted successfully!");
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
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <h2 className="text-xl font-semibold">Notices</h2>
              </div>
              <div className="p-1 flex-1 overflow-auto">
                <AddNoticeForm onAddNotice={handleAddNotice} />
              </div>
              <div className={styles.noticeScrollContainer}>
                {notices.map((notice) => (
                  teacherId !== null && (
                    <Notice
                      key={notice.notice_id}
                      {...notice}
                      teacherId={teacherId}
                      onDelete={handleDeleteNotice}
                      refreshNotices={fetchNotices}
                    />
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
