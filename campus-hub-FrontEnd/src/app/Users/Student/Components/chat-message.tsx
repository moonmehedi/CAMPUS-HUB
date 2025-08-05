import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import styles from '../styles/chat.module.css'

interface ChatMessageProps {
  content: string
  timestamp: string
  sender: {
    name: string
  }
  isSent: boolean
}

export function ChatMessage({ content, timestamp, sender, isSent }: ChatMessageProps) {
  return (
    <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage alt={sender.name} />
        <AvatarFallback>{sender.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className={styles.messageContent}>{content}</div>
        <div className={styles.timestamp}>{timestamp}</div>
      </div>
    </div>
  )
}
