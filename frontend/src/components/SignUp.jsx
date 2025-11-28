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

const SignUp = () => {
    const navigate = useNavigate();

    const[form, setForm] = useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validateSignup = (form) => {
      const errors = {};

      // Username
      if (!form.username.trim()) errors.username = "Username is required";
      else if (form.username.length < 4)
        errors.username = "Username must be at least 4 characters";
    
      // Email
      if (!form.email.trim()) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email))
        errors.email = "Invalid email format";
    
      // Password
      if (!form.password.trim()) errors.password = "Password is required";
      else if (form.password.length < 6)
        errors.password = "Password must be at least 6 characters";
    
      return errors;
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validateSignup(form);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
      
      try {
        const res = await api.post("/user/signup", form);
        console.log(res.data);
        navigate("/login"); // navigate to login after signup
      } catch (error) {
            setErrors({ api: error.response?.data?.message || "Signup failed" });
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
          <Card sx={{ width: 400, p: 4, boxShadow: 4 }}>
            <Typography variant="h5" textAlign="center" mb={2}>
              Sign Up
            </Typography>
    
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                margin="normal"
                value={form.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
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
    
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                margin="normal"
                value={form.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
    
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                type="submit"
              >
                Sign Up
              </Button>
    
              <Typography mt={2} textAlign="center">
                Already have an account?{" "}
                <Link component="button" onClick={() => navigate("/login")}>
                  Login
                </Link>
              </Typography>
            </form>
          </Card>
        </Box>
    );



};


export default SignUp;