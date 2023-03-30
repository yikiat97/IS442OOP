import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ErrorIcon from '@mui/icons-material/Error';
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
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function NotAuthorized() {

  const role = sessionStorage.getItem("role")
  return (
    
      <Container component="main" >
        
    
          <Grid container sx={{marginTop: 8, display: "flex", flexDirection: "column", alignContent: "center", justifyContent:"center", width:'100%'}}>
            <Grid item sx={{display:"flex"}}>
                <Typography component="h1" variant="h6">
                <ErrorIcon color="error"/> You are not authorized to access this page
              </Typography>
            </Grid>

            <Grid item sx={{pt:2}}>
                <Link href="/">Return to home page</Link>
            </Grid>
          </Grid>
            
        
      </Container>
    
  );
}

export default NotAuthorized;
