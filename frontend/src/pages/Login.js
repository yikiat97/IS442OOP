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



function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setMessage("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setMessage("");
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/login/authenticate",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(res, "res");
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("user", email);
      sessionStorage.setItem("role", res.data);
      handleReroute();
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Wrong email/password")
      } else {
        setMessage("Something went wrong")
      }
    }
    
  };

  const handleReroute = () => {
    const role = sessionStorage.getItem("role");
    if (role === "Admin") {
      window.location.replace(window.location.origin + "/WorkflowsAdmin");
    } else if (role === "Vendor") {
      window.location.replace(window.location.origin + "/ViewWorkflows");
    } else{
      window.location.replace(window.location.origin + "/ViewWorkflows");
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
          
          <Typography component="h1" variant="h4" sx={{fontWeight:"bold"}}>
            Hi, Welcome Back!
          </Typography>
          <Typography sx={{pb:2}}>
            Please enter your details.
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Grid container sx={{display:"flex"}}>
              <Grid item xs>
                <Link href='ForgetPassword' variant="body2">
                  Forgot password?
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
              onClick={login}>
              Sign In
            </Button>
            
          </Box>

        </Paper>

        </Container>
      </div>
    
  );
}

export default Login;
