const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
// Import controller functions
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employeeController');
// Import validations
const {
    validateEmployee,
    validateEmployeeId
} = require('../middleware/validate');

// Protect routes with JWT
router.use(auth);

// Defining routes
router.get('/employees/search', searchEmployees);
//Validation middleware runs before controller
router.get('/employees', getAllEmployees);
router.post('/employees', upload.single("profilePic"), validateEmployee, createEmployee);
router.get('/employees/:eid', validateEmployeeId, getEmployeeById);
router.put('/employees/:eid',upload.single("profilePic"), validateEmployeeId, validateEmployee, updateEmployee);
router.delete('/employees/:eid', validateEmployeeId, deleteEmployee);


module.exports = router;