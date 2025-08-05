'use client';
import React, { useState, useCallback } from "react";
import { StudentLayout } from "../Components/student-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Clock, User } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

// TypeScript interfaces
interface FormData {
  name: string;
  id: string;
  level: string;
  department: string;
  section: string;
  courseCode: string;
  date: string;
  class_period: string;
  reason: string;
  document: File | null;
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface LeaveApplicationFormProps {
  setIsPopupOpen: (isOpen: boolean) => void;
}

export default function LeaveApplicationPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const currentDateTime = "2025-02-01 13:55:49";
  const currentUser = "maisha27";

  return (
    <StudentLayout>
      <div className="p-6 max-w-7xl mx-auto w-full">
        {/* Time and User Info */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#60A3D9]" />
              <span className="text-gray-700">{currentDateTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <User className="h-5 w-5 text-[#60A3D9]" />
              <span>Welcome, <span className="font-medium text-[#60A3D9]">{currentUser}</span></span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100">
          <LeaveApplicationForm setIsPopupOpen={setIsPopupOpen} />
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-[#60A3D9]">Application Submitted</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">Your application has been submitted successfully. You will be notified of any updates.</p>
          <DialogFooter>
            <Button 
              onClick={() => setIsPopupOpen(false)}
              className="bg-[#60A3D9] hover:bg-[#4A90D9] text-white"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StudentLayout>
  );
}

function LeaveApplicationForm({ setIsPopupOpen }: LeaveApplicationFormProps) {
  const [formData, setFormData] = useState<FormData>({
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
      const response = await fetch("http://localhost:3000/leave/submit-leave-application", {
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
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="bg-[#60A3D9]/10 rounded-t-xl">
        <CardTitle className="text-center text-[#60A3D9] text-2xl">Leave Application</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="ID" name="id" value={formData.id} onChange={handleInputChange} />
            <InputField label="Level" name="level" value={formData.level} onChange={handleInputChange} />
            <InputField label="Department" name="department" value={formData.department} onChange={handleInputChange} />
            <InputField label="Section" name="section" value={formData.section} onChange={handleInputChange} />
            <InputField label="Course Code" name="courseCode" value={formData.courseCode} onChange={handleInputChange} />
            <InputField label="Date" name="date" value={formData.date} onChange={handleInputChange} type="date" />
            <InputField label="Class Period" name="class_period" value={formData.class_period} onChange={handleInputChange} />
          </div>
          
          <div>
            <Label className="text-gray-700">Reason</Label>
            <Textarea 
              name="reason" 
              value={formData.reason} 
              onChange={handleInputChange}
              className="mt-1 focus:ring-[#60A3D9] focus:border-[#60A3D9]"
            />
          </div>
          
          <div>
            <Label className="text-gray-700">Upload Document</Label>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-[#60A3D9] hover:bg-[#4A90D9] text-white transition-all duration-200"
          >
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function InputField({ label, name, value, onChange, type = "text" }: InputFieldProps & { type?: string }) {
  return (
    <div>
      <Label className="text-gray-700">{label}</Label>
      <Input 
        type={type}
        name={name} 
        value={value} 
        onChange={onChange}
        className="mt-1 focus:ring-[#60A3D9] focus:border-[#60A3D9]"
      />
    </div>
  );
}

function FileUpload({ onFileUpload }: { onFileUpload: (file: File) => void }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div 
      {...getRootProps()} 
      className={`mt-1 border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-[#60A3D9] bg-[#60A3D9]/5' : 'border-gray-300 hover:border-[#60A3D9]'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
      <p className="text-gray-600">Drag & drop a file, or click to select one</p>
    </div>
  );
}
