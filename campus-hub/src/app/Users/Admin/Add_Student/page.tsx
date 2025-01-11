"use client";

import { Sidebar } from "../Components/sidebar";
import { DashboardHeader } from "../Components/dashboard-header";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import styles from "./AddStudentPage.module.css";

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    studentRoll: "",
    registrationNo: "",
    studentName: "",
    batch: "",
    classSection: "",
    creditGroup: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    departmentName: "",
    quota: "",
    scholarship: "",
    stipend: "",
    activeStatus: "Active",
    address: "",
    nationality: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    bloodGroup: "",
    guardianOccupation: "",
    photo: null, // For photo upload
  });

  const [showMessageBox, setShowMessageBox] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "photo" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (e.g., ensure mandatory fields are filled)
    if (!formData.studentRoll || !formData.studentName || !formData.email) {
      setMessage("Error: Please fill all required fields.");
      setShowMessageBox(true);
      return;
    }

    // If no validation errors
    setMessage("Success: Student Added Successfully!");
    setShowMessageBox(true);
  };

  const handleOkayClick = () => {
    // Reset form data and hide the message box
    setFormData({
      studentRoll: "",
      registrationNo: "",
      studentName: "",
      batch: "",
      classSection: "",
      creditGroup: "",
      fatherName: "",
      motherName: "",
      mobileNumber: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      departmentName: "",
      quota: "",
      scholarship: "",
      stipend: "",
      activeStatus: "Active",
      address: "",
      nationality: "",
      emergencyContactName: "",
      emergencyContactNumber: "",
      bloodGroup: "",
      guardianOccupation: "",
      photo: null,
    });
    setShowMessageBox(false); // Hide the message box
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageLayout}>
        <Sidebar />
        <div className={styles.mainContent}>
          <DashboardHeader />
          <div className={styles.formSection}>
            <h2 className={styles.formTitle}>Add New Student</h2>
            <form onSubmit={handleSubmit} className={styles.studentForm}>
              <div className={styles.formGrid}>
                {[ 
                  { label: "Roll", name: "studentRoll" },
                  { label: "Registration No", name: "registrationNo" },
                  { label: "Name", name: "studentName" },
                  { label: "Batch", name: "batch" },
                  { label: "Section", name: "classSection" },
                  { label: "Credits", name: "creditGroup" },
                  { label: "Father's Name", name: "fatherName" },
                  { label: "Mother's Name", name: "motherName" },
                  { label: "Mobile", name: "mobileNumber" },
                  { label: "Email", name: "email" },
                  { label: "Date of birth", name: "dateOfBirth", type: "date" },
                  { label: "Department", name: "departmentName" },
                  { label: "Quota", name: "quota" },
                  { label: "Scholarship", name: "scholarship" },
                  { label: "Status", name: "activeStatus", type: "select", options: ["Active", "Inactive"] },
                  { label: "Address", name: "address" },
                  { label: "Nationality", name: "nationality" },
                  { label: "Emergency Contact Name", name: "emergencyContactName" },
                  { label: "Emergency Contact Number", name: "emergencyContactNumber" },
                  { label: "Blood Group", name: "bloodGroup" },
                  { label: "Guardian's Occupation", name: "guardianOccupation" },
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
              <div className={styles.rightColumn}>
                {/* Photo Upload */}
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
