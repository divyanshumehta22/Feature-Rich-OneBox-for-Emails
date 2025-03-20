const express = require('express');
const mongoose = require('mongoose');

// Middleware to Connect to MongoDB
mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

