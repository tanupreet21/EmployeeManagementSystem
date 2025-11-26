import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return(
        <AppBar position="static" sx={{ background: "#2e7d32"}}>
            <Toolbar>

                <Typography variant="h6" sx={{ flexGrow: 1}}>
                    Employee Manager System
                </Typography>

                <Button color="inherit" component={Link} to="/employees">
                    Employees
                </Button>

                <Button color="inherit" component={Link} to="/employees/add">
                    Add Employee
                </Button>

                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
}