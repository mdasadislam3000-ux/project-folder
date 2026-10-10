const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 1. POST /students - Add a new student
router.post('/', async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json({
            message: "Student created successfully",
            data: savedStudent
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. GET /students - Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. GET /students/:id - Get a specific student
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ data: student });
    } catch (error) {
        // Handle invalid ObjectId format
        res.status(500).json({ error: "Invalid ID format or server error" });
    }
});

module.exports = router;