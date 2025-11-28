import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Divider, Button } from "@mui/material";
import axios from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeDetails(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [emp, setEmp] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const res = await axios.get(`/emp/employees/${id}`);
            setEmp(res.data);
          } catch (error) {
            console.error("Error fetching employee:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchEmployee();
    }, [id]);

    if (loading) return <Typography p={4}>Loading...</Typography>;
    if (!emp) return <Typography p={4}>Employee not found</Typography>;

    return (
        <Box display="flex" justifyContent="center" p={4}>
            <Card sx={{width: 600, p:4}}>
                <Typography variant="h5" mb={2}>
                    Employee Details
                </Typography>
                <Divider/>

                {emp.profilePic && (
                <Box display="flex" justifyContent="center" my={2}>
                    <img
                    src={`http://localhost:3000/uploads/${emp.profilePic}`}
                    alt={`${emp.first_name} ${emp.last_name}`}
                    style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
                    />
                </Box>
                )}

                <Typography mt={2}><b>Name:</b> {emp.first_name} {emp.last_name}</Typography>
                <Typography><b>Email:</b> {emp.email}</Typography>
                <Typography><b>Position:</b> {emp.position}</Typography>
                <Typography><b>Department:</b> {emp.department}</Typography>
                <Typography><b>Salary:</b> ${emp.salary}</Typography>
                <Typography><b>Date of Joining:</b> {new Date(emp.date_of_joining).toLocaleDateString()}</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="caption" color="gray">
                    Created: {new Date(emp.created_at).toLocaleString()}
                    <br />
                    Updated: {new Date(emp.updated_at).toLocaleString()}
                </Typography>

                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/employees/update/${id}`)}
                    >
                        Edit
                    </Button>
                    <Button variant="outlined" onClick={() => navigate("/employees")}>
                        Back
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}