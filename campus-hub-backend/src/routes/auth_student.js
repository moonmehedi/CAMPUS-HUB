const express = require("express");
const router = express.Router();
const supabase = require("../../connection");
const { getCurrentTimestamp } = require("../utils/timestamp");

// Login route
router.post("/", async (req, res) => {
    const timestamp = getCurrentTimestamp();

    try {
        const { student_id, password } = req.body;

        // Fetch complete student data except password
        const { data: student, error } = await supabase
            .from("student")
            .select(
                "student_id, name, roll, reg_no, dob, gender, mobile, email, batch, class_section, student_category, syllabus, dept_name, father_name, mother_name, isActive"
            )
            .eq("student_id", student_id)
            .single();

        if (error || !student) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID or password",
                timestamp,
            });
        }

        // Validate password
        const { data: passData, error: passError } = await supabase
            .from("student")
            .select("password")
            .eq("student_id", student_id)
            .single();

        if (passError || passData.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID or password",
                timestamp,
            });
        }

        // Store student info in session
        req.session.student = { ...student, loginTime: timestamp };
        console.log(req.session.student);

        console.log(`[${timestamp}] Student ID ${student.student_id} logged in successfully`);

        res.json({
            success: true,
            message: "Login successful",
            student: student,
            timestamp,
        });

    } catch (error) {
        console.error(`[${timestamp}] Login error:`, error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            timestamp,
        });
    }
});

// Retrieve session data
router.get("/session", (req, res) => {
    if (req.session.student) {
        console.log("Session data:", req.session.student);
        res.json({ success: true, student: req.session.student });
    } else {
        res.json({ success: false, message: "Not logged in" });
    }
});

// Logout route
router.post("/logout", (req, res) => {
    if (!req.session.student) {
        return res.status(401).json({
            success: false,
            message: "Not logged in",
        });
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed",
            });
        }

        res.clearCookie("connect.sid");
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    });
});

module.exports = router;
