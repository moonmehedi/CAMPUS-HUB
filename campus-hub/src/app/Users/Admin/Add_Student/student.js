const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let students = [
  { studentRoll: "S001", studentName: "John Doe", email: "john@example.com", departmentName: "Computer Science" },
  { studentRoll: "S002", studentName: "Jane Smith", email: "jane@example.com", departmentName: "Mathematics" },
];

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Add a new student
app.post('/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Search for a student
app.get('/students/search', (req, res) => {
  const { term } = req.query;
  const foundStudent = students.find(
    (student) =>
      student.studentRoll.toLowerCase() === term.toLowerCase() ||
      student.studentName.toLowerCase().includes(term.toLowerCase()),
  );
  if (foundStudent) {
    res.json(foundStudent);
  } else {
    res.status(404).json({ message: "No student found" });
  }
});

// Delete a student
app.delete('/students/:roll', (req, res) => {
  const { roll } = req.params;
  const studentIndex = students.findIndex((student) => student.studentRoll === roll);
  if (studentIndex !== -1) {
    students.splice(studentIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "No student found with that ID" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});