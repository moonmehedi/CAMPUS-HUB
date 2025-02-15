import { supabase } from '@/config/supabaseClient';

const logError = (operation, error) => {
  console.error(`❌ ${operation} Error:`, {
    Message: error.message,
    Code: error.code,
    Details: error.details,
    Hint: error.hint,
    Table: error.table
  });
};

export const TeacherService = {
  async addTeacher(teacherData) {
    try {
      console.log('📥 Adding teacher:', teacherData);
      
      const formattedData = {
        teacher_id: teacherData.teacherId,
        name: teacherData.name,
        department: teacherData.department,
        email: teacherData.email,
        phone: teacherData.phone,
        designation: teacherData.designation,
        date_of_joining: new Date(teacherData.dateOfJoining).toISOString(),
        subjects_taught: teacherData.subjectsTaught
      };

      const { data, error } = await supabase
        .from('teachermanagement')
        .insert([formattedData])
        .select();

      if (error) throw error;

      console.log('✅ Teacher added:', data);
      return { data: data[0], success: true };

    } catch (error) {
      logError('Add Teacher', error);
      return { error, success: false };
    }
  },

  async deleteTeacher(teacherId) {
    try {
      console.log('🗑️ Deleting teacher:', teacherId);
      
      const { error } = await supabase
        .from('teachermanagement')
        .delete()
        .eq('teacher_id', teacherId);

      if (error) throw error;

      console.log('✅ Teacher deleted');
      return { success: true };

    } catch (error) {
      logError('Delete Teacher', error);
      return { error, success: false };
    }
  },

  async searchTeachers(searchTerm) {
    try {
      console.log('🔍 Searching for:', searchTerm);
      
      const { data, error } = await supabase
        .from('teachermanagement')
        .select('*')
        .or(`teacher_id.eq.${searchTerm},name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`);

      if (error) throw error;

      console.log('✅ Search results:', data);
      return { data, success: true };

    } catch (error) {
      logError('Search Teachers', error);
      return { error, success: false };
    }
  },

  async updateTeacher(teacherId, updatedData) {
    try {
      console.log('🔄 Updating teacher:', teacherId);
      
      const formattedData = {
        name: updatedData.name,
        department: updatedData.department,
        email: updatedData.email,
        phone: updatedData.phone,
        designation: updatedData.designation,
        date_of_joining: updatedData.dateOfJoining ? 
          new Date(updatedData.dateOfJoining).toISOString() : null,
        subjects_taught: updatedData.subjectsTaught
      };
  
      const { data, error } = await supabase
        .from('teachermanagement')
        .update(formattedData)
        .eq('teacher_id', teacherId)
        .select();
  
      if (error) throw error;
  
      console.log('✅ Teacher updated:', data);
      return { data: data[0], success: true };
  
    } catch (error) {
      logError('Update Teacher', error);
      return { error, success: false };
    }
  },


  async getAllTeachers() {
    try {
      console.log('📋 Fetching all teachers');
      
      const { data, error } = await supabase
        .from('teachermanagement')
        .select('*');

      if (error) throw error;

      console.log('✅ Teachers fetched:', data.length);
      return { data, success: true };

    } catch (error) {
      logError('Get All Teachers', error);
      return { error, success: false };
    }
  }
};