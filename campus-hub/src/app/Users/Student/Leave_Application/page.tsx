'use client';

import React, { useState, useCallback } from "react";
import { Sidebar } from "../Components/sidebar";
import { Header } from "../Components/header";
import { ProfileDrawer } from "../Components/profile-drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// Interface for LeaveApplicationForm props
interface LeaveApplicationFormProps {
  setIsPopupOpen: (isOpen: boolean) => void;
}

// Main Leave Application Page
export default function LeaveApplicationPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-100 m-4 rounded-3xl shadow-lg overflow-y-auto">
            <LeaveApplicationForm setIsPopupOpen={setIsPopupOpen} />
          </main>
          <ProfileDrawer />
        </div>
      </div>
      {/* Dialog Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Submitted</DialogTitle>
          </DialogHeader>
          <p>Your application is submitted, you'll be notified.</p>
          <DialogFooter>
            <Button onClick={() => setIsPopupOpen(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Leave Application Form Component
function LeaveApplicationForm({ setIsPopupOpen }: LeaveApplicationFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-blue-100 rounded-t-lg">
        <CardTitle className="text-center">Leave Application</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id">ID</Label>
              <Input id="id" placeholder="Enter your ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input id="level" placeholder="Enter your level" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Enter your department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input id="section" placeholder="Enter your section" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseCode">Course Code</Label>
              <Input id="courseCode" placeholder="Enter course code" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Explain the reason why you want a leave"
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="documents">Upload Necessary Documents</Label>
            <FileUpload />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// File Upload Component
function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      {isDragActive ? (
        <p className="mt-2">Drop the files here...</p>
      ) : (
        <p className="mt-2">
          Drag 'n' drop some files here, or click to select files
        </p>
      )}
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">{files.length} file(s) selected</p>
        </div>
      )}
    </div>
  );
}
