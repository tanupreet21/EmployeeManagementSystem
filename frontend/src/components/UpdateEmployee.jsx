import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

const departments = ["HR", "Engineering", "Finance", "Marketing"];
const positions = ["Manager", "Developer", "Analyst", "Designer"];

export default function UpdateEmployee(){

    const { id } = useParams();
    const navigate = useNavigate();

    const [ form, setForm ] = useState({
        first_name:"",
        last_name:"",
        email:"",
        position:"",
        salary:"",
        date_of_joining:"",
        department:""
    });

    const [errors, setErrors] = useState({});
    const[loading, setLoading] = useState(true);

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    // Fetch employee details to prefill form
    useEffect(() => {
        const fetchEmployee = async () => {
        try {
            const res = await axios.get(`/emp/employees/${id}`);
            setForm({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            position: res.data.position,
            salary: res.data.salary,
            date_of_joining: res.data.date_of_joining?.split("T")[0],
            department: res.data.department,
            });

            if (res.data.profilePic) {
                setPreview(`http://localhost:3000/uploads/${res.data.profilePic}`);
            }
        } catch (error) {
            console.error("Error fetching employee:", error);
        } finally {
            setLoading(false);
        }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const validate = () => {
        const err = {};
        if (!form.first_name.trim()) err.first_name = "First name is required";
        if (!form.last_name.trim()) err.last_name = "Last name is required";
        if (!form.email.trim()) err.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
          err.email = "Invalid email format";
        if (!form.position.trim()) err.position = "Position is required";
        if (!form.salary) err.salary = "Salary is required";
        else if (isNaN(form.salary)) err.salary = "Salary must be a number";
        if (!form.date_of_joining) err.date_of_joining = "Join date required";
        if (!form.department.trim()) err.department = "Department required";
    
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return;
    

        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }
    
        if (image) {
          formData.append("profilePic", image);
        }
    
        try {
          await axios.put(`/emp/employees/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          navigate("/employees");
        } catch (error) {
          console.error("Error updating employee:", error);
        }
    };
    
    if (loading) {
        return (
          <Typography p={4} textAlign="center">
            Loading...
          </Typography>
        );
    }

    return (
        <Box display="flex" justifyContent="center" p={4}>
            <Card sx={{ width: 600, p: 4 }}>
                <Typography variant="h5" mb={2}>
                    Edit Employee
                </Typography>

                <form onSubmit={handleSubmit}>
            
                    <Box textAlign="center" mb={2}>
                        {preview && (
                        <img
                            src={preview}
                            alt="Profile Preview"
                            style={{
                            width: 110,
                            height: 110,
                            borderRadius: "50%",
                            objectFit: "cover",
                            marginBottom: 8,
                            }}
                        />
                        )}

                        <Button variant="outlined" component="label">
                        Change Picture
                        <input hidden type="file" accept="image/*" onChange={handleFileChange} />
                        </Button>
                    </Box>

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
                        <MenuItem key={p} value={p}>
                            {p}
                        </MenuItem>
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
                        <MenuItem key={d} value={d}>
                            {d}
                        </MenuItem>
                        ))}
                    </TextField>

                    <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
                        Update
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate("/employees")}
                    >
                        Cancel
                    </Button>
                </form>
            </Card>  
        </Box>
    );
};