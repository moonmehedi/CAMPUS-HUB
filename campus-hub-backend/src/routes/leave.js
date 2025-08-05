const express=require('express')
const router=express.Router()
const supabase=require('../../connection')

const multer = require("multer");

// Multer for handling file uploads (stores files in memory)
const upload = multer({ storage: multer.memoryStorage() });

// Route to fetch all leave requests

router.get("/leave-requests", async (req, res) => {
    try {
        console.log("talking............");
        const { data, error } = await supabase
            .from("leave")
            .select("*")
            .is("status", null);  // Filter for rows where status is NULL
        console.log(data);
        if (error) throw error;
  
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error fetching leave requests:", error.message);
        res.status(500).json({ success: false, message: "Error fetching leave requests", error: error.message });
    }
  });
  /**
 * ✅ Approve or reject a leave request
 */
  router.post("/update-leave-status", async (req, res) => {
    const { student_id, leave_date, class_period, course_code, status } = req.body;
  
    try {
      if (status !== true && status !== false) {
        return res.status(400).json({ success: false, message: "Invalid status value. It must be true or false." });
      }
  
      const { error } = await supabase
        .from("leave")
        .update({ status })
        .match({ student_id, leave_date, class_period, course_code });
  
      if (error) throw error;
  
      // If approved, update the attendance remark
      if (status) {
        await supabase
          .from("attendance")
          .update({ remark: "Approved" })
          .match({ student_id, date: leave_date, class_period, course_code });
      }
      else {
        await supabase
          .from("attendance")
          .update({ remark: "Rejected" })
          .match({ student_id, date: leave_date, class_period, course_code });
      }
  
      res.status(200).json({
        success: true,
        message: `Leave status updated to ${status ? 'approved' : 'cancelled'}`,
      });
    } catch (error) {
      console.error("Error updating leave status:", error.message);
      res.status(500).json({ success: false, message: "Error updating leave status", error: error.message });
    }
  });
  router.get("/leave-requests/:student_id", async (req, res) => {
    const { student_id } = req.params;
 
    try {
      const { data, error } = await supabase
        .from("leave")
        .select("*")
        .eq("student_id", student_id)
        .is("status", null);
      if (error) throw error;
      if (!data || data.length === 0) {
        return res.status(404).json({ success: false, message: "Leave request not found" });
      }
 
      res.status(200).json({ success: true, data: data[0] });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error fetching leave request details" });
    }
  });
 
  router.post("/submit-leave-application", upload.single("document"), async (req, res) => {
    try {
        const { name, id, level, department, section, courseCode, date, class_period, reason } = req.body;
        const document = req.file ? req.file.buffer : null; // Extract file as binary
        if (!name || !id || !courseCode || !date || !class_period || !reason) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        // Prepare data to insert
        const newLeaveData = {
            student_id: parseInt(id),
            leave_date: date,
            class_period: parseInt(class_period),
            course_code: parseInt(courseCode),
            student_name: name,
            dept: department,
            reason,
            document, // Add document binary data
        };
        console.log("Data to insert:", newLeaveData);
        // Insert data into Supabase
        const { data, error } = await supabase.from("leave").insert([newLeaveData]);
        if (error) throw error;
        res.status(200).json({ success: true, message: "Leave application submitted successfully", data });
    } catch (error) {
        console.error("Error submitting leave application:", error.message);
        res.status(500).json({ success: false, message: "Error submitting leave application", error: error.message });
    }
});



module.exports = router;