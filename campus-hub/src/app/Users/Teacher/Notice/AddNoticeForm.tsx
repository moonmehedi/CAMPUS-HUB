import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Plus, Send, AlertCircle, X } from 'lucide-react';
import styles from './notice.module.css';
import { motion, AnimatePresence } from 'framer-motion';

interface AddNoticeFormProps {
  onAddNotice: (notice: any) => void;
}

export default function AddNoticeForm({ onAddNotice }: AddNoticeFormProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'admin' | 'teacher'>('teacher');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const teacher_id = localStorage.getItem('teacherId');
      const newNotice = {
        teacher_id: teacher_id ? parseInt(teacher_id) : 0,
        message_id: Date.now().toString(),
        title,
        content,
        created_at: new Date().toLocaleString(),
        type,
      };
      await onAddNotice(newNotice);
      handleReset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTitle('');
    setContent('');
    setType('teacher');
    setIsFormOpen(false);
  };

  if (!isFormOpen) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          color="primary"
          className="w-full shadow-lg hover:shadow-xl transition-shadow"
          onClick={() => setIsFormOpen(true)}
          startContent={<Plus className="animate-bounce" size={16} />}
          size="lg"
        >
          Create New Notice
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={styles.formContainer}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle className="text-primary" size={24} />
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Create New Notice
            </h3>
          </div>
          <motion.div
            whileHover={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              isIconOnly
              variant="light"
              onClick={handleReset}
              size="sm"
              className="hover:bg-red-100"
            >
              <X size={16} className="text-red-500" />
            </Button>
          </motion.div>
        </div>

        <motion.form 
          className={styles.addNoticeForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Title
              <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              placeholder="Enter a descriptive title"
              required
              maxLength={100}
              whileFocus={{ scale: 1.01 }}
            />
            <span className="text-sm text-gray-500 mt-1">
              {title.length}/100 characters
            </span>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Notice Content
              <span className="text-red-500 ml-1">*</span>
            </label>
            <motion.textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              placeholder="Enter the notice content..."
              required
              maxLength={1000}
              whileFocus={{ scale: 1.01 }}
            />
            <span className={`text-sm ${content.length >= 900 ? 'text-red-500' : 'text-gray-500'} mt-1`}>
              {content.length}/1000 characters
            </span>
          </div>

          <motion.div 
            className="flex gap-3 justify-end mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              type="button"
              variant="flat"
              color="danger"
              onClick={handleReset}
              startContent={<X size={16} />}
              className="hover:bg-red-100"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              startContent={<Send size={16} />}
              className="shadow-lg hover:shadow-xl transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Posting...
                </>
              ) : (
                'Post Notice'
              )}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}