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
    Typography,
    MenuItem,
    Select,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { message} from 'antd';

function CreateCompany(){
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [registrationNum, setRegistrationNum] = useState("");
    const [gstRegistrationNumber, setGstRegistrationNumber] = useState("");
    const [businessNature, setBusinessNature] = useState("");

    const [registrationNumError, setRegistrationNumError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [contactName, setContactName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("Vendor");
    const [password, setPassword] = useState("");

    const [registrationNumList, setRegistrationNumList] = useState([]);
    const [emailList, setEmailList] = useState([]);

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleRegistratioNumberChange = (event) => {
        setRegistrationNum(event.target.value);
        if(event.target.value === ""){
            setRegistrationNumError("Please enter a Registration Number");
        }else if(registrationNumList.includes(event.target.value)){
            setRegistrationNumError("Registration Number already exists");
        }else{
            setRegistrationNumError("");
        }
    };

    const handleGSTRegistratioNumberChange = (event) => {
        setGstRegistrationNumber(event.target.value);
    };

    const handleBusNatureChange = (event) => {
        setBusinessNature(event.target.value);
    };

    const handleContactNameChange = (event) => {
        setContactName(event.target.value);
    };

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleContactEmailChange = (event) => {
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

    const handleContactNumChange = (event) => {
        setContactNumber(event.target.value);
    };

    const handleContactRoleChange = (event) => {
        setRole(event.target.value);
    };

    const cancel = (event) => {
        navigate("/UserManagement");
    }

    const getRegistrationNums = () => {
        axios.get("http://localhost:8080/company/registrationList")
        .then((response) => {
            setRegistrationNumList(response.data);
        })
        .catch(error => console.error(error));
    };

    const getEmails = () => {
        axios.get("http://localhost:8080/login/getEmails")
        .then((response) => {
            setEmailList(response.data);
        })
        .catch(error => console.error(error));
    };

    useEffect(() => {
        setRegistrationNumError("Please enter a Registration Number");
        setEmailError("Please enter an Email");
        getRegistrationNums();
        getEmails();
    }, []);

    const saveCompany = async (e) => {
        e.preventDefault();

        try {
            if(name===""){
                message.warning("No Company Name given!")
                return;
            } else if(country===""){
                message.warning("No Country given!")
                return;
            } else if(registrationNum===""){
                message.warning("No Registration Number given!")
                return;
            } else if(gstRegistrationNumber===""){
                message.warning("No GST Registration Number given!")
                return;
            } else if(contactName===""){
                message.warning("No Contact Name given!")
                return;
            } else if(email===""){
                message.warning("No Contact Email given!")
                return;
            } else if(registrationNumList.includes(registrationNum)){
                message.warning("Registration Number already exists!")
                return;
            } else if(emailList.includes(email)){
                message.warning("Email already exists!")
                return;
            } else if(!regex.test(email)){
                message.warning("Enter a valid Email");
            }else{
                const res = await axios.post(
                "http://localhost:8080/company/add",
                {
                    registrationNum,
                    name,
                    country,
                    businessNature,
                    gstRegistrationNumber              
                },
                {
                    headers: {
                    "Content-Type": "application/json"
                    },
                }
                );
                const res1 = await axios.post(
                    "http://localhost:8080/login/create" + role,
                    {
                        password,
                        name : contactName,
                        email,
                        contactNumber,
                        role,
                        companyRegistrationNum: registrationNum              
                    },
                    {
                        headers: {
                        "Content-Type": "application/json"
                        },
                    }
                );
                
                navigate('/UserManagement');
            } 
        }catch (error) {
            console.log(error.response);
            navigate('/UserManagement');
        }
    
    };


    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>User Management</h1>
                </Grid>

                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="error" onClick={cancel}>
                            Cancel
                    </Button>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success" onClick={saveCompany}>
                            Finish
                    </Button>
                </Grid>

            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h3>New Company {name}</h3>
                </Grid>
    
                                
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleNameChange}>
                                <FormHelperText id="outlined-weight-helper-text">Company Name</FormHelperText>
                                <OutlinedInput 
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {name===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Name</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleCountryChange}>
                                <FormHelperText id="outlined-weight-helper-text">Country of Origin</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {country===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Country</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleRegistratioNumberChange}>
                                <FormHelperText id="outlined-weight-helper-text">Registration Number</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                <FormHelperText sx={{color:"#dd3c32"}}>{registrationNumError}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleGSTRegistratioNumberChange}>
                                <FormHelperText id="outlined-weight-helper-text">GST Registration Number</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {gstRegistrationNumber===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a GST registration number</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleBusNatureChange}>
                                <FormHelperText id="outlined-weight-helper-text">Business Nature</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                        </div>
                    </Box>
            
            </Paper>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h3>New Contact</h3>
                </Grid>
    
                                
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleContactNameChange}>
                            <FormHelperText id="outlined-weight-helper-text">Contact Name</FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                            />
                            {contactName===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Name</FormHelperText> : <></>}
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleContactEmailChange}>
                            <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                            />
                            <FormHelperText sx={{color:"#dd3c32"}}>{emailError}</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleContactNumChange}>
                            <FormHelperText id="outlined-weight-helper-text">Contact Number</FormHelperText>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                aria-describedby="outlined-weight-helper-text"
                            />
                        </FormControl>
                        <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                            <FormHelperText id="outlined-weight-helper-text">User Role</FormHelperText>
                                <Select value={role} onChange={handleContactRoleChange}>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Approver">Approver</MenuItem>
                                <MenuItem value="Vendor">Vendor</MenuItem>
                                </Select>
                        </FormControl>
                    </div>
                </Box>
            </Paper>
        
        </Grid>
        
    )
    
}

export default CreateCompany;