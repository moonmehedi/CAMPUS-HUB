import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'; // Changed from DocumentDownloadIcon

// Define interface for the leave details
interface LeaveRequestDetails {
  student_id: string;
  student_name: string;
  leave_date: string;
  class_period: string;
  dept: string;
  course_code: string;
  reason: string;
  document?: string; // Made optional since it might not always be present
}

// Props interface
interface LeaveRequestFormProps {
  leaveDetails: LeaveRequestDetails;
}

export function LeaveRequestForm({ leaveDetails }: LeaveRequestFormProps) {
  const [loading, setLoading] = useState(false);

  // Function to convert hex string to an array of bytes
  function hexToBytes(hex: string | undefined): Uint8Array | null {
    if (!hex) return null;
    const cleanedHex = hex.replace(/^\\x/, '').replace(/\\x/g, '');
    const bytes: number[] = [];
    for (let i = 0; i < cleanedHex.length; i += 2) {
      bytes.push(parseInt(cleanedHex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  }

  // Convert the document from hex string to Blob URL if available
  const documentUrl = leaveDetails.document
    ? URL.createObjectURL(new Blob([hexToBytes(leaveDetails.document) || new Uint8Array()]))
    : null;

  // Function to handle download click
  const handleDownload = () => {
    if (documentUrl) {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = 'leave_document.pdf';
      link.click();
    }
  };

  // Function to update leave status (Approve/Cancel)
  const updateLeaveStatus = async (status: boolean) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/leave/update-leave-status', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: leaveDetails.student_id,
          leave_date: leaveDetails.leave_date,
          class_period: leaveDetails.class_period,
          course_code: leaveDetails.course_code,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update leave status');
      }

      alert(`Leave status updated to ${status ? 'Approved' : 'Cancelled'}`);
      window.location.href = '/Users/Admin/Leave_requests';
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert('Error updating leave status: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Student Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Student Name
            </label>
            <input
              type="text"
              value={leaveDetails.student_name}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Student ID
            </label>
            <input
              type="text"
              value={leaveDetails.student_id}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </label>
            <input
              type="text"
              value={leaveDetails.dept}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course Code
            </label>
            <input
              type="text"
              value={leaveDetails.course_code}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Leave Date
            </label>
            <input
              type="text"
              value={leaveDetails.leave_date}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Class Period
            </label>
            <input
              type="text"
              value={leaveDetails.class_period}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-200 
                       bg-gray-50/50 text-gray-800 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Reason Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Reason for Leave
        </h3>
        <p className="text-gray-700 dark:text-gray-300">
          {leaveDetails.reason}
        </p>
      </div>

      {/* Document Section */}
      {documentUrl && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Supporting Document
          </h3>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 
                     text-gray-700 rounded-lg border border-gray-200 transition-colors
                     shadow-sm hover:shadow"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            <span>Download Document</span>
          </button>

          {/* Action Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => updateLeaveStatus(false)}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg
                       transition-all duration-200 transform hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                       shadow-sm hover:shadow disabled:opacity-50"
            >
              Reject Request
            </button>
            <button
              onClick={() => updateLeaveStatus(true)}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 
                       hover:from-green-600 hover:to-green-700 text-white rounded-lg
                       transition-all duration-200 transform hover:-translate-y-0.5
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                       shadow-sm hover:shadow disabled:opacity-50"
            >
              Approve Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}