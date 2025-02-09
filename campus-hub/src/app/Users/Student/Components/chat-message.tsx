import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '../styles/chat.module.css'

interface ChatMessageProps {
  content: string
  timestamp: string
  sender: {
    name: string
    avatar?: string
  }
  isSent: boolean
}

export function ChatMessage({ content, timestamp, sender, isSent }: ChatMessageProps) {
  return (
    <div className={`${styles.message} ${isSent ? styles.sent : ''}`}>
      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
        <AvatarImage src={sender.avatar} alt={sender.name} />
        <AvatarFallback className="bg-blue-100 text-blue-600">
          {sender.name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        {!isSent && (
          <div className="text-sm font-medium text-gray-700 mb-1 ml-1">
            {sender.name}
          </div>
        )}
        <div className={styles.messageContent}>{content}</div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  )
}