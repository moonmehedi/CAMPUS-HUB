const express = require("express");
const supabase = require("../../connection"); // Import Supabase connection
const router = express.Router();

// Helper function to format attendance data
function make_attendance_table(data) {
    const attendanceDict = {};

    // Process attendance data
    data.forEach(row => {
        const studentId = row.student_id;
        const studentName = row.student_name; // Name fetched from the student table
        const dateKey = ${row.class_period}-${row.date}; // Format: period-YYYY-MM-DD
        
        if (!attendanceDict[studentId]) {
            attendanceDict[studentId] = { name: studentName, records: {} };
        }
        
        attendanceDict[studentId].records[dateKey] = row.present ? "P" : "A";
    });

    // Convert to desired format with sorted dates
    const formattedAttendance = Object.entries(attendanceDict).map(([studentId, data]) => {
        const attendanceStr = Object.entries(data.records)
            .sort(([dateA], [dateB]) => new Date(dateA.split("-")[1]) - new Date(dateB.split("-")[1])) // Sort by full date
            .map(([date, status]) => ${date}:${status})
            .join(", ");
        
        return student_id:${studentId}, name:'${data.name}', ${attendanceStr};
    });

    return formattedAttendance;
}

// ✅ Route to fetch formatted attendance data for a particular course
router.get("/course/:courseCode", async (req, res) => {
    const courseCode = req.params.courseCode;


    try {
        // Query Supabase to fetch attendance data with student names using JOIN
        const { data, error } = await supabase
            .from('attendance')
            .select('student_id, date, class_period, present, student(name)') // Fetch name via JOIN
            .eq('course_code', courseCode);

        if (error) throw error;  // If there's an error, throw it

        // Check if data exists
        if (data.length > 0) {
            const formattedData = make_attendance_table(
                data.map(row => ({
                    ...row,
                    student_name: row.student.name // Extracting name from the nested object
                }))
            );
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

// ✅ Route to fetch attendance for a specific date
router.get("specific-date/attendance", async (req, res) => {
  const date = req.query.date;

  // Check if the date parameter exists
  if (!date) {
    return res.status(400).json({ message: "Date query parameter is required" });
  }

  try {
    console.log("Received Date Parameter from Frontend:", date);

    // Fetch attendance from Supabase based on the date
    const { data, error } = await supabase
      .from("attendance")
      .select("student_id, present, remark, student(name)")
      .eq("class_time", date);

    if (error) {
      throw error;
    }
    console.log(data)
    if (data.length > 0) {
      const formattedData = formatAttendanceData(data);
      return res.status(200).json(formattedData);
    } else {
      return res.status(404).json({ message: "No attendance data found for the specified date." });
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error.message);
    return res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
console.log("listening")
});



// ✅ Route to update attendance records
router.post("/update", async (req, res) => {
    const attendanceData = req.body;

    if (!Array.isArray(attendanceData)) {
        return res.status(400).json({ message: "Invalid attendance data format" });
    }

    try {
        for (const record of attendanceData) {
            const { roll, date, present, remark } = record;

            // Update or insert attendance for the student and date
            const { error } = await supabase
                .from('attendance')
                .upsert({
                    student_id: roll,
                    class_time: date,
                    present: present === "P",
                    remark
                }, { onConflict: ['student_id', 'class_time'] });

            if (error) throw error;
        }

        res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating attendance", error: error.message });
    }
});


module.exports = router;