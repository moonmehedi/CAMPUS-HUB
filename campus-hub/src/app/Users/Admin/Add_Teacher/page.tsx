"use client";

import { Sidebar } from "../Components/sidebar";
import { DashboardHeader } from "../Components/dashboard-header";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import styles from "./AddTeacherPage.module.css";

export default function AddTeacherPage() {
  const [formData, setFormData] = useState({
    teacherID: "",
    name: "",
    department: "",
    email: "",
    phoneNumber: "",
    hireDate: "",
    qualification: "",
    experience: "",
    subjectSpecialization: "",
    dateOfBirth: "",
    gender: "",
    salaryExpectation: "",
    resume: null, // For file upload
    emergencyContactName: "",
    emergencyContactPhone: "",
    teachingMethods: "",
    previousInstitutions: "",
    languagesKnown: "",
    photo: null, // Photo upload field
  });

  const [showMessageBox, setShowMessageBox] = useState(false); // State for message box
  const [message, setMessage] = useState(""); // State for success/error message

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "photo" || name === "resume" ? files[0] : value, // Handle file upload fields
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (ensure that required fields are filled)
    if (!formData.teacherID || !formData.name || !formData.email) {
      setMessage("Error: Please fill all required fields.");
      setShowMessageBox(true);
      return;
    }

    // If validation passes
    setMessage("Success: Teacher Added Successfully!");
    setShowMessageBox(true);
  };

  const handleOkayClick = () => {
    // Reset form data and hide the message box
    setFormData({
      teacherID: "",
      name: "",
      department: "",
      email: "",
      phoneNumber: "",
      hireDate: "",
      qualification: "",
      experience: "",
      subjectSpecialization: "",
      dateOfBirth: "",
      gender: "",
      salaryExpectation: "",
      resume: null,
      emergencyContactName: "",
      emergencyContactPhone: "",
      teachingMethods: "",
      previousInstitutions: "",
      languagesKnown: "",
      photo: null,
    });
    setShowMessageBox(false); // Hide the success/error message box
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageLayout}>
        <Sidebar />
        <div className={styles.mainContent}>
          <DashboardHeader />
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Add New Teacher</h2>
            <form onSubmit={handleSubmit} className={styles.studentForm}>
              <div className={styles.formGrid}>
                {[ 
                  { label: "Teacher ID", name: "teacherID" },
                  { label: "Full Name", name: "name" },
                  { label: "Department", name: "department" },
                  { label: "Email", name: "email" },
                  { label: "Phone Number", name: "phoneNumber" },
                  { label: "Hire Date", name: "hireDate", type: "date" },
                  { label: "Qualification", name: "qualification" },
                  { label: "Experience (years)", name: "experience" },
                  { label: "Subject Specialization", name: "subjectSpecialization" },
                  { label: "Date of Birth", name: "dateOfBirth", type: "date" },
                  { label: "Gender", name: "gender", type: "select", options: ["Male", "Female", "Other"] },
                  { label: "Salary Expectation", name: "salaryExpectation" },
                  { label: "Resume", name: "resume", type: "file" },
                  { label: "Emergency Contact Name", name: "emergencyContactName" },
                  { label: "Emergency Contact Phone", name: "emergencyContactPhone" },
                  { label: "Teaching Methods", name: "teachingMethods" },
                  { label: "Previous Institutions", name: "previousInstitutions" },
                  { label: "Languages Known", name: "languagesKnown" },
                ].map(({ label, name, type = "text", options }) => (
                  <div key={name} className={styles.formGroup}>
                    <label htmlFor={name} className={styles.formLabel}>
                      {label}
                    </label>
                    {type === "select" ? (
                      <select
                        id={name}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className={styles.formInput}
                      >
                        {options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : type === "file" ? (
                      <input
                        id={name}
                        name={name}
                        type={type}
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    ) : (
                      <input
                        id={name}
                        name={name}
                        type={type}
                        value={formData[name]}
                        onChange={handleChange}
                        className={styles.formInput}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column for Photo Upload */}
              <div className={styles.rightColumn}>
                <div className={styles.formGroup}>
                  <label htmlFor="photo" className={styles.formLabel}>
                    Upload Photo
                  </label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className={styles.buttonGroup}>
                <Button color="default" className={styles.cancelButton}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" className={styles.proceedButton}>
                  Proceed
                </Button>
              </div>
            </form>
          </div>

          {/* Success/Error Message Box */}
          {showMessageBox && (
            <div className={styles.messageBox}>
              <p>{message}</p>
              <Button color="primary" onClick={handleOkayClick}>Okay</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
