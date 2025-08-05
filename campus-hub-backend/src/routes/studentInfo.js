const express = require("express");
const router = express.Router();
const supabase = require("../../connection");

// name: string;
// department: string;
// roll: string;
// reg_no: string;
// dob: string;
// gender: string;
// mobile: string;
// email: string;
// batch: string;
// class_section: string;
// student_category: string;
// syllabus: string;
// dept_name: string;
// father_name: string;
// mother_name: string;
// avatar: string;
router.get("/:id", async (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { data, error } = await supabase
    .from("student")
    .select(
      "name,dept_name,roll,reg_no,dob,gender,mobile,email,batch,batch,class_section,student_category,syllabus,father_name,mother_name,avatar"
    )
    .eq("student_id", studentId)
    .single();
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});
module.exports = router;
