"use client"

import { Sidebar } from "../Components/sidebar"
import { DashboardHeader } from "../Components/dashboard-header"
import { Button } from "@nextui-org/button"
import { useState, useEffect } from "react"
import styles from "./student.module.css"
import { motion, AnimatePresence } from "framer-motion"

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
    const fetchedStudents = [
      { studentRoll: "S001", studentName: "John Doe", email: "john@example.com", departmentName: "Computer Science" },
      { studentRoll: "S002", studentName: "Jane Smith", email: "jane@example.com", departmentName: "Mathematics" },
    ]
    setStudents(fetchedStudents)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.studentRoll || !formData.studentName || !formData.email) {
      setMessage("Please fill all required fields")
      return
    }
    if (password !== "1234") {
      setMessage("Incorrect password")
      return
    }
    const newStudent = { ...formData }
    setStudents([...students, newStudent])
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

    })
    setMessage("Student added successfully")
    setShowPasswordPrompt(false)
    setPassword("")
  }

  const handleSearch = () => {
    const found = students.find(
      (student) =>
        student.studentRoll.toLowerCase() === searchTerm.toLowerCase() ||
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    if (found) {
      setFoundStudent(found)
      setMessage(`Found student: ${found.studentName}`)
    } else {
      setFoundStudent(null)
      setMessage("No student found")
    }
  }

  const handleDelete = () => {
    const studentIndex = students.findIndex((student) => student.studentRoll === deleteId)
    if (studentIndex !== -1) {
      const updatedStudents = [...students]
      updatedStudents.splice(studentIndex, 1)
      setStudents(updatedStudents)
      setMessage("Student deleted successfully")
      setDeleteId("")
    } else {
      setMessage("No student found with that ID")
    }
  }

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
              {["add", "search", "delete"].map((section) => (
                <motion.div
                  key={section}
                  className={`${styles.section} ${styles[`${section}Section`]} ${activeSection === section ? styles.expanded : ""}`}
                  onClick={() => toggleSection(section)}
                  layout
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <h2 className={styles.sectionTitle}>{section.charAt(0).toUpperCase() + section.slice(1)} Student</h2>
                  <p className={styles.sectionDescription}>
                    {section === "add" && "Add a new student to the database."}
                    {section === "search" && "Search for a student by roll number or name."}
                    {section === "delete" && "Delete a student by roll number."}
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
                                Add Student
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