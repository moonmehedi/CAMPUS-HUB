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
  const [type,setType] = useState<'admin' | 'teacher'>('admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const admin_id = 3; // This should be dynamic later
      const newNotice = {
        admin_id,
        title: title.trim(),
        content: content.trim(),
        created_at: new Date().toISOString(),
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
    setIsFormOpen(false);
    setType('admin')
  };
  return (
    <AnimatePresence>
      {!isFormOpen ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full max-w-3xl mx-auto"
        >
          <Button
            color="danger"
            className="w-full shadow-lg hover:shadow-xl transition-shadow rounded-xl py-6"
            onClick={() => setIsFormOpen(true)}
            startContent={<Plus className="animate-bounce" size={16} />}
            size="lg"
          >
            Create New Admin Notice
          </Button>
        </motion.div>
      ) : (
        <div className={styles.formWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={styles.formContainer}
        >
          <div className="flex justify-between items-center mb-8 border-b border-red-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-full">
                <AlertCircle className="text-red-500" size={24} />
              </div>
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                Create Admin Notice
              </h3>
            </div>
            <motion.div
              whileHover={{ rotate: 90, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                isIconOnly
                variant="light"
                onClick={handleReset}
                size="sm"
                className="hover:bg-red-50 rounded-full w-10 h-10"
              >
                <X size={18} className="text-red-500" />
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
            <div className="space-y-6">
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
                  placeholder="Enter a descriptive title..."
                  required
                  maxLength={100}
                  whileFocus={{ scale: 1.005 }}
                />
                <span className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <div className={`h-1 w-24 rounded-full bg-gray-200 overflow-hidden`}>
                    <div 
                      className={`h-full transition-all duration-300 ${
                        title.length > 80 ? 'bg-red-400' : 'bg-red-200'
                      }`}
                      style={{ width: `${(title.length / 100) * 100}%` }}
                    />
                  </div>
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
                  whileFocus={{ scale: 1.005 }}
                  rows={6}
                />
                <span className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <div className={`h-1 w-24 rounded-full bg-gray-200 overflow-hidden`}>
                    <div 
                      className={`h-full transition-all duration-300 ${
                        content.length > 900 ? 'bg-red-400' : 'bg-red-200'
                      }`}
                      style={{ width: `${(content.length / 1000) * 100}%` }}
                    />
                  </div>
                  {content.length}/1000 characters
                </span>
              </div>
            </div>

            <motion.div 
              className="flex gap-3 justify-end mt-8 pt-4 border-t border-red-50"
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
                className="hover:bg-red-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="danger"
                startContent={<Send size={16} />}
                className="shadow-lg hover:shadow-xl transition-all px-6"
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
        </div>
      )}
    </AnimatePresence>
  );
}