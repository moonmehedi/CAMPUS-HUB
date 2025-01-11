"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface FormData {
  name: string
  phoneNo: string
  fatherName: string
  motherName: string
  birthday: string
  address: string
  classSection: string
  currentScholarshipStatus: string
  rollNo: string
  registrationNo: string
  reason: string
}

export function ScholarshipForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNo: "",
    fatherName: "",
    motherName: "",
    birthday: "",
    address: "",
    classSection: "",
    currentScholarshipStatus: "",
    rollNo: "",
    registrationNo: "",
    reason: ""
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (formData.name.length < 2) newErrors.name = "Name must be at least 2 characters"
    if (formData.phoneNo.length < 10) newErrors.phoneNo = "Please enter a valid phone number"
    if (formData.fatherName.length < 2) newErrors.fatherName = "Father's name must be at least 2 characters"
    if (formData.motherName.length < 2) newErrors.motherName = "Mother's name must be at least 2 characters"
    if (!formData.birthday) newErrors.birthday = "Please enter your birthday"
    if (formData.address.length < 5) newErrors.address = "Please enter your full address"
    if (!formData.classSection) newErrors.classSection = "Please enter your class section"
    if (!formData.rollNo) newErrors.rollNo = "Please enter your roll number"
    if (!formData.registrationNo) newErrors.registrationNo = "Please enter your registration number"
    if (formData.reason.length < 50) newErrors.reason = "Please provide a detailed explanation (minimum 50 characters)"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      console.log(formData)
      // Handle form submission
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
              />
            </FormControl>
            {errors.name && <FormMessage>{errors.name}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Phone No</FormLabel>
            <FormControl>
              <Input
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleInputChange}
                placeholder="Phone No"
              />
            </FormControl>
            {errors.phoneNo && <FormMessage>{errors.phoneNo}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Father's Name</FormLabel>
            <FormControl>
              <Input
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                placeholder="Father's Name"
              />
            </FormControl>
            {errors.fatherName && <FormMessage>{errors.fatherName}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Mother's Name</FormLabel>
            <FormControl>
              <Input
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                placeholder="Mother's Name"
              />
            </FormControl>
            {errors.motherName && <FormMessage>{errors.motherName}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Birthday</FormLabel>
            <FormControl>
              <Input
                name="birthday"
                value={formData.birthday}
                onChange={handleInputChange}
                placeholder="Birthday"
                type="date"
              />
            </FormControl>
            {errors.birthday && <FormMessage>{errors.birthday}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </FormControl>
            {errors.address && <FormMessage>{errors.address}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Class Section</FormLabel>
            <FormControl>
              <Input
                name="classSection"
                value={formData.classSection}
                onChange={handleInputChange}
                placeholder="Class Section"
              />
            </FormControl>
            {errors.classSection && <FormMessage>{errors.classSection}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Current Scholarship Status</FormLabel>
            <FormControl>
              <Input
                name="currentScholarshipStatus"
                value={formData.currentScholarshipStatus}
                onChange={handleInputChange}
                placeholder="Current Scholarship Status"
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Roll No</FormLabel>
            <FormControl>
              <Input
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
                placeholder="Roll No"
              />
            </FormControl>
            {errors.rollNo && <FormMessage>{errors.rollNo}</FormMessage>}
          </FormItem>
          <FormItem>
            <FormLabel>Registration No</FormLabel>
            <FormControl>
              <Input
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleInputChange}
                placeholder="Registration No"
              />
            </FormControl>
            {errors.registrationNo && <FormMessage>{errors.registrationNo}</FormMessage>}
          </FormItem>
        </div>
        <FormItem>
          <FormLabel>Explain the reason why you want a scholarship</FormLabel>
          <FormControl>
            <Textarea 
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              placeholder="Explain the reason why you want a scholarship" 
              className="min-h-[150px]" 
            />
          </FormControl>
          {errors.reason && <FormMessage>{errors.reason}</FormMessage>}
        </FormItem>
      </div>
      <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
        Submit
      </Button>
    </Form>
  )
}

