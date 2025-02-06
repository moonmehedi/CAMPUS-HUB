"use client"
import { TeacherService } from "./teacher";
import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { Button } from "@nextui-org/button"
import { useState, useEffect } from "react"
import styles from "./teacher.module.css"
import { motion, AnimatePresence } from "framer-motion"

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.teacherId || !formData.name || !formData.email) {
      setMessage("Please fill all required fields");
      return;
    }
    if (password !== "1234") {
      setMessage("Incorrect password");
      return;
    }
  
    try {
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
      
      setTeachers(teachers.filter(teacher => teacher.teacher_id !== deleteId));
      setMessage("Teacher deleted successfully");
      setDeleteId("");
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
              {["add", "search", "delete"].map((section) => (
                <motion.div
                  key={section}
                  className={`${styles.section} ${styles[`${section}Section`]} ${activeSection === section ? styles.expanded : ""}`}
                  onClick={() => toggleSection(section)}
                  layout
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <h2 className={styles.sectionTitle}>{section.charAt(0).toUpperCase() + section.slice(1)} Teacher</h2>
                  <p className={styles.sectionDescription}>
                    {section === "add" && "Add a new teacher to the database."}
                    {section === "search" && "Search for a teacher by ID or name."}
                    {section === "delete" && "Delete a teacher by ID."}
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
                                      type={field === "dateOfJoining" ? "date" : "text"}
                                      value={formData[field]}
                                      onChange={handleChange}
                                      className={styles.formInput}
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                  </div>
                                ))}
                              </div>
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
                            </form>
                            {showPasswordPrompt && (
                              <div className={styles.passwordPrompt}>
                                <input
                                  type="password"
                                  placeholder="Enter Password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  onClick={(e) => e.stopPropagation()}
                                  className={styles.formInput}
                                />
                                <Button
                                  onClick={handleSubmit}
                                  className={styles.button}
                                >
                                  Submit
                                </Button>
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
                                        type="text"
                                        name={key}
                                        value={editData[key]}
                                        onChange={handleEditChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className={styles.formInput}
                                      />
                                    ) : (
                                      <p>{foundTeacher[key]}</p>
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
                              placeholder="Enter Teacher ID to Delete"
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