import { useState } from 'react';
import { Button } from "@nextui-org/button";
import styles from './notice.module.css';

interface AddNoticeFormProps {
  onAddNotice: (notice: any) => void;
}

export default function AddNoticeForm({ onAddNotice }: AddNoticeFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'admin' | 'teacher'>('teacher');

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // const teacher_id; // Initialize teacher_id must be change after implementing cookies
    const teacher_id = 1001
    const newNotice = {
      teacher_id:teacher_id,
      message_id: Date.now().toString(),
      title,
      content,
      created_at: new Date().toLocaleString(),
      type,
    };
    await onAddNotice(newNotice);
    setTitle('');
    setContent('');
    setType('teacher');
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
          <label className={styles.label}>Notice</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
