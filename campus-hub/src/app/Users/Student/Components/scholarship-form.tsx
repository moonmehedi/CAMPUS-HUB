"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNo: z.string().min(10, "Please enter a valid phone number"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
  birthday: z.string().min(1, "Birthday is required"),
  address: z.string().min(5, "Please enter your full address"),
  classSection: z.string().min(1, "Class section is required"),
  currentScholarshipStatus: z.string(),
  rollNo: z.string().min(1, "Roll number is required"),
  registrationNo: z.string().min(1, "Registration number is required"),
  reason: z.string().min(50, "Please provide a detailed explanation (minimum 50 characters)"),
})

type FormData = z.infer<typeof formSchema>

interface ScholarshipFormProps {
  onSubmit: (data: FormData) => void
}

export function ScholarshipForm({ onSubmit }: ScholarshipFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      reason: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* All form fields remain the same but with updated styling */}
            {Object.keys(form.getValues()).map((fieldName) => {
              if (fieldName === 'reason') return null; // Handle separately
              return (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName as keyof FormData}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium text-gray-700">
                        {fieldName
                          .replace(/([A-Z])/g, ' $1')
                          .replace(/^./, str => str.toUpperCase())
                          .replace('No', 'Number')}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder={`Enter ${fieldName
                            .replace(/([A-Z])/g, ' $1')
                            .toLowerCase()}`}
                          className="h-12 text-base px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          type={fieldName === 'birthday' ? 'date' : 'text'}
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Reason Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium text-gray-700">
                  Explain the reason why you want a scholarship
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Explain the reason why you want a scholarship"
                    className="min-h-[200px] text-base p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button - Centered */}
        <div className="flex justify-center pt-8">
          <Button 
            type="submit" 
            className="h-12 px-8 text-lg bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors duration-200"
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Form>
  )
}