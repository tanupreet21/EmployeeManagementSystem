require('dotenv').config();
const express = require('express');
const initDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3001", // host
  "http://frontend:3000" // container-to-container
];

app.use(cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);
  
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error("CORS not allowed from this origin"), false);
      }
  
      return callback(null, true);
    },
    credentials: true
  }));

app.use(express.json()); // parse requests that have JSON body
app.use('/api/v1/uploads', express.static('uploads'));


// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

//Global error handler
app.use(errorHandler);

//Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

initDB(); // Connect to DB