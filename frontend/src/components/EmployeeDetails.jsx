import React, { useEffect, useState } from "react";
import { Box, Card, Typography, Divider } from "@mui/material";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

export default function EmployeeDetails(){

    const { id } = useParams();
    const [emp, setEmp] = useState(null);

    useEffect(() => {
       axios.get('/employees/${id}').then((res)=> setEmp(res.data));
    }, [id]);

    if (!emp){
        return <Typography p={4}>Loading...</Typography>;
    }
    return (
        <Box display="flex" justifyContent="center" minHeight="100vh" p={4}>
            <Card sx={{width: 500, p:4}}>
                <Typography variant="h5" mb={2}>
                    Employee Details
                </Typography>
                <Divider/>

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
            </Card>
        </Box>
    );
}