const express = require("express");
const router = express.Router();
const supabase = require("../../connection");

// router.get('/', async (req, res) => {
//     const {data,error} = await supabase
//     .from("student")
//     .select("student_id,name,isActive");
//     if (error) {
//         res.status(500).json({ error: error.message });
//     } else {
//         res.status(200).json(data);
//     }
// })
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("student")
    .select("student_id,name,avatar,isActive")
    .order('avatar', { ascending: false, nullsFirst: false });;
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});
// const memberDetails = {
//     student_id: "1",
//     name: "Arqam Bin Almas",
//     avatar: "https://media.licdn.com/dms/image/v2/D5603AQEkIGl2qoJm0A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1674890799757?e=1741824000&v=beta&t=0QbIN20PoAsb-4Jdmfbey0oLtxkYNIwtUq8YT2_xeec",
//     roll: "202214011",
//     batch: "CSE-22",
//     mobile: "01841225706",
//     currentlyWorking: "SoftBank BD",
//   }
router.get("/:id", async (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  console.log(`Student Id feteched:${studentId}`)
  if (isNaN(studentId)) {
    // Check if conversion failed
    return res
      .status(400)
      .json({ error: "Invalid student ID. Must be an integer. from backend" });
  }
  const { data, error } = await supabase
    .from("student")
    .select('student_id,name,avatar,roll,batch,mobile,currentlyWorking')
    .eq("student_id", studentId)
    .single(); // return a single row instead of an array
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
});
module.exports = router;
