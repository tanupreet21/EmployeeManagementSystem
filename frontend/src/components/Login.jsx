import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    Link,
  } from "@mui/material";
  import api from "../api/axios";    

export default function Login(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    //Handle input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};

        if(!form.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            newErrors.email = "Invalid email format";

        if(!form.password.trim()) newErrors.password = "Password is required";
        else if (form.password.length < 6){
            newErrors.password = "Password must be atleast 6 characaters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Valid if there're no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/user/login", {
                email: form.email,
                password: form.password
            });

            localStorage.setItem("token", res.data.jwt_token);
            navigate("/employees");
        } catch (error){
            setErrors({ api: error.response?.data?.message || "Login failed"});
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Card sx={{ width: 400, p:4, boxShadow:4}}>
                <Typography variant="h5" textAlign="center" mb={2}>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
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
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password} 
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt:2}}
                        type="submit"
                    >
                        Login
                    </Button>
                    <Typography mt={2} textAlign={"center"}>
                        Don't have an account? {" "}
                        <Link component="button" onClick={()=> navigate("/signup")}>
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </Box>
    );
}