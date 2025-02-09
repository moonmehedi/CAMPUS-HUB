"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "../Components/chat-message";
import { MembersList } from "../Components/member-list";
import { StudentLayout } from "../Components/student-layout";

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
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQEkIGl2qoJm0A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674890799757?e=1741824000&v=beta&t=0QbIN20PoAsb-4Jdmfbey0oLtxkYNIwtUq8YT2_xeec",
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
      avatar: "https://www.mist.ac.bd/storage/files/cse/members/Adib.JPG",
    },
    isSent: false,
  },
];

const members = [
  {
    id: "1",
    name: "Arqam Bin Almas",
    isActive: true,
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQEkIGl2qoJm0A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674890799757?e=1741824000&v=beta&t=0QbIN20PoAsb-4Jdmfbey0oLtxkYNIwtUq8YT2_xeec ",
  },
  {
    id: "2",
    name: "Adib Hossain",
    isActive: true,
    avatar: "https://www.mist.ac.bd/storage/files/cse/members/Adib.JPG",
  },
  {
    id: "3",
    name: "Mehedi Hasan Moon",
    isActive: false,
    avatar:
      "https://uniplex.mist.ac.bd:8443/admission-api/files/view/0918307f-37a2-4fc5-b77d-28b6e8e020e2/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIwOTE4MzA3Zi0zN2EyLTRmYzUtYjc3ZC0yOGI2ZThlMDIwZTIiLCJleHAiOjE3MzY2ODI3NjUsImlhdCI6MTczNjU5NjM2NX0.kjLRhjmnQRXrOlwcxNrhu7oKaPl0R3DazEgrhtd55a8",
  },
  { id: "4", name: "Sadia Jahan Moon", isActive: false },
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
    <StudentLayout>
      <div className="h-full flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-l-[30px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FF]">
            <h2 className="text-xl font-semibold text-gray-800">Community Chat</h2>
            <p className="text-sm text-gray-600">
              {members.filter(m => m.isActive).length} members online
            </p>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} {...message} />
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-3 items-center">
              <Input
                placeholder="Start typing your message..."
                className="flex-1 h-12 px-4 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button 
                className="h-12 px-6 bg-[#60A3D9] hover:bg-[#4A90D9] text-white rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Members List - Styled Sidebar */}
        <div className="w-80 bg-white rounded-r-[30px] border-l overflow-hidden">
          <div className="p-4 border-b bg-gradient-to-r from-[#F0F7FF] to-[#E6F0FF]">
            <h3 className="text-lg font-semibold text-gray-800">Members</h3>
            <p className="text-sm text-gray-600">{members.length} total</p>
          </div>
          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            <MembersList members={members} />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}