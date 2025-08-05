const express = require("express");
const router = express.Router();
const supabase = require("../../connection");
const { getCurrentTimestamp } = require('../utils/timestamp');

// Login route
router.post('/', async (req, res) => {
    const timestamp = getCurrentTimestamp(); 

    try {
        const { teacher_id, password } = req.body;

        // Query teacher from database
        const { data: teacher, error } = await supabase
            .from('teacher')
            .select('teacher_id, password, name')
            .eq('teacher_id', teacher_id)
            .single();

        if (error || !teacher) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid ID or password',
                timestamp
            });
        }
        console.log(teacher);
        // Direct password comparison (since it's stored as plain text)
        if (password !== teacher.password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid ID or password',
                timestamp
            });
        }

        // Set session data
        req.session.teacher = {
            teacher_id: teacher.teacher_id,
            name: teacher.name,
            loginTime: timestamp
        };

        // Log the successful login
        console.log(`[${timestamp}] Teacher ID ${teacher.teacher_id} logged in successfully`);

        res.json({
            success: true,
            message: 'Login successful',
            teacher_id: teacher.teacher_id,
            name: teacher.name,
            timestamp
        });

    } catch (error) {
        console.error(`[${timestamp}] Login error:`, error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error',
            timestamp
        });
    }
});

// Status check route
router.get('/', async (req, res) => {
    const timestamp = getCurrentTimestamp(); 

    if (req.session.teacher) {
        try {
            const { teacher_id } = req.session.teacher;

            // Query teacher details from database
            const { data: teacher, error } = await supabase
                .from('teacher')
                .select('*')
                .eq('teacher_id', teacher_id)
                .single();

            if (error || !teacher) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to retrieve teacher details',
                    timestamp
                });
            }
            console.log(teacher);

            res.json({
                isAuthenticated: true,
                teacher,
                timestamp
            });
        } catch (error) {
            console.error(`[${timestamp}] Status check error:`, error);
            res.status(500).json({ 
                success: false, 
                message: 'Internal server error',
                timestamp
            });
        }
    } else {
        res.json({
            isAuthenticated: false,
            timestamp
        });
    }
});

// Logout route
router.post('/logout', (req, res) => {
    const timestamp = getCurrentTimestamp(); 
    
    if (!req.session.teacher) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not logged in',
            timestamp
        });
    }

    const teacherId = req.session.teacher.teacher_id;
    
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Logout failed',
                timestamp
            });
        }
        
        console.log(`[${timestamp}] Teacher ID ${teacherId} logged out successfully`);
        
        res.clearCookie('connect.sid');
        res.json({ 
            success: true, 
            message: 'Logged out successfully',
            timestamp
        });
    });
});

module.exports = router;