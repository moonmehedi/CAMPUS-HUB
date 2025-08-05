const { getCurrentTimestamp } = require('../utils/timestamp');

const requireAuth = (req, res, next) => {
    const timestamp = getCurrentTimestamp();
    console.log("Session Data:", req.session);

    // Set `req.currentUser` based on the session type
    if (req.session.teacher) {
        console.log(`[${timestamp}] Teacher ID ${req.session.teacher.teacher_id} authenticated`);
        req.currentUser = {
            type: "teacher",
            id: req.session.teacher.teacher_id,
            name: req.session.teacher.name,
            timestamp
        }
    } else if (req.session.student) {
        console.log(`[${timestamp}] Student ID ${req.session.student.student_id} authenticated`);
        req.currentUser = {
            type: "student",
            id: req.session.student.student_id,
            name: req.session.student.name,
            timestamp
        }
    } else if (req.session.admin) {
        console.log(`[${timestamp}] Admin ID ${req.session.admin.email} authenticated`);
        req.currentUser = {
            type: "admin",
            id: req.session.admin.email,
            name: req.session.admin.name,
            timestamp
        }
    } else {
        return res.status(401).json({ 
            success: false, 
            message: 'Authentication required !',
            timestamp
        });
    }
    
    next();
};

module.exports = { requireAuth };