import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const departments = ["HR", "Engineering", "Finance", "Marketing"];
const positions = ["Manager", "Developer", "Analyst", "Designer"];

const AddEmployee = () => {

    const navigate = useNavigate();

    const [ form, setForm ] = useState({
        first_name: "",
        last_name: "",
        email:"",
        position:"",
        salary:"",
        date_of_joining:"",
        department:""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    };

    const validateEmployee = (form) => {
        const errors = {};

        // First & last name (only letters)
        if (!form.first_name.trim()) errors.first_name = "First name is required";
        else if (!/^[A-Za-z]+$/.test(form.first_name))
          errors.first_name = "First name should contain only letters";
      
        if (!form.last_name.trim()) errors.last_name = "Last name is required";
        else if (!/^[A-Za-z]+$/.test(form.last_name))
          errors.last_name = "Last name should contain only letters";
      
        // Email
        if (!form.email.trim()) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
          errors.email = "Invalid email format";
      
        // Salary
        if (!form.salary) errors.salary = "Salary is required";
        else if (isNaN(form.salary)) errors.salary = "Salary must be a number";
      
        // Date of joining
        if (!form.date_of_joining) errors.date_of_joining = "Hire date is required";
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date_of_joining))
          errors.date_of_joining = "Hire date must be valid (YYYY-MM-DD)";
      
        return errors;
    };

    const handleSubmit = async(e) => {

        e.preventDefault();

        const validationErrors = validateEmployee(form);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const payload = {
            ...form,
            salary: Number(form.salary),
            date_of_joining: new Date(form.date_of_joining)
          };         

        try {
            await axios.post("/emp/employees",payload);
            navigate("/employees");
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return(
        <Box display="flex" justifyContent="center" minheight="100vh" p={4}>
            <Card sx={{ width: 500, p: 4 }}>
                <Typography variant="h5" mb={2}>
                    Add Employee
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        margin="normal"
                        value={form.first_name}
                        onChange={handleChange}
                        error={Boolean(errors.first_name)}
                        helperText={errors.first_name}
                />

                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    margin="normal"
                    value={form.last_name}
                    onChange={handleChange}
                    error={Boolean(errors.last_name)}
                    helperText={errors.last_name}
                />

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    value={form.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />

                <TextField
                    select
                    fullWidth
                    label="Position"
                    name="position"
                    margin="normal"
                    value={form.position}
                    onChange={handleChange}
                    error={Boolean(errors.position)}
                    helperText={errors.position}
                >
                    {positions.map((p) => (
                        <MenuItem key={p} value={p}>{p}</MenuItem>
                    ))}
                </TextField>

                <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    type="number"
                    margin="normal"
                    value={form.salary}
                    onChange={handleChange}
                    error={Boolean(errors.salary)}
                    helperText={errors.salary}
                />

                <TextField
                    fullWidth
                    label="Date of Joining"
                    name="date_of_joining"
                    type="date"
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                    value={form.date_of_joining}
                    onChange={handleChange}
                    error={Boolean(errors.date_of_joining)}
                    helperText={errors.date_of_joining}
                />

                <TextField
                    select
                    fullWidth
                    label="Department"
                    name="department"
                    margin="normal"
                    value={form.department}
                    onChange={handleChange}
                    error={Boolean(errors.department)}
                    helperText={errors.department}
                >
                    {departments.map((d) => (
                        <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                </TextField>

                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    type="submit"
                >
                    Save
                </Button>
            </form>
            </Card>
        </Box>
    );
};

export default AddEmployee;