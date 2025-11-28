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
    MenuItem,
    Button
  } from "@mui/material";
  import { Edit, Delete, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {

    const departments = ["All", "HR", "Engineering", "Finance", "Marketing"];
    const positions = ["All", "Manager", "Developer", "Analyst", "Designer"];

    const [departmentFilter, setDepartmentFilter] = useState("All");
    const [positionFilter, setPositionFilter] = useState("All");


    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async() => {
            try {
                const response = await axios.get("/emp/employees");
                setEmployees(response.data);
            } catch (err){
                console.error("Error fetching employees:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this employee?")) return;

        try {
          await axios.delete(`/emp/employees/${id}`);
          setEmployees((prev) => prev.filter((e) => e._id !== id));
        } catch (err) {
          console.error("Delete failed:", err);
        }
    };

    const filteredEmployees = employees.filter((emp) =>
        `${emp.first_name} ${emp.last_name}`
            .toLowerCase().includes(search.toLowerCase())
    );


    const handleFilterSearch = async () => {
        try {
          const queryParams = new URLSearchParams();
          if (departmentFilter !== "All") queryParams.append("department", departmentFilter);
          if (positionFilter !== "All") queryParams.append("position", positionFilter);
          if (search) queryParams.append("name", search); 
      
          const res = await axios.get(`/emp/employees/search?${queryParams.toString()}`);
          setEmployees(res.data);
        } catch (err) {
          console.error("Error fetching filtered employees:", err);
        }
    };
      
    return(
        <Box sx={{ p:4, bgcolor: "#f5f5f5", minHeight:"100vh"}}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Employee Directory
            </Typography>
            <Paper sx={{ p:2}}>
            <Toolbar sx={{ px: 0, mb: 2, display: "flex", gap: 2 }}>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TextField
                    select
                    label="Department"
                    size="small"
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    sx={{ width: 200 }}
                >
                    {departments.map((d) => (
                    <MenuItem key={d} value={d}>
                        {d}
                    </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    label="Position"
                    size="small"
                    value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)}
                    sx={{ width: 200 }}
                >
                    {positions.map((p) => (
                    <MenuItem key={p} value={p}>
                        {p}
                    </MenuItem>
                    ))}
                </TextField>

                <Button
                    variant="contained"
                    onClick={handleFilterSearch}
                    size="small"
                >
                    Filter
                </Button>
            </Toolbar>

                {loading ? (
                    <Box display="flex" justifyContent="center" py={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#f5f5f5", '& th': { fontWeight: 600 }}}>
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
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => navigate(`/employees/details/${emp._id}`)}
                                                    >
                                                        <Visibility />
                                                    </IconButton>

                                                    {/* Navigate to edit page */}
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => navigate(`/employees/update/${emp._id}`)}
                                                    >
                                                        <Edit />
                                                    </IconButton>

                                                    <IconButton color="error" onClick={() => handleDelete(emp._id)}><Delete /></IconButton>
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