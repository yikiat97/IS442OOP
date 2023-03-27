import * as React from 'react';
import { Box } from "@mui/system";
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
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';

function CreateNewContact(){
    const company = useParams().company;
    const registrationNumber = useParams().company;
    const [showPassword, setShowPassword] = React.useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const password = "";
    const [error, setError] = useState(false);
    const [contactNumber,setContactNumber] = useState("");
    const [companyDetails, setCompanyDetails] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getCompanyDetails();
      }, []);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        // validate email input using regex
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value !== '' && !regex.test(value)) {
            setError(true);
          } else {
            setError(false);
          }
        setEmail(value);
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

    const handleNumberChange = (event) => {
        setContactNumber(event.target.value);
        setMessage("");
    };

    const getCompanyDetails = () => {
        axios.get("http://localhost:8080/company/getDetails?registrationNum=" + registrationNumber)
        .then((response) => {
            setCompanyDetails(response.data);
        })
        .catch(error => console.error(error));
    };

    const createUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:8080/login/create" + role,
                {
                    password,
                    name,
                    email,
                    contactNumber,
                    role,
                    companyRegistrationNum: registrationNumber              
                },
                {
                    headers: {
                    "Content-Type": "application/json"
                    },
                }
            );

            let route = "/QuantumDetails/" + registrationNumber;  
            navigate(route);          
        } catch (error) {
            console.log(error);
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
                    <h3>{companyDetails.name}</h3>
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
                                <TextField
                                    value={email}
                                    onChange={handleEmailChange}
                                    error={error}
                                    helperText={error && email !== '' ? 'Please enter a valid email address' : null}
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
                                    onChange={handleRoleChange}
                                    >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Approver">Approver</MenuItem>
                                    <MenuItem value="Vendor">Vendor</MenuItem>
                                    </Select>
                            </FormControl>
                        </div>
                    </Box>
                               

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={createUser}>
                                Save
                        </Button>
                </Grid>
                <Typography sx={{color: "red"}}>
                    {message}
                </Typography>
            
            </Paper>
            


        </Grid>
        
    )
    
}

export default CreateNewContact;