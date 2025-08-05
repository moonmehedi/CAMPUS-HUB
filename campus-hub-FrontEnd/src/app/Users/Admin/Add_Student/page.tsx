"use client"

import { StudentService } from "./student";
import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { Button } from "@nextui-org/button"
import { useState, useEffect } from "react"
import styles from "./student.module.css"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/config/supabaseClient";

export default function StudentManagementPage() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({
    studentRoll: "",
    registrationNo: "",
    studentName: "",
    batch: "",
    classSection: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    departmentName: "",
    adminId: "", // Add adminId to formData
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const [message, setMessage] = useState("")
  const [activeSection, setActiveSection] = useState(null)
  const [foundStudent, setFoundStudent] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState({})
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState("")

  useEffect(() => {
    const fetchStudents = async () => {
      const { data, error } = await StudentService.getAllStudents();
      if (!error) {
        setStudents(data.map((studentmanagement: { roll: any; reg_no: any; name: any; batch: any; class_section: any; father_name: any; mother_name: any; mobile: any; email: any; dob: any; gender: any; dept_name: any; }) => ({
          studentRoll: studentmanagement.roll,
          registrationNo: studentmanagement.reg_no,
          studentName: studentmanagement.name,
          batch: studentmanagement.batch,
          classSection: studentmanagement.class_section,
          fatherName: studentmanagement.father_name,
          motherName: studentmanagement.mother_name,
          mobileNumber: studentmanagement.mobile,
          email: studentmanagement.email,
          dateOfBirth: studentmanagement.dob,
          gender: studentmanagement.gender,
          departmentName: studentmanagement.dept_name
})));


      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Basic validation for required fields
    if (!formData.studentRoll || !formData.studentName || !formData.email) {
      setMessage("Please fill all required fields");
      return;
    }
  
    // Fetch admin credentials and check password directly from the 'admin' table
    try {
      // Query the 'admin' table to get the admin credentials based on admin_id
      const { data: adminData, error: adminError } = await supabase
        .from('admin') // Assuming your table name is 'admin'
        .select('admin_id, password') // Fetching admin_id and password
        .eq('admin_id', formData.adminId) // Matching admin_id with adminId from form data
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
  
      // If credentials are valid, proceed with adding the student
      const { data, error } = await StudentService.addStudent(formData);
  
      if (error) {
        setMessage("Error adding student: " + error.message);
        return;
      }
  
      // Update student list if successfully added
      setStudents([{
        studentRoll: data[0].roll,
        registrationNo: data[0].reg_no,
        studentName: data[0].name,
        batch: data[0].batch,
        classSection: data[0].class_section,
        fatherName: data[0].father_name,
        motherName: data[0].mother_name,
        mobileNumber: data[0].mobile,
        email: data[0].email,
        dateOfBirth: data[0].dob,
        gender: data[0].gender,
        departmentName: data[0].dept_name
      }, ...students]);
  
      // Reset form fields and success message
      setFormData({
        studentRoll: "",
        registrationNo: "",
        studentName: "",
        batch: "",
        classSection: "",
        fatherName: "",
        motherName: "",
        mobileNumber: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        departmentName: "",
        adminId: "", // Reset adminId
      });
  
      setMessage("Student added successfully");
  
    } catch (error) {
      setMessage("Error adding student: " + error.message);
    } finally {
      // Hide password prompt and clear password field
      setShowPasswordPrompt(false);
      setPassword("");
    }
  };
  
  const handleSearch = async () => {
    const { data, error } = await StudentService.searchStudents(searchTerm);
    if (!error && data.length > 0) {
      setFoundStudent({
        studentRoll: data[0].roll,
        registrationNo: data[0].reg_no,
        studentName: data[0].name,
        batch: data[0].batch,
        classSection: data[0].class_section,
        fatherName: data[0].father_name,
        motherName: data[0].mother_name,
        mobileNumber: data[0].mobile,
        email: data[0].email,
        dateOfBirth: data[0].dob,
        gender: data[0].gender,
        departmentName: data[0].dept_name
      });
      setMessage(`Found student: ${data[0].name}`);
    } else {
      setFoundStudent(null);
      setMessage("No student found");
    }
  };

  const handleDelete = async () => {
    const { error } = await StudentService.deleteStudent(deleteId);
    if (!error) {
      setStudents(students.filter(s => s.studentRoll !== deleteId));
      setMessage("Student deleted successfully");
    } else {
      setMessage("Error: " + error.message);
    }
    setDeleteId("");
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
    setFoundStudent(null)
    setEditMode(false)
  }

  const handleEdit = () => {
    setEditMode(true)
    setEditData(foundStudent)
  }

  const handleSave = () => {
    const updatedStudents = students.map((student) =>
      student.studentRoll === editData.studentRoll ? editData : student,
    )
    setStudents(updatedStudents)
    setEditMode(false)
    setMessage("Student details updated successfully")
  }

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
          <div className={styles.studentManagement}>
            <div className={styles.sectionContainer}>
              {["add", "search", "delete", "view"].map((section) => (
                <motion.div
                  key={section}
                  className={`${styles.section} ${styles[`${section}Section`]} ${activeSection === section ? styles.expanded : ""}`}
                  onClick={() => toggleSection(section)}
                  layout
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <h2 className={styles.sectionTitle}>
                    {section === "view" ? "All Student" : 
                     section === "search" && editMode ? "Update Student Information" :
                     section.charAt(0).toUpperCase() + section.slice(1) + " Student"}
                  </h2>
                  <p className={styles.sectionDescription}>
                    {section === "add" && "Add a new student to the database."}
                    {section === "search" && "Search for a student by roll number or name."}
                    {section === "delete" && "Delete a student by roll number."}
                    {section === "view" && `Total Student: ${students.length}`}
                  </p>
                  <AnimatePresence>
                    {activeSection === section && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.sectionContent}
                      >
                        {section === "add" && (
                          <>
                            <form onSubmit={handleSubmit} className={styles.studentForm}>
                              <div className={styles.formGrid}>
                                {Object.keys(formData).map((field) => (
                                  field !== "adminId" && ( // Exclude adminId from the initial form
                                  <div key={field} className={styles.formGroup}>
                                    <label htmlFor={field} className={styles.formLabel}>
                                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    <input
                                      id={field}
                                      name={field}
                                      type={field === "dateOfBirth" ? "date" : "text"}
                                      value={formData[field]}
                                      onChange={handleChange}
                                      className={styles.formInput}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                )))}
                              </div>
                              <Button
                                type="button"
                                className={styles.button}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setShowPasswordPrompt(true)
                                }}
                              >
                                Add Student
                              </Button>
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
        value={formData.adminId} // Use adminId from formData
        onChange={(e) => setFormData({ ...formData, adminId: e.target.value })}
        onClick={(e) => e.stopPropagation()}
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
        onClick={(e) => e.stopPropagation()}
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
                                placeholder="Search by Roll No or Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={styles.formInput}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleSearch()
                                }}
                                className={styles.button}
                              >
                                Search
                              </Button>
                            </div>
                            {foundStudent && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.studentDetails}
                              >
                                {Object.keys(foundStudent).map((key) => (
                                  <div key={key} className={styles.formGroup}>
                                    <label className={styles.formLabel}>
                                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                                    </label>
                                    {editMode ? (
                                      <input
                                        type="text"
                                        name={key}
                                        value={editData[key]}
                                        onChange={handleEditChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className={styles.formInput}
                                      />
                                    ) : (
                                      <p>{foundStudent[key]}</p>
                                    )}
                                  </div>
                                ))}
                                {editMode ? (
                                  <Button onClick={handleSave} className={`${styles.button} ${styles.saveButton}`}>
                                    Save
                                  </Button>
                                ) : (
                                  <Button onClick={handleEdit} className={`${styles.button} ${styles.editButton}`}>
                                    Edit
                                  </Button>
                                )}
                              </motion.div>
                            )}
                          </>
                        )}
                        {section === "delete" && (
                          <div className={styles.deleteBox}>
                            <input
                              type="text"
                              placeholder="Enter Student Roll No to Delete"
                              value={deleteId}
                              onChange={(e) => setDeleteId(e.target.value)}
                              className={styles.formInput}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete()
                              }}
                              className={`${styles.button} ${styles.deleteButton}`}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                        {section === "view" && (
  <div className={styles.tableContainer}>
    <table className={styles.studentTable}>
      <thead>
        <tr>
          {students[0] && Object.keys(students[0]).map((key) => (
            <th key={key}>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</th>
          ))}
        </tr>
      </thead>
      <tbody>
            {students && students.length > 0 ? (
              students.map((student) => (
                <tr key={student.student_id}>
                  {Object.entries(student).map(([key, value]) => (
                    <td key={key}>{value}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(students[0] || {}).length}>No students found</td>
              </tr>
            )}
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