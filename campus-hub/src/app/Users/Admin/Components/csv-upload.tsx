import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ProgressBar } from "../Components/progress-bar";

interface CSVUploadProps {
  onUploadComplete: (file: File) => void;
}

export function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please upload a valid CSV file.');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file to upload');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setUploadProgress(i);
    }

    // Pass the file to the parent component
    onUploadComplete(file);

    setIsUploading(false);
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Upload CSV for Batch Training</h3>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="flex-1 p-2 border rounded"
          disabled={isUploading}
          ref={fileInputRef}
        />
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="flex items-center"
        >
          <Upload className="mr-2 h-4 w-4" />
          {isUploading ? 'Uploading...' : 'Upload CSV'}
        </Button>
      </div>
      {file && !isUploading && (
        <p className="mt-2 text-sm text-gray-700">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}
      {isUploading && (
        <div className="mt-4">
          <ProgressBar progress={uploadProgress} />
          <p className="text-center mt-2">{uploadProgress}% Complete</p>
        </div>
      )}
    </div>
  );
}