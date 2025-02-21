import { supabase } from '@/config/supabaseClient';

const logError = (operation, error) => {
  console.error(`❌ ${operation} Error:`, {
    Message: error?.message || "Unknown error",
    Code: error?.code || "N/A",
    Details: error?.details || "No details available",
    Hint: error?.hint || "No hint available"
  });
};

export const LoginService = {
    async login(email, password) {
      try {
        console.log('🔐 Logging in:', email);
  
        // Fetch user by email
        const { data, error } = await supabase
          .from('admin')
          .select('admin_id, name, email, mobile, password')
          .eq('email', email)
          .single();
  
        if (error) {
          console.error('❌ Supabase query error:', error);
          return { success: false, error: "Database error" };
        }
  
        if (!data) {
          console.error('❌ No user found with this email.');
          return { success: false, error: "Invalid credentials" };
        }
        
        let a=data.password;
        console.log('🔑 Stored Password:', a);

        console.log('🔑 Password from DB:', data.password);
        console.log('🔑 Password provided:', password);
  
        // Directly match passwords
        if (password !== data.password) {
          console.error('❌ Incorrect password');
          return { success: false, error: "Invalid credentials" };
        }
  
        console.log('✅ Login successful:', data);
        return { data, success: true };
  
      } catch (error) {
        console.error('❌ Login Service Error:', error);
        return { success: false, error: error.message };
      }   
    },

    async getUserDataByEmail(email) {
        try {
          console.log('🔍 Fetching user data for email:', email);
          
          // Fetch user by email
          const { data, error } = await supabase
            .from('admin')  // Assuming the table is 'admin'
            .select('admin_id, name, email, mobile')  // Select relevant fields
            .eq('email', email)  // Match the email
            .single();  // Only expect a single result
          
          if (error) {
            console.error('❌ Supabase query error:', error);
            return { success: false, error: "Database error" };
          }
          
          if (!data) {
            console.error('❌ No user found with this email.');
            return { success: false, error: "User not found" };
          }
      
          console.log('✅ User data fetched successfully:', data);
          return { success: true, data };  // Return the user data
          
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          return { success: false, error: error.message };
        }
      }
      
  };

  

  
  
