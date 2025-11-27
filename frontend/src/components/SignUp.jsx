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

const SignUp = () => {
    const navigate = useNavigate();

    const[form, setForm] = useState({
        userName:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const err = {};
    
        if (!form.userName.trim()) err.userName = "Username is required";
        if (!form.email.trim()) err.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email))
          err.email = "Invalid email format";
    
        if (!form.password.trim())
          err.password = "Password is required";
        else if (form.password.length < 6)
          err.password = "Minimum 6 characters";
    
        if (form.confirmPassword !== form.password)
          err.confirmPassword = "Passwords do not match";
    
        setErrors(err);
        return Object.keys(err).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        console.log("Signup form:", form);
        navigate("/login");
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
                value={form.UserName}
                onChange={handleChange}
                error={Boolean(errors.userName)}
                helperText={errors.userName}
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