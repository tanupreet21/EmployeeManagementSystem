const express = require('express');
const router = express.Router();
//import controller functions
const { signup, login } = require('../controllers/userController');
//import validation
const { validateUserSignup, validateUserLogin } = require('../middleware/validate');

// Defining routes
router.post('/signup', validateUserSignup, signup);
router.post('/login', validateUserLogin, login);

module.exports = router;