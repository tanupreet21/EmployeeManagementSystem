import React, { useEffect, useState } from "react";
import axios from "../api/axios"; // import our Axios instance
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Toolbar,
    TextField,
    CircularProgress,
  } from "@mui/material";
  import { Edit, Delete, Visibility } from "@mui/icons-material";

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchEmployees = async() => {
            try {
                const response = await axios.get("/employees");
                setEmployees(response.data);
            } catch (err){
                console.error("Error fetching employees:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        `${emp.first_name} ${emp.last_name}`
            .toLowerCase().includes(search.toLowerCase())
    );

    return(
        <Box sx={{ p:4, bgcolor: "#f5f5f5", minHeight:"100vh"}}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Employee Directory
            </Typography>
            <Paper sx={{ p:2}}>
                <Toolbar sx={{ px: 0, mb: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        label="Search by name"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Toolbar>
                {loading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5"}}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Date of Joining</TableCell>
                                    <TableCell align="center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    filteredEmployees.length > 0 ? (
                                        filteredEmployees.map((emp) => (
                                            <TableRow key={emp._id} hover>
                                                <TableCell>{emp.first_name} {emp.last_name}</TableCell>
                                                <TableCell>{emp.email}</TableCell>
                                                <TableCell>{emp.position}</TableCell>
                                                <TableCell>{emp.department}</TableCell>
                                                <TableCell>${emp.salary.toLocaleString()}</TableCell>
                                                <TableCell>{new Date(emp.date_of_joining).toLocaleDateString()}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton color="primary" onClick={() => alert(`View ${emp.first_name}`)}><Visibility /></IconButton>
                                                    <IconButton color="secondary" onClick={() => alert(`Edit ${emp.first_name}`)}><Edit /></IconButton>
                                                    <IconButton color="error" onClick={() => alert(`Delete ${emp.first_name}`)}><Delete /></IconButton>
                                                </TableCell>

                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} align="centre" sx={{py:3}}>
                                                No employees found
                                            </TableCell>
                                        </TableRow>
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                )}
            </Paper>
        </Box>
    );
};

export default EmployeeList;