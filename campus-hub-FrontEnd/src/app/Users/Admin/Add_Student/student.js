import { supabase } from '@/config/supabaseClient';

// Helper function for logging
const logError = (operation, error) => {
  console.error(`❌ ${operation} Error:`, {
    Message: error.message,
    Code: error.code,
    Details: error.details,
    Hint: error.hint,
    Table: error.table
  });
};

export const StudentService = {
  // Add new student
  async addStudent(studentData) {
    try {
      console.log('📥 Attempting to add student:', studentData);
      
      const { data, error } = await supabase
        .from('student')
        .insert([{
          roll: studentData.studentRoll,
          reg_no: studentData.registrationNo,
          name: studentData.studentName,
          batch: studentData.batch,
          class_section: studentData.classSection,
          father_name: studentData.fatherName,
          mother_name: studentData.motherName,
          mobile: studentData.mobileNumber,
          email: studentData.email,
          dob: studentData.dateOfBirth,
          gender: studentData.gender,
          dept_name: studentData.departmentName
        }])
        .select();

      if (error) {
        logError('Add Student', error);
        return { error, success: false };
      }

      console.log('✅ Successfully added student:', data);
      return { data, success: true };

    } catch (error) {
      logError('Add Student (Unexpected)', error);
      return { error, success: false };
    }
  },

  // Delete student by roll number
  async deleteStudent(roll) {
    try {
      console.log('🗑️ Attempting to delete student with roll:', roll);
      
      const { data, error } = await supabase
        .from('student')
        .delete()
        .eq('roll', roll);

      if (error) {
        logError('Delete Student', error);
        return { error, success: false };
      }

      console.log('✅ Successfully deleted student:', data);
      return { data, success: true };

    } catch (error) {
      logError('Delete Student (Unexpected)', error);
      return { error, success: false };
    }
  },

  // Search students by roll or name
  async searchStudents(searchTerm) {
    try {
      console.log('🔍 Searching for:', searchTerm);
      
      const { data, error } = await supabase
        .from('student')
        .select('*')
        .or(`roll.eq.${searchTerm},name.ilike.%${searchTerm}%`);

      if (error) {
        logError('Search Students', error);
        return { error, success: false };
      }

      console.log('✅ Search results:', data);
      return { data, success: true };

    } catch (error) {
      logError('Search Students (Unexpected)', error);
      return { error, success: false };
    }
  },

  // Update student information
  async updateStudent(roll, updatedData) {
    try {
      console.log('🔄 Updating student:', roll, 'with data:', updatedData);
      
      const { data, error } = await supabase
        .from('student')
        .update({
          name: updatedData.studentName,
          reg_no: updatedData.registrationNo,
          dob: updatedData.dateOfBirth,
          gender: updatedData.gender,
          mobile: updatedData.mobileNumber,
          email: updatedData.email,
          batch: updatedData.batch,
          class_section: updatedData.classSection,
          dept_name: updatedData.departmentName,
          father_name: updatedData.fatherName,
          mother_name: updatedData.motherName
        })
        .eq('roll', roll)
        .select();

      if (error) {
        logError('Update Student', error);
        return { error, success: false };
      }

      console.log('✅ Successfully updated student:', data);
      return { data, success: true };

    } catch (error) {
      logError('Update Student (Unexpected)', error);
      return { error, success: false };
    }
  },

  // Get all students
  async getAllStudents() {
    try {
      console.log('📋 Fetching all students');
      
      const { data, error } = await supabase
        .from('student')
        .select('*')
        .order('student_id', { ascending: false });

      if (error) {
        logError('Get All Students', error);
        return { error, success: false };
      }

      console.log('✅ Retrieved students:', data.length);
      return { data, success: true };

    } catch (error) {
      logError('Get All Students (Unexpected)', error);
      return { error, success: false };
    }
  }
};