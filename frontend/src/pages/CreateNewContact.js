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
import { message} from 'antd';

function CreateNewContact(){
    const registrationNumber = useParams().company;
    const [showPassword, setShowPassword] = React.useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const password = "";
    const [contactNumber,setContactNumber] = useState("");
    const [companyDetails, setCompanyDetails] = useState([]);
    
    const [emailList, setEmailList] = useState([]);
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setEmailError("Please enter an Email");
        getCompanyDetails();
        getEmails();
      }, []);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if(event.target.value === ""){
            setEmailError("Please enter an Email");
        }else if(emailList.includes(event.target.value)){
            setEmailError("Email already exists");
        }else if(!regex.test(event.target.value)){
            setEmailError("Enter a valid Email");
        }else{
            setEmailError("");
        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleNumberChange = (event) => {
        setContactNumber(event.target.value);
    };

    const getEmails = () => {
        axios.get("http://localhost:8080/login/getEmails")
        .then((response) => {
            setEmailList(response.data);
        })
        .catch(error => console.error(error));
    };

    const cancel = (event) => {
        navigate("/QuantumDetails/" + registrationNumber);
    }

    const getCompanyDetails = () => {
        axios.get("http://localhost:8080/company/getDetails?registrationNum=" + registrationNumber)
        .then((response) => {
            setCompanyDetails(response.data);
        })
        .catch(error => console.error(error));
    };

    const createUser = async (e) => {
        e.preventDefault();
        console.log(role);
        try {
            if(name===""){
                message.warning("No Contact Name given!")
                return;
            } else if(email===""){
                message.warning("No Contact Email given!")
                return;
            } else if(emailList.includes(email)){
                message.warning("Email already exists!")
                return;
            } else if(!regex.test(email)){
                message.warning("Enter a valid Email");
            } else if(role===""){
                message.warning("Select a Role")
                return;
            } else{
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
            }        
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
                                    onChange={handleNameChange}
                                />
                                {name===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Name</FormHelperText> : <></>}
                            </FormControl>

                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                                <TextField
                                    onChange={handleEmailChange}
                                    />
                                <FormHelperText sx={{color:"#dd3c32"}}>{emailError}</FormHelperText>
                            </FormControl>

                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Number</FormHelperText>
                                <TextField
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
                                    {role===""? <FormHelperText sx={{color:"#dd3c32"}}>Please select a Role</FormHelperText> : <></>}
                            </FormControl>
                        </div>
                    </Box>
                               

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="error" onClick={cancel}>
                            Cancel
                    </Button>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={createUser}>
                            Save
                    </Button>
                </Grid>
            
            </Paper>
            


        </Grid>
        
    )
    
}

export default CreateNewContact;