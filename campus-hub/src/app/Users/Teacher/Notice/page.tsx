"use client";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Sidebar } from "../Components/sidebar";
import { DashboardHeader } from "../Components/dashboard-header";
import AddNoticeForm from "./AddNoticeForm";
import styles from "./notice.module.css";
import { Button } from "@nextui-org/button";

const teacherId = 1001;//needs to be dynamic after implementing cookies

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
}: NoticeProps & { teacherId: number; onDelete: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    // Save the edited message logic here
    try {
      const response = await fetch(`http://localhost:5000/notices/${notice_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });
      if (!response.ok) {
        console.error("Failed to Update Notices");
      }
    } catch (error) {
      console.error("Error Updating Notice: ", error);
    }
  };

  return (
    //
    <div className={`${styles.notice} ${styles[type]}`}>
      <div className={styles.noticeHeader}>
        <div className={styles.titleContainer}>
          <AlertCircle className={styles.noticeIcon} />
          <h3 className={styles.noticeTitle}>{title}</h3>
        </div>
        <time className={styles.noticeTimestamp}>{created_at}</time>
      </div>
      <div className={styles.noticeContent}>
        {isEditing ? (
          <textarea
            className={`${styles.noticeMessage} ${styles.noticeTextarea}`}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className={styles.noticeMessage}>{content}</p>
        )}
        {teacher_id === teacherId && (
          <div className="flex flex-row-reverse flex-wrap gap-4 my-0.5 items-center">
            {isEditing ? (
              <Button color="success" onClick={handleSaveClick}>
                Save
              </Button>
            ) : (
              <Button color="default" onClick={handleEditClick}>
                Edit
              </Button>
            )}
            <Button color="danger" onClick={() => onDelete(notice_id)}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NoticePage() {
  const [notices, setNotices] = useState<NoticeProps[]>([]);

  // const fetchNotices = async () => {
  //   try {
  //     const response = await fetch(`localhost:5000/notices`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setNotices(data);
  //     }else
  //     {
  //       console.error(data.message);
  //     }
  //   }
  //   catch (error) {
  //     console.error("Failed to fetch notices:", error);
  //   }
  //   }
  // };
  useEffect(() => {
    // Fetch notices for the logged-in teacher
    const fetchNotices = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notices`);
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

  const handleAddNotice = async (newNotice: Omit<NoticeProps, 'notice_id' | 'created_at'>) => {
    try {
      const response = await fetch('http://localhost:5000/notices', {
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
        `http://localhost:5000/notices/${noticeId}`,
        {
          method: "DELETE",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ teacherId }),
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
          {" "}
          {/* Added margin-left to account for fixed sidebar */}
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
                  <Notice key={index} {...notice} teacherId={teacherId} onDelete={handleDeleteNotice} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
