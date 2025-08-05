"use client"
import { TeacherService } from "./teacher";
import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { Button } from "@nextui-org/button"
import { useState, useEffect } from "react"
import styles from "./teacher.module.css"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from '@/config/supabaseClient';



export default function TeacherManagementPage() {
  const [teachers, setTeachers] = useState([])
  const [formData, setFormData] = useState({
    teacherId: "",
    name: "",
    department: "",
    email: "",
    phone: "",
    designation: "",
    dateOfJoining: "",
    subjectsTaught: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [message, setMessage] = useState("")
  const [activeSection, setActiveSection] = useState(null)
  const [foundTeacher, setFoundTeacher] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    const fetchTeachers = async () => {
      const { data, error } = await TeacherService.getAllTeachers();
      if (error) {
        setMessage("Error loading teachers");
      } else {
        setTeachers(data);
      }
    };
    fetchTeachers();
  }, []);

  const validateForm = () => {
    if (!/^[A-Za-z\s]+$/.test(formData.name)) return "Invalid name format";
    if (!/^\d+$/.test(formData.teacherId)) return "ID must be a number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email";
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }
  
    // Fetch admin credentials and check password directly from the 'admin' table
    try {
      // Query the 'admin' table to get the admin credentials based on teacherId (admin_id)
      const { data: adminData, error: adminError } = await supabase
        .from('admin') // Assuming your table name is 'admin'
        .select('admin_id, password') // Fetching admin_id and password
        .eq('admin_id', formData.teacherId) // Matching the admin_id with the input teacherId
        .single(); // Only expecting one match
  
      if (adminError) {
        setMessage("Error fetching admin credentials");
        return;
      }
  
      // Check if the fetched password matches the input password
      if (adminData.password !== password) {
        setMessage("Incorrect admin ID or password");
        return;
      }
  
      // If credentials are valid, proceed with adding the teacher
      const { data, error } = await TeacherService.addTeacher(formData);
      if (error) throw error;
  
      setTeachers([...teachers, data[0]]);
      setFormData({
        teacherId: "",
        name: "",
        department: "",
        email: "",
        phone: "",
        designation: "",
        dateOfJoining: "",
        subjectsTaught: "",
      });
      setMessage("Teacher added successfully");
  
    } catch (error) {
      setMessage("Error adding teacher: " + error.message);
    } finally {
      setShowPasswordPrompt(false);
      setPassword("");
    }
  };
  

  const handleSearch = async () => {
    try {
      const { data, error } = await TeacherService.searchTeachers(searchTerm);
      if (error) throw error;
      
      if (data.length > 0) {
        setFoundTeacher(data[0]);
        setMessage(`Found teacher: ${data[0].name}`);
      } else {
        setFoundTeacher(null);
        setMessage("No teacher found");
      }
    } catch (error) {
      setMessage("Search error: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await TeacherService.deleteTeacher(deleteId);
      if (error) throw error;
      
      setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.teacherId !== deleteId));
      setDeleteId("");
      
      // Fetch updated list from API
      const { data, fetchError } = await TeacherService.getAllTeachers();
      if (!fetchError) {
        setTeachers(data);
      }
      
      setMessage("Teacher deleted successfully");
    } catch (error) {
      setMessage("Delete error: " + error.message);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
    setFoundTeacher(null)
    setEditMode(false)
  }

  const handleEdit = () => {
    setEditMode(true)
    setEditData(foundTeacher)
  }

  const handleSave = async () => {
    try {
      const { error } = await TeacherService.updateTeacher(editData.teacher_id, editData);
      if (error) throw error;
      
      setTeachers(teachers.map(teacher => 
        teacher.teacher_id === editData.teacher_id ? editData : teacher
      ));
      setEditMode(false);
      setMessage("Teacher updated successfully");
    } catch (error) {
      setMessage("Update error: " + error.message);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageLayout}>
        <Sidebar />
        <div className={styles.mainContent}>
          <DashboardHeader />
          <div className={styles.teacherManagement}>
            <div className={styles.sectionContainer}>
              {["add", "search", "delete", "view"].map((section) => (
                <motion.div
                  key={section}
                  className={`${styles.section} ${styles[`${section}Section`]} ${activeSection === section ? styles.expanded : ""}`}
                  onClick={() =>  toggleSection(section)}
                  layout
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <h2 className={styles.sectionTitle}>
                    {section === "view" ? "All Teachers" : 
                     section === "search" && editMode ? "Update Teacher Information" :
                     section.charAt(0).toUpperCase() + section.slice(1) + " Teacher"}
                  </h2>
                  <p className={styles.sectionDescription}>
                    {section === "add" && "Add a new teacher to the database."}
                    {section === "search" && "Search for a teacher by ID or name."}
                    {section === "delete" && "Delete a teacher by ID."}
                    {section === "view" && `Total teachers: ${teachers.length}`}
                  </p>
                  <AnimatePresence>
                    {activeSection === section && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.sectionContent}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {section === "add" && (
                          <>
                            <form onSubmit={handleSubmit} className={styles.teacherForm}>
                              <div className={styles.formGrid}>
                                {Object.keys(formData).map((field) => (
                                  <div key={field} className={styles.formGroup}>
                                    <label htmlFor={field} className={styles.formLabel}>
                                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    <input
                                      id={field}
                                      name={field}
                                      type={field === "dateOfJoining" ? "date" : 
                                        field === "teacherId" ? "number" :
                                        field === "email" ? "email" : "text"}
                                      value={formData[field]}
                                      onChange={handleChange}
                                      className={styles.formInput}
                                      pattern={field === "name" ? "^[A-Za-z\\s]+$" : 
                                               field === "teacherId" ? "\\d+" : null}
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className={styles.buttonCenter}>
                                <Button
                                  type="button"
                                  className={styles.button}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setShowPasswordPrompt(true)
                                  }}
                                >
                                  Add Teacher
                                </Button>
                              </div>
                            </form>
                            {showPasswordPrompt && (
  <div className={styles.passwordPrompt}>
    {/* Admin ID input */}
    <div className={styles.formGroup}>
      <label htmlFor="adminId" className={styles.formLabel}>Admin ID</label>
      <input
        type="text"
        id="adminId"
        placeholder="Enter your ID"
        value={formData.teacherId} // Assuming the admin ID should be the teacherId field
        onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
        className={styles.formInput}
      />
    </div>

    {/* Password input */}
    <div className={styles.formGroup}>
      <label htmlFor="password" className={styles.formLabel}>Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.formInput}
      />
    </div>

    {/* Submit button */}
    <div className={styles.buttonCenter}>
      <Button onClick={handleSubmit} className={styles.button}>
        Submit
      </Button>
    </div>
  </div>
)}

                          </>
                        )}
                        {section === "search" && (
                          <>
                            <div className={styles.searchBox}>
                              <input
                                type="text"
                                placeholder="Search by ID or Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.formInput}
                              />
                              <div className={styles.buttonCenter}>
                                <Button onClick={handleSearch} className={styles.button}>
                                  Search
                                </Button>
                              </div>
                            </div>
                            {foundTeacher && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.teacherDetails}
                              >
                                {Object.keys(foundTeacher).map((key) => (
                                  <div key={key} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    {editMode ? (
                                      <input
                                        type={key === "teacher_id" ? "text" : "text"}
                                        name={key}
                                        value={editData[key]}
                                        onChange={handleEditChange}
                                        className={styles.formInput}
                                        disabled={key === "teacher_id"}
                                      />
                                    ) : (
                                      <p>{foundTeacher[key]}</p>
                                    )}
                                  </div>
                                ))}
                                <div className={styles.buttonCenter}>
                                  {editMode ? (
                                    <Button onClick={handleSave} className={`${styles.button} ${styles.saveButton}`}>
                                      Save
                                    </Button>
                                  ) : (
                                    <Button onClick={handleEdit} className={`${styles.button} ${styles.editButton}`}>
                                      Edit
                                    </Button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </>
                        )}
                        {section === "delete" && (
                          <div className={styles.deleteBox}>
                            <input
                              type="text"
                              placeholder="Enter Teacher ID to Delete"
                              value={deleteId}
                              onChange={(e) => setDeleteId(e.target.value)}
                              className={styles.formInput}
                            />
                            <div className={styles.buttonCenter}>
                              <Button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
                                Delete
                              </Button>
                            </div>
                          </div>
                        )}
                        {section === "view" && (
                          <div className={styles.tableContainer}>
                            <table className={styles.teacherTable}>
                              <thead>
                                <tr>
                                  {teachers[0] && Object.keys(teachers[0]).map((key) => (
                                    <th key={key}>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {teachers.map((teacher) => (
                                  <tr key={teacher.teacher_id}>
                                    {Object.values(teacher).map((value, index) => (
                                      <td key={index}>{value}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.messageBox}
            >
              <p>{message}</p>
              <Button onClick={() => setMessage("")}>Okay</Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}