const Employee = require('../models/Employee');

// List all employees
exports.getAllEmployees = async(req, res) => {
    //return an array of all employees
    const employees = await Employee.find();
    res.status(200).json(employees);
}

// Create new employee
exports.createEmployee = async(req, res) => {
    try {
        const profilePic = req.file ? req.file.filename : null;
        const employeeData = { ...req.body, profilePic };
        const employee = await Employee.create(employeeData);
        res.status(201).json({ message: "Employee created successfully.", employee_id: employee._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get one employee by id
exports.getEmployeeById = async(req, res) => {
    //find employee with that id
    const employee = await Employee.findById(req.params.eid);
    if(!employee){
        return res.status(404).json({ message: "Employee not found."});
    }
    res.status(200).json(employee);
}

// Update an employee by id
exports.updateEmployee = async(req, res) => {
    try {
        const updateData = { ...req.body };
        if(req.file) updateData.profilePic = req.file.filename;

        const employee = await Employee.findByIdAndUpdate(req.params.eid, updateData, { new: true, runValidators: true });
        if(!employee){
            return res.status(404).json({ message: "Employee not found."});
        }
        res.status(200).json({ message: "Employee details updated successfully."});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete an employee by id
exports.deleteEmployee = async(req, res) => {
    try {
        const { eid } = req.params;
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if(!deletedEmployee){
            return res.status(404).json({ message: "Employee not found."});
        }
        res.status(204).send();//Deleted successfully
    } catch(error){
        res.status(500).json({ message: error.message});
    }   
}

//Search employee by department or position
// GET /emp/employees/search?department=HR&position=Manager
exports.searchEmployees = async(req, res) => {
    try {
        const { department, position } = req.query;

        const filter = {};
        if (department) filter.department = department;
        if (position) filter.position = position;
    
        const employees = await Employee.find(filter);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

