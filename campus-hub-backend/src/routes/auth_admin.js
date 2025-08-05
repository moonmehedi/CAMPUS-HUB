const express = require("express");
const router = express.Router();
const supabase = require("../../connection");
const { getCurrentTimestamp } = require('../utils/timestamp');

// Login route
router.post('/', async (req, res) => {
    console.log("Admin login")
    const timestamp = getCurrentTimestamp(); 

    try {
        const { email, password } = req.body;
        console.log(email)

        // Query admin from database
        const { data: admin, error } = await supabase
            .from('admin')
            .select('email, password, name')
            .eq('email', email)
            .single();
        console.log(admin)
        if (error || !admin) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid ID or password',
                timestamp
            });
        }
        console.log(admin)

        // Direct password comparison (since it's stored as plain text)
        if (password !== admin.password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid ID or password',
                timestamp
            });
        }

        // Set session data
        req.session.admin = {
            email: admin.email,
            name: admin.name,
            loginTime: timestamp
        };
        console.log(req.session.admin)

        // Log the successful login
        console.log(`[${timestamp}] Admin ID ${admin.email} logged in successfully`);

        res.json({
            success: true,
            message: 'Login successful',
            email: admin.email,
            name: admin.name,
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

    if (req.session.admin) {
        try {
            const { email } = req.session.admin;

            // Query admin details from database
            const { data: admin, error } = await supabase
                .from('admin')
                .select('*')
                .eq('email', email)
                .single();

            if (error || !admin) {
                return res.status(500).json({ 
                    success: false, 
                    message: 'Failed to retrieve admin details',
                    timestamp
                });
            }
            console.log(admin);

            res.json({
                isAuthenticated: true,
                admin,
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
    
    if (!req.session.admin) {
        return res.status(401).json({ 
            success: false, 
            message: 'Not logged in',
            timestamp
        });
    }

    const adminId = req.session.admin.email;
    
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: 'Logout failed',
                timestamp
            });
        }
        
        console.log(`[${timestamp}] Admin ID ${adminId} logged out successfully`);
        
        res.clearCookie('connect.sid');
        res.json({ 
            success: true, 
            message: 'Logged out successfully',
            timestamp
        });
    });
});

module.exports = router;
