import React from "react";
import DataTable from "./DataTable";
import DepartmentList from "./DepartmentList";
import Typography from "@mui/material/Typography";
import Container from '@mui/material/Container';

const SecondPage = () => {

  const userDetails = localStorage.getItem("userDetails");

    if (!userDetails) {
      alert("Please enter your details before accessing this page.");
     window.location.href = "/";
    }

    const { name, phone, email } = JSON.parse(userDetails);
 

  return (
    
    <Container component="main" maxWidth="m" sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
     
      <Typography component="h6" variant="h3">Welcome, back {name}!!</Typography>
      <Typography component="h2" variant="h6">Phone number: {phone}</Typography>
      <Typography component="h2" variant="h6">Email: {email}</Typography>
     
      <DataTable />
     
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
