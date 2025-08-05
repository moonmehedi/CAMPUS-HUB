require("dotenv").config();

const express = require("express");
const supabase = require("./connection");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session"); // Add this

const app = express();
const PORT = 3000;

// Session configuration - Add this
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true, // Important for cookies
  })
);
app.use(express.json());

// Multer for handling file uploads (stores files in memory)
const upload = multer({ storage: multer.memoryStorage() });

//⚠️import routes from here
const authStudentRouter = require("./src/routes/auth_student");
const authTeacherRouter = require("./src/routes/auth_teacher"); // Add this
const authAdminRouter = require("./src/routes/auth_admin"); // Add this
const noticeRouter = require("./src/routes/notices");
const messageRouter = require("./src/routes/messages");
const attendanceRouter = require("./src/routes/attendance");
const memberRouter = require("./src/routes/members");
const Router1 = require("./src/routes/courseadvisor");
const Router2 = require("./src/routes/leave");
const examRouter = require("./src/routes/exam");
const studentInfo = require("./src/routes/studentInfo");
// Auth routes (no auth middleware needed)
app.use("/auth_student", authStudentRouter); // Add this first
app.use("/auth_teacher", authTeacherRouter);
app.use("/auth_admin", authAdminRouter); // Add this

//⬇️Assign routes to app from here (with auth middleware)
const { requireAuth } = require("./src/middleware/auth"); // Add this

app.use("/notices", requireAuth, noticeRouter);
app.use("/messages", requireAuth, messageRouter);
app.use("/attendance", requireAuth, attendanceRouter);
app.use("/members", requireAuth, memberRouter);
app.use("/courseadvisor", requireAuth, Router1);
app.use("/leave", requireAuth, Router2);
app.use("/exam", requireAuth, examRouter);
app.use("/studentInfo",requireAuth,studentInfo);
//Dummy Homepage to avoid frustration 😅
app.get("/", async (req, res) => {
  res.send("Welcome to CampusHub");
});

// ## dont move it
app.get("/courses-to-exam", async (req, res) => {
  const { student_id } = req.params;
  try {
    const { data, error } = await supabase
      .from("enrolled_courses")
      .select("course_code, grade, course:course_code(name, credit)") // Fetch related course details
      .eq("student_id", req.session.student.student_id)
      .lt("grade", 3.25)
      .order("grade", { ascending: true })
      .limit(3);

    if (error) throw error;

    // Format the response properly
    const formattedData = data.map((item) => ({
      course_code: item.course_code,
      course_name: item.course.name,
      credit: item.course.credit,
      grade: item.grade,
    }));

    res.status(200).json({ success: true, data: formattedData });
  } catch (err) {
    console.error("Error fetching courses for improvement:", err.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching courses",
        error: err.message,
      });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
