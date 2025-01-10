'use client'

import { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ProgressBar } from "../Components/progress-bar"

interface CSVUploadProps {
  onUploadComplete: (data: string) => void
}

export function CSVUpload({ onUploadComplete }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a CSV file to upload')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulating file upload and processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      console.log('CSV data:', text)
      onUploadComplete(text)
    }
    reader.readAsText(file)

    setIsUploading(false)
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
      {isUploading && (
        <div className="mt-4">
          <ProgressBar progress={uploadProgress} />
          <p className="text-center mt-2">{uploadProgress}% Complete</p>
        </div>
      )}
    </div>
  )
}

