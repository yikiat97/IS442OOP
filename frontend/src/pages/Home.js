import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Logo from '../img/quantumvms.png';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EastIcon from '@mui/icons-material/East';

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

const theme = createTheme();

function Home() {
  return (

      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>

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


          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:"#2596BE"}}
              endIcon={<EastIcon/>}
              href='/Login'
              >
              Sign In
              
            </Button>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

  );
}

export default Home;
