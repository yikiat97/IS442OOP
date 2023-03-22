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


function CompanyDetails(){

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
    
    const company = useParams().company;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
      }, []);

    const getUsers = () => {
    axios.get("http://localhost:8080/company/getUsers?name=" + company)
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
                    <h2>{company}</h2>
                </Grid>


                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                   <Table size="small" aria-label="contacts">
                        <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="left">Contact Name</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Contact Number</StyledTableCell>
                            <StyledTableCell align="left">User Role</StyledTableCell>
                            <StyledTableCell />
                            <StyledTableCell />
                        </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <StyledTableRow key={user.name}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="left">{user.email}</StyledTableCell>
                                <StyledTableCell align="left">{user.contactNumber == null ? "Not available" : user.contactNumber}</StyledTableCell>
                                <StyledTableCell align="left">{user.role}</StyledTableCell>
                                <StyledTableCell align="right"><DeleteOutlineIcon sx={{color:'#c62828'}}/></StyledTableCell>
                                <Link href={'../EditUser/' + user.email} underline='none'>
                                    <StyledTableCell align="left"><EditIcon sx={{color:'#1565c0'}} /></StyledTableCell>
                                </Link>
                            </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table> 
                </Grid>
            </Paper>
        </Grid>
        
    )
    
}

export default CompanyDetails;