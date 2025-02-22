"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "../Components/chat-message";
import { MembersList } from "../Components/member-list";
import { Sidebar } from "../Components/sidebar";
import { Header } from "../Components/header";

import styles from "../styles/chat.module.css";

const myCurrentStudentId = localStorage.getItem("studentId");

export default function CommunityChat() {
  interface Member {
    student_id: number;
    name: string;
    isActive: boolean;
  }

  interface Message {
    id: number;
    student_id: number;
    content: string;
    timestamp: string;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages and members
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/messages`,{
          credentials:"include"
        });
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchMembers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/members`,{
          credentials:"include"
        });
        if (!response.ok) throw new Error("Failed to fetch members");
        const data = await response.json();
        setMembers(data || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMessages();
    fetchMembers();

    // Poll for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  // Merge messages with sender info
  const mergedMessages = messages.map((message) => {
    const sender = members.find(
      (member) => member.student_id === message.student_id
    ) || {
      student_id: message.student_id,
      name: "Unknown",
      isActive: false,
    };

    return {
      ...message,
      sender,
      isSent: message.student_id === Number(myCurrentStudentId),
    };
  });

  // Send message function
  const sendMessage = async () => {
    if (!newMessage.trim()) return; // Prevent empty messages

    const messageData = {
      student_id: myCurrentStudentId,
      content: newMessage,
    };

    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
        credentials:"include"
      });

      if (response.ok) {
        const addedMessage = await response.json();
        setMessages((prevMessages) => [addedMessage, ...prevMessages]); // Append new message
        setNewMessage(""); // Clear input field
      } else {
        console.error("Message cannot be sent");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className={styles.container}>
            <div className={styles.chatSection}>
              <div className={styles.messageContainer}>
                {mergedMessages.map((message, index) => (
                  <ChatMessage
                    key={message.id || `msg-${index}`}
                    {...message}
                  />
                ))}
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                  <Input
                    placeholder="Start Typing Your Message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={styles.input}
                  />
                  <Button
                    className="bg-green-400 hover:bg-green-500"
                    onClick={sendMessage}
                    disabled={!newMessage.trim()} // Disable when input is empty
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <MembersList members={members} />
          </div>
        </div>
      </div>
    </div>
  );
}
