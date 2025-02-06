"use client"

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
    const fetchedTeachers = [
      { teacherId: "T001", name: "Dr. John Smith", department: "Computer Science", email: "john@example.com" },
      { teacherId: "T002", name: "Prof. Jane Doe", department: "Mathematics", email: "jane@example.com" },
    ]
    setTeachers(fetchedTeachers)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.teacherId || !formData.name || !formData.email) {
      setMessage("Please fill all required fields")
      return
    }
    if (password !== "1234") {
      setMessage("Incorrect password")
      return
    }
    const newTeacher = { ...formData }
    setTeachers([...teachers, newTeacher])
    setFormData({
      teacherId: "",
      name: "",
      department: "",
      email: "",
      phone: "",
      designation: "",
      dateOfJoining: "",
      subjectsTaught: "",
    })
    setMessage("Teacher added successfully")
    setShowPasswordPrompt(false)
    setPassword("")
  }

  const handleSearch = () => {
    const found = teachers.find(
      (teacher) =>
        teacher.teacherId.toLowerCase() === searchTerm.toLowerCase() ||
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    if (found) {
      setFoundTeacher(found)
      setMessage(`Found teacher: ${found.name}`)
    } else {
      setFoundTeacher(null)
      setMessage("No teacher found")
    }
  }

  const handleDelete = () => {
    const teacherIndex = teachers.findIndex((teacher) => teacher.teacherId === deleteId)
    if (teacherIndex !== -1) {
      const updatedTeachers = [...teachers]
      updatedTeachers.splice(teacherIndex, 1)
      setTeachers(updatedTeachers)
      setMessage("Teacher deleted successfully")
      setDeleteId("")
    } else {
      setMessage("No teacher found with that ID")
    }
  }

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
    setFoundTeacher(null)
    setEditMode(false)
  }

  const handleEdit = () => {
    setEditMode(true)
    setEditData(foundTeacher)
  }

  const handleSave = () => {
    const updatedTeachers = teachers.map((teacher) =>
      teacher.teacherId === editData.teacherId ? editData : teacher,
    )
    setTeachers(updatedTeachers)
    setEditMode(false)
    setMessage("Teacher details updated successfully")
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