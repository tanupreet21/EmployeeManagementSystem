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

    const validate = () => {
        const err = {};
        if (!form.first_name.trim()) err.first_name = "First name is required";
        if (!form.last_name.trim()) err.last_name = "Last name is required";
        if (!form.email.trim()) err.email = "Email is required";
        if (!form.position.trim()) err.position = "Position is required";
        if (!form.salary) err.salary = "Salary is required";
        if (!form.date_of_joining) err.date_of_joining = "Join date required";
        if (!form.department.trim()) err.department = "Department required";

        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async(e) => {

        e.preventDefault();

        if(!validate()) return;

        try {
            await axios.post("/employees",form);
            navigate("/employees");
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };
    return(
        <Box display="flex" justifyContent="centre" minheight="100vh" p={4}>
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