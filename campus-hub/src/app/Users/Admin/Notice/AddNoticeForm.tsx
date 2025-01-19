import { useState } from 'react';
import { Button } from "@nextui-org/button";
import styles from './notice.module.css';

interface AddNoticeFormProps {
  onAddNotice: (notice: any) => void;
}

export default function AddNoticeForm({ onAddNotice }: AddNoticeFormProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'urgent' | 'info'>('info');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice = {
      user_id: 'admin',
      message_id: Date.now().toString(),
      title,
      message,
      timestamp: new Date().toLocaleString(),
      type,
    };
    onAddNotice(newNotice);
    setTitle('');
    setMessage('');
    setType('info');
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.addNoticeForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.textarea}
            required
          />
        {/* <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <select 
          value={type} 
          onChange={(e) => setType(e.target.value as 'urgent' | 'info')}
          className={styles.select}
          >
          <option value="info">Info</option>
          <option value="urgent">Urgent</option>
          </select>
          </div> */}
          </div>
<Button type="submit" color="primary" className={styles.button}>Add Notice</Button>
          </form>
        </div>
  );
}
