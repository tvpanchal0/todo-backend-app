// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser"); 
const taskRoutes = require("./routes/taskRoutes"); // Routes
const authRoutes = require('./routes/authRoutes');

dotenv.config();  // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;  // You can change the port number

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON request body

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));





app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
