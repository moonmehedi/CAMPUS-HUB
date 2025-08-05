const express = require("express");
const router = express.Router();
const supabase = require("../../connection");

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("timestamp", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    const transformedData = data.map((item) => {
      if (item.timestamp) {
        const originalTimestamp = new Date(item.timestamp);
        const formattedTimestamp = originalTimestamp
          .toISOString()
          .replace("T", " ")
          .slice(0, 19);
        return { ...item, timestamp: formattedTimestamp };
      }
      return item;
    });
    res.status(200).json(transformedData);
  }
});
router.post("/", async (req, res) => {
  const { content, student_id } = req.body;
  console.log(`Message Recived from frontend:${content} with studentId:${student_id} as ${typeof student_id}`)
  try {
    const formattedTimestamp = new Date().toISOString()
      .replace("T", " ")
      .slice(0, 19);
      console.log(`Content:${content} StudentId:${student_id}`)
    const { data, error } = await supabase.from("messages").insert({
      content: content,
      student_id: student_id,
      timestamp: formattedTimestamp,
    });
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Message Sent Succesfully ", data });
  } catch (err) {
    res.status(500).json({ err: "Internal server error" });
  }
});
module.exports = router;
