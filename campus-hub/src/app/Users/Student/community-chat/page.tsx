"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "../Components/chat-message";
import { MembersList } from "../Components/member-list";
import { Sidebar } from "../Components/sidebar";
import { Header } from "../Components/header";

import styles from "../styles/chat.module.css";

const messages = [
  {
    id: "1",
    content:
      "Vel et commodo et scelerisque aliquam. Sed libero, non praesent felis, sem eget venenatis neque. Massa tincidunt tempor a nisl eu mauris lectus. Amet lobortis auctor at egestas aenean. Phoncus cras nunc lectus morbi duis sem diam. Sed gravida eget semper vulputate vitae.",
    timestamp: "10:16",
    sender: {
      id: "1",
      name: "Arqam Bin Almas",
      avatar: "/placeholder.svg",
    },
    isSent: true,
  },
  {
    id: "2",
    content:
      "Est, eget est quis ornare vulputate placerat. Odio nunc vitae, vel scelerisque tortor vitae egestas. Donec lobortis mattis pellentesque nisl nibh eu.",
    timestamp: "10:45",
    sender: {
      id: "2",
      name: "Adib Hossain",
      avatar: "/placeholder.svg",
    },
    isSent: false,
  },
];

const members = [
  { id: "1", name: "Arqam Bin Almas", isActive: true },
  { id: "2", name: "Adib Hossain", isActive: true },
  { id: "3", name: "Sadia Jahan Moon", isActive: false },
  { id: "4", name: "Mehdi Hasan Moon", isActive: false },
  { id: "5", name: "Maisha Nanjeeba", isActive: false },
  { id: "6", name: "Rubayet Kabir Zisan", isActive: false },
  { id: "7", name: "ASM Zobayer Hossain", isActive: false },
  { id: "8", name: "Istiaque Ahmed Arik", isActive: false },
  { id: "9", name: "Mir Sayef Ali", isActive: false },
  { id: "10", name: "Shariar Hemel", isActive: false },
  { id: "11", name: "Nafiz Imtiaz Khan", isActive: false },
];

export default function CommunityChat() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className={styles.container}>
            <div className={styles.chatSection}>
              <div className={styles.messageContainer}>
                {messages.map((message) => (
                  <ChatMessage key={message.id} {...message} />
                ))}
              </div>
              <div className={styles.inputContainer}>
                <div className={styles.inputWrapper}>
                  <Input
                    placeholder="Start Typing Your Message..."
                    className={styles.input}
                  />
                  <Button className="bg-green-400 hover:bg-green-500">
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
