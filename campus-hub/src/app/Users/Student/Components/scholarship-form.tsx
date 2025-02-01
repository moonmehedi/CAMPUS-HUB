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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-lg font-medium">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Phone No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Father's Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Father's Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="motherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mother's Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Mother's Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Birthday</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="classSection"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class Section</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Class Section" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentScholarshipStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Scholarship Status</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Current Scholarship Status" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rollNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Roll No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Registration No</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Registration No" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explain the reason why you want a scholarship</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Explain the reason why you want a scholarship"
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
          Submit
        </Button>
      </form>
    </Form>
  )
}

