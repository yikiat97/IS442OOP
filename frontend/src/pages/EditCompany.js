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
import { useNavigate, useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { message} from 'antd';

function EditCompany(){
    const registrationNumUnchanged = useParams().company;

    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [registrationNum, setRegistrationNum] = useState("");
    const [gstRegistrationNumber, setGstRegistrationNumber] = useState("");
    const [businessNature, setBusinessNature] = useState("");

    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleGSTRegistratioNumberChange = (event) => {
        setGstRegistrationNumber(event.target.value);
    };

    const handleBusNatureChange = (event) => {
        setBusinessNature(event.target.value);
    };

    const getCompanyDetails = () => {
        axios.get("http://localhost:8080/company/getDetails?registrationNum=" + registrationNumUnchanged)
        .then((response) => {
            setName(response.data.name);
            setCountry(response.data.country);
            setRegistrationNum(response.data.registrationNum);
            setGstRegistrationNumber(response.data.gstRegistrationNumber);
            setBusinessNature(response.data.businessNature);
        })
        .catch(error => console.error(error));
    };

    useEffect(() => {
        getCompanyDetails();
      }, []);
    
    const cancel = (event) =>{
        const route = "/QuantumDetails/" + registrationNum;
        navigate(route);
    } 

    const saveCompany = async (e) => {
        e.preventDefault();

        try {
            if(name===""){
                message.warning("No Company Name given!")
                return;
            } else if(country===""){
                message.warning("No Country given!")
                return;
            } else if(gstRegistrationNumber===""){
                message.warning("No GST Registration Number given!")
                return;
            } else{
                const res = await axios.put(
                "http://localhost:8080/company/edit",
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
                
                navigate('/UserManagement');
            }
            
        } catch (error) {
            console.log(error);
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
                            Save
                    </Button>
                </Grid>

            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
               
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleNameChange}>
                                <FormHelperText id="outlined-weight-helper-text">Company Name</FormHelperText>
                                <OutlinedInput 
                                    value={name}
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {name===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Name</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleCountryChange}>
                                <FormHelperText id="outlined-weight-helper-text">Country of Origin</FormHelperText>
                                <OutlinedInput
                                    value={country}
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {country===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Country</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Registration Number</FormHelperText>
                                <OutlinedInput
                                    disabled
                                    value={registrationNum}
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleGSTRegistratioNumberChange}>
                                <FormHelperText id="outlined-weight-helper-text">GST Registration Number</FormHelperText>
                                <OutlinedInput
                                    value={gstRegistrationNumber}
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                                {gstRegistrationNumber===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a GST registration number</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined" onChange={handleBusNatureChange}>
                                <FormHelperText id="outlined-weight-helper-text">Business Nature</FormHelperText>
                                <OutlinedInput
                                    value={businessNature}
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                />
                            </FormControl>
                        </div>
                    </Box>
            
            </Paper>
        </Grid>
        
    )
    
}

export default EditCompany;