import { useState } from 'react';

export function LeaveRequestForm({ leaveDetails }) {
  const [loading, setLoading] = useState(false);

  // Function to convert hex string to an array of bytes (handle any extra characters)
  function hexToBytes(hex) {
    if (!hex) return null;
    const cleanedHex = hex.replace(/^\\x/, '').replace(/\\x/g, '');
    const bytes = [];
    for (let i = 0; i < cleanedHex.length; i += 2) {
      bytes.push(parseInt(cleanedHex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  }

  // Convert the document from hex string to Blob URL if available
  const documentUrl = leaveDetails.document
    ? URL.createObjectURL(new Blob([hexToBytes(leaveDetails.document)]))
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
  const updateLeaveStatus = async (status) => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/leave/update-leave-status', {  // Correct URL for the POST request
        method: 'POST',
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

      // Optionally handle successful update (e.g., show success message)
      alert(`Leave status updated to ${status ? 'Approved' : 'Cancelled'}`);
      window.location.href = '/Users/Admin/Leave_requests';
    } catch (error) {
      // Handle error (e.g., show error message)
      alert('Error updating leave status: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-semibold mb-6">Leave Request Details</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> {leaveDetails.student_name}</p>
        <p><strong>ID:</strong> {leaveDetails.student_id}</p>
        <p><strong>Department:</strong> {leaveDetails.dept}</p>
        <p><strong>Course Code:</strong> {leaveDetails.course_code}</p>
        <p><strong>Date:</strong> {leaveDetails.leave_date}</p>
        <p><strong>Period:</strong> {leaveDetails.class_period}</p>
        <p><strong>Reason:</strong> {leaveDetails.reason}</p>

        {/* Display the document if available */}
        {documentUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Supporting Document</h2>
            <button
              onClick={handleDownload}
              className="bg-white text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300"
            >
              Download the document
            </button>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => updateLeaveStatus(false)} // Cancel updates status to false
                disabled={loading}
                className="bg-white text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => updateLeaveStatus(true)} // Approve updates status to true
                
                

                disabled={loading}
                className="bg-white text-black border-2 border-black py-2 px-4 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Approve 
              </button>
             

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
