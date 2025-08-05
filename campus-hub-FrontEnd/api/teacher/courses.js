const express = require("express");
const router = express.Router();
const supabase = require("../../connection");
const { getCurrentTimestamp } = require('../utils/timestamp');

// Fetch courses for the teacher
router.get("/", async (req, res) => {
  const timestamp = getCurrentTimestamp();

  try {
    const teacherId = req.session.teacherId; // Assuming teacherId is stored in session

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
