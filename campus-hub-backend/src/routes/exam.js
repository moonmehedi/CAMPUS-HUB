const express = require("express");
const router = express.Router();
const supabase = require("../../connection");

// Test route
router.get("/test", (req, res) => {
  res.json({ 
    message: "Exam routes are working",
    currentTime: new Date().toISOString(),
    status: "OK" 
  });
});
// Get exams within a date range
// In your backend exam.js route
// Get all exams
router.get("/show", async (req, res) => {
  console.log('Current teacher:', req.session.teacher);

  try {
    // Get all exams with teacher information
    const { data: exams, error } = await supabase
      .from("exam_schedules")
      .select(`
        *,
        teacher:teacher_id (
          teacher_id,
          name
        )
      `)
      .order("exam_date", { ascending: true })
      .order("start_time", { ascending: true });

    if (error) {
      console.error(`[${timestamp}] Database error:`, error);
      throw error;
    }

    if (!exams || exams.length === 0) {
      console.log(`[${timestamp}] No exams found`);
      return res.status(204).end();
    }

    // Transform the data to include teacher information
    const currentTeacherId = req.session.teacher?.teacher_id;
    const transformedExams = exams.map(exam => ({
      ...exam,
      teacher_name: exam.teacher_id === currentTeacherId ? 'You' : exam.teacher?.name || 'Unknown Teacher',
      is_own_exam: exam.teacher_id === currentTeacherId
    }));

    
    res.json(transformedExams);

  } catch (err) {
    console.error(`[${timestamp}] Error fetching exams:`, err);
    res.status(500).json({ 
      error: 'Failed to fetch exam schedules',
      details: err.message 
    });
  }
});
// Create new exam
router.post("/", async (req, res) => {
  console.log('talking1');
  const {
    teacher_id,
    exam_name,
    exam_type,
    exam_date,
    start_time,
    end_time,
    room_number
  } = req.body;

  try {
    // Check for conflicts
    const { data: conflicts, error: conflictError } = await supabase
      .from("exam_schedules")
      .select("*")
      .eq("exam_date", exam_date)
      .eq("room_number", room_number)
      .or(`start_time.lte.${end_time},end_time.gte.${start_time}`);

    if (conflictError) throw conflictError;

    if (conflicts && conflicts.length > 0) {
      return res.status(400).json({
        error: "There is a scheduling conflict with another exam in this room"
      });
    }
    console.log('data');
    // Insert new exam
    const { data, error } = await supabase
      .from("exam_schedules")
      .insert([{
        teacher_id,
        exam_name,
        exam_type,
        exam_date,
        start_time,
        end_time,
        room_number
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error("Error creating exam:", err);
    res.status(500).json({ error: err.message });
  }
});

// Update exam route with proper error handling and exam_date
// In your backend exam.js
// In your backend exam.js
router.put("/edit/:exam_id", async (req, res) => {
  const { exam_id } = req.params;
  const {
    exam_name,
    exam_type,
    exam_date,
    start_time,
    end_time,
    room_number,
    teacher_id
  } = req.body;

  console.log('Received update request:', {
    exam_id,
    exam_name,
    exam_type,
    exam_date,
    start_time,
    end_time,
    room_number
  });

  try {
    // Convert time strings to proper time format
    const formattedStartTime = start_time.split(':').length === 2 
      ? `${start_time}:00` 
      : start_time;
    
    const formattedEndTime = end_time.split(':').length === 2 
      ? `${end_time}:00` 
      : end_time;

    // Prepare update data with formatted times
    const updateData = {
      exam_name,
      exam_type,
      start_time: formattedStartTime,
      end_time: formattedEndTime,
      room_number,
      updated_at: new Date().toISOString()
    };

    console.log('Updating exam with formatted data:', updateData);

    const { data, error } = await supabase
      .from("exam_schedules")
      .update(updateData)
      .eq("exam_id", exam_id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      throw error;
    }

    console.log('Update successful:', data);
    res.json({
      success: true,
      data: data
    });

  } catch (err) {
    console.error("Error updating exam:", err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});
// Delete exam
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("exam_schedules")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;