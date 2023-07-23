import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const FirstPage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name.trim() === "" || phone.trim() === "" || email.trim() === "") {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        localStorage.setItem("userDetails", JSON.stringify({ name, phone, email }));

        navigate("/second");
    };

    return (
             <Container component="main" maxWidth="xs" sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
           
           <Typography component="h1" variant="h5">
            User Login
          </Typography>
          
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
               
                <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"  value={name}
              onChange={(e) => setName(e.target.value)}
       
              autoFocus
            />
              
                <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone No."
              name="Phone"
              autoComplete="phone" value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoFocus
            />
          
                <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
      
            />
                <Button type="submit" fullWidth variant="contained"
              sx={{ mt: 3, mb: 2 }}>Submit</Button>
         
            </Box>
            </Container>
        
    );
};

export default FirstPage;
