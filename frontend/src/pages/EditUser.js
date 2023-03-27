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
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import {
    FormControl,
    FormHelperText, 
    Grid, 
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography, 
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
import { useParams } from 'react-router-dom';


function EditUser(){

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.info.dark,
          color: theme.palette.common.white,
          fontWeight: theme.typography.fontWeightBold,
          fontSize: 14,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 12,
        },
      }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.common.white,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    const registrationNum = useParams().company;
    const [users, setUsers] = useState([]);
    const [companyDetails, setCompanyDetails] = useState([]);

    useEffect(() => {
        getUsers();
        getCompanyDetails();
      }, []);

    const getCompanyDetails = () => {
        axios.get("http://localhost:8080/company/getDetails?registrationNum=" + registrationNum)
        .then((response) => {
            setCompanyDetails(response.data);
        })
        .catch(error => console.error(error));
    };

    const getUsers = () => {
        axios.get("http://localhost:8080/login/getUsersByCompany?registrationNumber=" + registrationNum)
        .then((response) => {
            setUsers(response.data);
        })
        .catch(error => console.error(error));
    };

    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>User Management</h1>
                </Grid>
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="primary">
                                Edit
                        </Button>
                </Grid>
            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h2>{companyDetails.name}</h2>
                </Grid>


                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            
                                <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                    <FormHelperText id="outlined-weight-helper-text">Country of Origin</FormHelperText>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        aria-describedby="outlined-weight-helper-text"
                                        value={companyDetails.country}
                                        
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                    <FormHelperText id="outlined-weight-helper-text">Registration Number</FormHelperText>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        aria-describedby="outlined-weight-helper-text"
                                        value={companyDetails.registrationNum}
                                        
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                    <FormHelperText id="outlined-weight-helper-text">GST Registration Number</FormHelperText>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        aria-describedby="outlined-weight-helper-text"
                                        value={companyDetails.gstRegistrationNumber}
                                        
                                    />
                                </FormControl>
                                <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                    <FormHelperText id="outlined-weight-helper-text">Business Nature</FormHelperText>
                                    <OutlinedInput
                                        id="outlined-adornment-weight"
                                        aria-describedby="outlined-weight-helper-text"
                                        value={companyDetails.businessNature}
                                        
                                    />
                                </FormControl>    
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        {users.map((user) => (
                            <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Name</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={user.name}
                                    
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={user.email}
                                    
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Number</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={user.contactNumber}
                                    
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">User Role</FormHelperText>
                                    <Select value={user.role} >
                                    <MenuItem value="Admin">Admin</MenuItem>
                                    <MenuItem value="Approver">Approver</MenuItem>
                                    <MenuItem value="Vendor">Vendor</MenuItem>
                                    </Select>
                            </FormControl>
                        </div>
                    ))}
                </Box>
                </Grid>
            </Paper>
        </Grid>
        
    )
    
}

export default EditUser;