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

interface LeaveApplicationFormProps {
  setIsPopupOpen: (isOpen: boolean) => void;
}

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

function LeaveApplicationForm({ setIsPopupOpen }: LeaveApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    level: "",
    department: "",
    section: "",
    courseCode: "",
    date: "",
    class_period: "",
    reason: "",
    document: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("id", formData.id);
    data.append("level", formData.level);
    data.append("department", formData.department);
    data.append("section", formData.section);
    data.append("courseCode", formData.courseCode);
    data.append("date", formData.date);
    data.append("class_period", formData.class_period);
    data.append("reason", formData.reason);

    if (formData.document) {
      data.append("document", formData.document);
    }

    try {
      const response = await fetch("http://localhost:3000/submit-leave-application", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setIsPopupOpen(true);
        console.log("Application submitted successfully.");
      } else {
        console.error("Failed to submit the application.");
      }
    } catch (error) {
      console.error("Error submitting the application:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = useCallback((file: File) => {
    setFormData((prevData) => ({
      ...prevData,
      document: file,
    }));
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="bg-blue-100 rounded-t-lg">
        <CardTitle className="text-center">Leave Application</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="ID" name="id" value={formData.id} onChange={handleInputChange} />
            <InputField label="Level" name="level" value={formData.level} onChange={handleInputChange} />
            <InputField label="Department" name="department" value={formData.department} onChange={handleInputChange} />
            <InputField label="Section" name="section" value={formData.section} onChange={handleInputChange} />
            <InputField label="Course Code" name="courseCode" value={formData.courseCode} onChange={handleInputChange} />
            <InputField label="Date" name="date" value={formData.date} onChange={handleInputChange} />
            <InputField label="Class Period" name="class_period" value={formData.class_period} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Reason</Label>
            <Textarea name="reason" value={formData.reason} onChange={handleInputChange} />
          </div>
          <div>
            <Label>Upload Document</Label>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function InputField({ label, name, value, onChange }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Input name={name} value={value} onChange={onChange} />
    </div>
  );
}

function FileUpload({ onFileUpload }: { onFileUpload: (file: File) => void }) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 p-4 rounded-md">
      <input {...getInputProps()} />
      <p>Drag & drop a file, or click to select one</p>
    </div>
  );
}
