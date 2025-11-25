const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Import controller functions
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');
// Import validations
const {
    validateEmployee,
    validateEmployeeId
} = require('../middleware/validate');

// Protect routes with JWT
router.use(auth);

// Defining routes
//Validation middleware runs before controller
router.get('/employees', getAllEmployees);
router.post('/employees', validateEmployee, createEmployee);
router.get('/employees/:eid', validateEmployeeId, getEmployeeById);
router.put('/employees/:eid', validateEmployeeId, validateEmployee, updateEmployee);
router.delete('/employees/:eid', validateEmployeeId, deleteEmployee);

module.exports = router;