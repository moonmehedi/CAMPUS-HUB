const express = require("express");
const supabase = require("../../connection"); // Import Supabase connection
const router = express.Router();
const { getCurrentTimestamp } = require('../utils/timestamp');


// Helper function to format attendance data
function make_attendance_table(data) {
    const attendanceDict = {};

    // Process attendance data
    data.forEach(row => {
        const studentId = row.student_id;
        const studentName = row.student_name; // Name fetched from the student table
        const dateKey = `${row.class_period}-${row.date}`; // Format: period-YYYY-MM-DD
        
        if (!attendanceDict[studentId]) {
            attendanceDict[studentId] = { name: studentName, records: {} };
        }
        
        attendanceDict[studentId].records[dateKey] = row.present ? "P" : "A";
    });

    // Convert to desired format with sorted dates
    const formattedAttendance = Object.entries(attendanceDict).map(([studentId, data]) => {
        const attendanceStr = Object.entries(data.records)
            .sort(([keyA], [keyB]) => {
                const dateA = keyA.split("-").slice(1).join("-"); // Extract YYYY-MM-DD
                const dateB = keyB.split("-").slice(1).join("-"); // Extract YYYY-MM-DD
                return new Date(dateA) - new Date(dateB);
            })
            .map(([date, status]) => `${date}:${status}`)
            .join(", ");

        return `student_id: ${studentId}, name: '${data.name}', ${attendanceStr}`;
    });

    return formattedAttendance;
}



// ✅ Route to fetch formatted attendance data for a particular course
router.get("/course/:courseCode", async (req, res) => {
    const courseCode = req.params.courseCode;

    console.log("Received request for course:", req.params.courseCode);
    try {
        // Query Supabase to fetch attendance data with student names using JOIN
        const { data, error } = await supabase
            .from('attendance')
            .select('student_id, date, class_period, present, student(name)') // Fetch name via JOIN
            .eq('course_code', courseCode);

        if (error) throw error;  // If there's an error, throw it

        console.log(data)

        // Check if data exists
        if (data.length > 0) {
            const formattedData = make_attendance_table(
                data.map(row => ({
                    ...row,
                    student_name: row.student.name // Extracting name from the nested object
                }))
            );
            console.log(formattedData)
            res.status(200).json({ attendance: formattedData });  // Return formatted attendance data as JSON
        } else {
            res.status(404).json({ message: 'No attendance records found for this course.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance data', error: error.message });
    }
});





//rest part


// Helper function to format fetched attendance for a specific date
function formatAttendanceData(data) {
  return data.map(row => ({
    rollNumber: row.student_id,
    name: row.student.name,
    attendance: row.present,
    remark: row.remark || "",
  }));
}
router.get("/by-date", async (req, res) => {
  let { courseCode, date } = req.query;

  if (!courseCode || !date) {
    return res.status(400).json({ 
      message: "Both courseCode and date query parameters are required" 
    });
  }

  try {
    const { classPeriod, formattedDate } = get_date_and_period(date);

    console.log(`Fetching attendance for course: ${courseCode}, date: ${formattedDate}, period: ${classPeriod}`);

    // Query Supabase with correctly formatted date and class period
    const { data, error } = await supabase
      .from("attendance")
      .select("student_id, present, remark, student(name)")
      .eq("course_code", courseCode)
      .eq("date", formattedDate) // Use extracted correct date
      .eq("class_period", classPeriod); // Use extracted period

    if (error) throw error;

    if (data.length > 0) {
      const formattedData = data.map(row => ({
        rollNumber: row.student_id,
        name: row.student?.name || "Unknown",
        attendance: row.present,
        remark: row.remark || "",
      }));

      return res.status(200).json(formattedData);
    } else {
      return res.status(404).json({ 
        message: "No attendance data found for the specified course, date, and period." 
      });
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error.message);
    return res.status(500).json({ 
      message: "Error fetching attendance data", 
      error: error.message 
    });
  }
});




// ✅ Route to update attendance records
router.post("/update", async (req, res) => {
  const attendanceData = req.body;

  if (!Array.isArray(attendanceData)) {
    return res.status(400).json({ message: "Invalid attendance data format" });
  }

  try {
    for (const record of attendanceData) {
      const { roll, date, present, remark, courseCode } = record;

      if (!roll || !date || !present || !courseCode) {
        return res.status(400).json({ message: "Missing required attendance fields" });
      }

      const { classPeriod, formattedDate } = get_date_and_period(date);


      // Update or insert attendance for the student, course, date, and class period
      const { error } = await supabase
        .from("attendance")
        .upsert(
          {
            student_id: roll,
            course_code: courseCode,
            date: formattedDate,
            class_period: classPeriod,
            present: present === "P",
          },
          { onConflict: ["student_id", "course_code", "date", "class_period"] }
        );

      if (error) throw error;
    }

    res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating attendance", error: error.message });
  }
});

module.exports = router;




function get_date_and_period(date) {
    const parts = date.split("-");
    return {
        classPeriod: parts[0],
        formattedDate: parts.slice(1).join("-")
    };
}








// Fetch courses for the teacher
router.get("/teacher/courses", async (req, res) => {
  const timestamp = getCurrentTimestamp();

  try {
    const teacherId = req.session.teacher.teacher_id; // Assuming teacherId is stored in session
    console.log(`[${timestamp}] Fetching courses for teacher ID: ${teacherId}`);
    if (!teacherId) {
      return res.status(401).json({
        success: false,
        message: "Not logged in",
        timestamp,
      });
    }

    // Fetch courses for the teacher
    const { data: courses, error } = await supabase
      .from("teacher_courses")
      .select("course:course_code (code:course_code, name, credit, type:Course_type)")
      .eq("teacher_id", teacherId);
    console.log(courses)
    if (error) {
      throw error;
    }

    res.json({
      success: true,
      courses: courses.map(course => course.course),
      timestamp,
    });
  } catch (error) {
    console.error(`[${timestamp}] Error fetching courses:`, error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      timestamp,
    });
  }
});













module.exports = router;