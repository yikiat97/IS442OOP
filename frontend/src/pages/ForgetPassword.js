import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Logo from '../img/quantumvms.png';
import background from '../img/background.jpg';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



function ForgetPassword(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setMessage("");
  };

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/login/changePassword?email=" + email
      );
      console.log(res, "res");
      setMessage("Email has been sent.");
    } catch (error) {
      setMessage("Something went wrong");
    }
    
  };


  const App={
    width:'100%',
  };

  const loginStyle={
    
    width:"100%",
    
  }

  return (
  
    <div style={loginStyle} className='App'>
      <Container sx={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
        
        <Paper elevation={3} sx={{pb:6, pt:3, px:6}}>

          
          <Grid container sx={{py:2, pt:2,pb:3, display:"flex", justifyContent:"center", alignItems:"center"}} spacing={1}>
              <Grid item>
                  <img src={Logo} width={40} height={40}/>
              </Grid>
              <Grid item>
                  <Typography component="h1" variant="h5" sx={{color:"#2596BE"}}>
                  Quantum
                </Typography>
              </Grid>
              <Grid item>
                  <Typography component="h1" variant="h5" sx={{fontWeight:"bold"}}>
                  VMS
                </Typography>
              </Grid>
          </Grid>
          
          <Typography sx={{pb:2}}>
          Enter the email address associated with your account and we'll send you a link to reset your password.
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <Grid container sx={{display:"flex"}}>
              <Grid item xs>
                <Link href='Login' variant="body2">
                  Sign in instead
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{color: "red"}}>
              {message}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:"#2596BE"}}
              onClick={changePassword}>
              Continue
            </Button>
            
          </Box>

        </Paper>

        </Container>
      </div>
    
  );
}

export default ForgetPassword;
