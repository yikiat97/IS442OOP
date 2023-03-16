import * as React from 'react';
import { Box } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import {
    FormControl,
    FormHelperText, 
    Grid, 
    Paper, 
    TextField, 
    Input, 
    InputLabel,
    InputAdornment, 
    OutlinedInput,
    Button,
    Link,
    Typography
} from "@mui/material";
import { useState } from "react";
import axios from "axios";


function CreateCompany(){
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    
    const handleNameChange = (event) => {
        setName(event.target.value);
        setMessage("");
      };
    
      const handleCountryChange = (event) => {
        setCountry(event.target.value);
        setMessage("");
      };

      const saveCompany = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post(
            "http://localhost:8080/company/add",
            {
              name,
              country              
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
            }
          );
          console.log(res, "res");
        } catch (error) {
            if (error.response.status === 409) {
                setMessage("Company already exists")
              } else {
                setMessage("Something went wrong")
              }
        }
        
      };


    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>User Management</h1>
                </Grid>
                
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Link href='CreateNewContact' underline='none'>
                        <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}}
                                startIcon={<AddIcon/>}>
                                Create New Contact 
                        </Button>
                    </Link>
                
                </Grid>

            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h3>New Company</h3>
                </Grid>
    
                                
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleNameChange}>
                                <FormHelperText id="outlined-weight-helper-text">Company Name</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleCountryChange}>
                                <FormHelperText id="outlined-weight-helper-text">Country of Origin</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                        </div>
                    </Box>
                               

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={saveCompany}>
                                Save
                        </Button>
                    
                        
                </Grid>
            
            </Paper>
            <Typography sx={{color: "red"}}>
              {message}
            </Typography>


        </Grid>
        
    )
    
}

export default CreateCompany;