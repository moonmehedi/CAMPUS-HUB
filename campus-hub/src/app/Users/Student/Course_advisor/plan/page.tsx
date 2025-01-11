'use client'

import { Sidebar } from "../../Components/sidebar";
import { Header } from "../../Components/header";
import { ProfileDrawer } from "../../Components/profile-drawer";

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-gray-100 m-4 rounded-3xl shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center bg-blue-100 py-2 rounded-lg">Automated Course Adviser</h1>
              <p className="text-lg mt-4 text-center">
                This term, you need to attend the following exams for retake or improvement.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Retake:</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Course Name</th>
                      <th className="px-4 py-2 text-left">Course Code</th>
                      <th className="px-4 py-2 text-left">Credit Hour</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-t px-4 py-2">DSA</td>
                      <td className="border-t px-4 py-2">CSE-205</td>
                      <td className="border-t px-4 py-2">3.00</td>
                      <td className="border-t px-4 py-2">1.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Improvement:</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Course Name</th>
                      <th className="px-4 py-2 text-left">Course Code</th>
                      <th className="px-4 py-2 text-left">Credit Hour</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-t px-4 py-2">DSA</td>
                      <td className="border-t px-4 py-2">CSE-205</td>
                      <td className="border-t px-4 py-2">3.00</td>
                      <td className="border-t px-4 py-2">1.00</td>
                    </tr>
                    <tr>
                      <td className="border-t px-4 py-2">Compiler</td>
                      <td className="border-t px-4 py-2">CSE-305</td>
                      <td className="border-t px-4 py-2">3.00</td>
                      <td className="border-t px-4 py-2">2.75</td>
                    </tr>
                    <tr>
                      <td className="border-t px-4 py-2">Computer Architecture</td>
                      <td className="border-t px-4 py-2">CSE-219</td>
                      <td className="border-t px-4 py-2">3.00</td>
                      <td className="border-t px-4 py-2">3.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
                 <Link href="/Users/Student/Home">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl text-lg">
                Exam Schedule
              </Button>
              </Link>
            </div>
          </main>
          <ProfileDrawer />
        </div>
      </div>
    </div>
  )
}

