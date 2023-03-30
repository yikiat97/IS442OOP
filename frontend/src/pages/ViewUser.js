import * as React from 'react';
import { Container, textAlign, spacing, Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { message} from 'antd';
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
import { useParams, useNavigate } from 'react-router-dom';


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
    const email = useParams().email;
    const password = "";
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getUser();
      }, []);

    const edit = (event) =>{
        navigate('/EditUser/' + registrationNum + "/" + email);
    }

    const getUser = () => {
        axios.get("http://localhost:8080/login/getUser?email=" + email)
        .then((response) => {
            console.log(response.data[2]);
            setContactName(response.data[0]);
            setContactNumber(response.data[1]);
            setRole(response.data[2])
        })
        .catch(error => console.error(error));
    };

    const changePassword = (event) => {
        let route = "/ChangePassword"
        navigate(route);
    }

    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>User Management</h1>
                </Grid>
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="primary" onClick={changePassword}>
                            Change Password
                    </Button>
                    <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="primary" onClick={edit}>
                        Edit
                    </Button>
                </Grid>
            </Grid>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h2>{contactName}</h2>
                </Grid>


                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <div>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Name</FormHelperText>
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={contactName}
                                    disabled
                                />
                                {contactName===""? <FormHelperText sx={{color:"#dd3c32"}}>Please enter a Name</FormHelperText> : <></>}
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Email</FormHelperText>
                                <OutlinedInput
                                    disabled
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={email}
                                    
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text">Contact Number</FormHelperText>
                                <OutlinedInput
                                    disabled
                                    id="outlined-adornment-weight"
                                    aria-describedby="outlined-weight-helper-text"
                                    value={contactNumber}
                                    
                                />
                            </FormControl>
                            <FormControl sx={{ m: 2, width: '25ch' }} variant="outlined">
                                <FormHelperText id="outlined-weight-helper-text" defaultValue={role}>User Role</FormHelperText>
                                    <Select disabled value={role}>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Approver">Approver</MenuItem>
                                        <MenuItem value="Vendor">Vendor</MenuItem>
                                    </Select>
                            </FormControl>
                        </div>
                </Box>
                </Grid>
            </Paper>
        </Grid>
        
    )
    
}

export default EditUser;