import * as React from "react";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import Logo from '../img/quantumvms.png';
import background from '../img/background.jpg';
import {
  FormControl,
  FormHelperText, 
  Grid, 
  IconButton,
  Paper, 
  TextField, 
  Input, 
  InputLabel,
  InputAdornment, 
  OutlinedInput,
  FormControlLabel, 
  FormLabel,
  Menu,
  MenuItem,
  Button,
  Link,
  Select,
} from "@mui/material";

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



function ChangePassword(props) {
  //const = "sessionStorage.getItem("email");"
  const email = "diyanahjamal@gmail.com";
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
    setMessage("");
    setComplete("");
  };

  const handleNewPassword = (event) => {
    setNewPassword(event.target.value);
    setMessage("");
    setComplete("");
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setComplete("");
    
    try {
      const res = await axios.put(
        "http://localhost:8080/login/changePassword?email=" + email +"&oldPassword="+ oldPassword +"&newPassword=" + newPassword,
      );
      console.log(res, "res");
      setMessage("");
      setComplete("Your password has been changed");
    } catch (error) {
      setMessage("Old password is incorrect");
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
            <h3>Change Password</h3>
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 0 }}>
          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">Old Password</FormHelperText>
              <TextField
                onChange={handleOldPassword}
              />
          </FormControl>
          <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
              <FormHelperText id="outlined-weight-helper-text">New Password</FormHelperText>
              <TextField
                onChange={handleNewPassword}
              />
            </FormControl>
            <Grid container sx={{display:"flex"}}>
              <Grid item xs>
                <Link href='ForgetPassword' variant="body2">
                  Forget Password
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{color: "red"}}>
              {message}
            </Typography>
            <Typography sx={{color: "green"}}>
              {complete}
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:"#2596BE"}}
              onClick={updatePassword}>
              Change Password
            </Button>
            
          </Box>

        </Paper>

        </Container>
      </div>
    
  );
}

export default ChangePassword;
