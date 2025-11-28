require('dotenv').config();
const express = require('express');
const initDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const app = express();

// Allow requests from frontend
app.use(cors({
    origin: "http://localhost:3001",  // your frontend URL
    credentials: true
  }));

app.use(express.json()); // parse requests that have JSON body


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