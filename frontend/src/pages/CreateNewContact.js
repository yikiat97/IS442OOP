import * as React from 'react';
import dayjs from 'dayjs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { Container, textAlign, spacing, Box } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import { useState } from "react";
import axios from "axios";

function CreateNewContact(){
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const company = "test";
    const passwordtest = "";

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setMessage("");
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
        setMessage("");
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setMessage("");
    };

    const createUser = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.post(
            "http://localhost:8080/login/create" + role,
            {
                email,
                name,
                role,
                company,
                passwordtest
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
            }
          );
          console.log(res, "res");
        } catch (error) {
          setMessage("Something went wrong");
        }
        
      };

    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={1.5}>
                    <h1>User Management</h1>
                </Grid>

                <Grid item md={1}></Grid>


            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h3>Company Name</h3>
                </Grid>
    
                                
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleNameChange}>
                                <FormHelperText id="outlined-weight-helper-text">Contact Name</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleEmailChange}>
                                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">User Role</FormHelperText>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="User Role"
                                    onChange={handleRoleChange}
                                    >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Approver">Approver</MenuItem>
                                    <MenuItem value="Vendor">Vendor</MenuItem>
                                    </Select>
                            </FormControl>
                            <FormControl sx={{m: 2, width: '25ch' }}>
                                <FormHelperText id="outlined-weight-helper-text">Password</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                    </Box>
                               

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={createUser}>
                                Save
                        </Button>
                    
                        
                </Grid>
            
            </Paper>
            


        </Grid>
        
    )
    
}

export default CreateNewContact;