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
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function CreateNewContact(){
    const email = useParams().userEmail;

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const passwordtest = "";

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
      }, []);

    const handleNameChange = (event) => {
        setName(event.target.value);
        setMessage("");
    };

    const handleNumberChange = (event) => {
        setContactNumber(event.target.value);
        setMessage("");
    };

    const getUser = () => {

    axios.get("http://localhost:8080/login/getUser?email=" + email)
      .then((response) => {
        setName(response.data[0]);
        if(response.data[1] != null){
            setContactNumber(response.data[1]);
        }
        setRole(response.data[2]);
        setCompany(response.data[3]);
        
      })
      .catch(error => console.error(error));
      };

    const editUser = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.put(
            "http://localhost:8080/login/editUser",
            {
                email,
                name,
                role,
                company,
                contactNumber,
                passwordtest
            },
            {
              headers: {
                "Content-Type": "application/json"
              },
            }
          );
          navigate("/CompanyDetails/" + company)
        } catch (error) {
          setMessage("Something went wrong. Please try again later");
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
                    <h3>{company}</h3>
                </Grid>
    
                                
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Name</FormHelperText>
                                <TextField
                                    value={name}
                                    onChange={handleNameChange}
                                />
                            </FormControl>

                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                                <TextField disabled
                                    value={email}
                                    />
                            </FormControl>

                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Number</FormHelperText>
                                <TextField  
                                    value={contactNumber}
                                    onChange={handleNumberChange}
                                />
                            </FormControl>
                        
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">User Role</FormHelperText>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={role}
                                    label="User Role"
                                    disabled
                                    >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Approver">Approver</MenuItem>
                                    <MenuItem value="Vendor">Vendor</MenuItem>
                                    </Select>
                            </FormControl>
                        </div>
                    </Box>
                               

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={editUser}>
                                Save
                        </Button>
                    
                        
                </Grid>
            
            </Paper>
            


        </Grid>
        
    )
    
}

export default CreateNewContact;