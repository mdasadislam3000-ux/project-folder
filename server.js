const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = 'mongodb://127.0.0.1:27017/studentDB';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB (studentDB)'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Mount Routes
app.use('/students', studentRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});