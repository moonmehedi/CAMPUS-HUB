const express=require('express')
const router=express.Router()
const supabase=require('../../connection')



router.get("/all-result/", async (req, res) => {
    const { student_id } = req.params;
    try {
        console.log('the student id is',req.session.student.student_id)
        const { data, error } = await supabase
        //.from("completed_courses")
        .from("enrolled_courses")
        .select("course_code, grade, course:course_code(name, credit)") // Fetch related course details
        .eq("student_id", req.session.student.student_id);
        if (error) throw error;
        res.status(200).json({ success: true, data });
    } catch (err) {
        console.error("Error fetching courses for improvement:", err.message);
        res.status(500).json({ success: false, message: "Error fetching courses", error: err.message });
    }
  });
  router.get("/attendance/", async (req, res) => {
    const { student_id } = req.params;
    try {
        const { data, error } = await supabase
            .from("attendance")
            .select("date, class_period, course_code, present, remark") // Fetch related course details
            .eq("student_id", req.session.student.student_id)
            .eq("course_code", "309") // Filter by course_code 309
            .order("date", { ascending: true })
            .order("class_period", { ascending: true });
            
  
        if (error) throw error;
  
        // Format the response properly
        const formattedData = data.map(item => ({
            date: item.date,
            class_period: item.class_period,
            course_code: item.course_code,
            present: item.present,
            remark:item.remark
        }));
  
        res.status(200).json({ success: true, data: formattedData });
    } catch (err) {
        console.error("Error fetching courses for improvement:", err.message);
        res.status(500).json({ success: false, message: "Error fetching courses", error: err.message });
    }
  });

router.get("/courses-to-improve/", async (req, res) => {
    const { student_id } = req.params;
    console.log('the student id is',req.session.student.student_id)
    try {
       
        const { data, error } = await supabase
            .from("enrolled_courses")
            .select("course_code, grade, course:course_code(name, credit)") // Fetch related course details
            .eq("student_id", req.session.student.student_id)
            .lt("grade", 3.25)
            .order("grade", { ascending: true });
  
        if (error) throw error;
  
        // Format the response properly
        const formattedData = data.map(item => ({
            course_code: item.course_code,
            course_name: item.course.name,
            credit: item.course.credit,
            grade: item.grade
        }));
  
        res.status(200).json({ success: true, data: formattedData });
    } catch (err) {
        console.error("Error fetching courses for improvement:", err.message);
        res.status(500).json({ success: false, message: "Error fetching courses", error: err.message });
    }
  });



module.exports = router;