import * as React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import {

    Box,
    Collapse,
    Grid, 
    IconButton,
    Paper, 
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    TextField,
    InputBase,
    Autocomplete,
    InputAdornment,
    Input,
    Link
        
} from "@mui/material";
import { useState, useEffect, useParams } from "react";
import axios from "axios";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:theme.palette.common.white,
      color: theme.palette.primary.dark,
      fontWeight: theme.typography.fontWeightBold,
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

  return (
    <React.Fragment>
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" >
            <Typography sx={{fontWeight: 'bold'}}>{row[0].registrationNum}</Typography>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" >
            <Typography sx={{fontWeight: 'bold'}}>{row[0].name}</Typography>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row" >
            <Typography sx={{fontWeight: 'bold'}}>{row[0].country}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left"><DeleteOutlineIcon sx={{color:'#c62828'}}/></StyledTableCell>
        <Link href={'EditUser/' + row[1].email} underline='none'>
            <StyledTableCell align="left"><EditIcon sx={{color:'#1565c0'}} /></StyledTableCell>
        </Link>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="contacts">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left">Contact Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Contact Number</StyledTableCell>
                    <StyledTableCell align="left">User Role</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow key={row[1].name}>
                    <StyledTableCell component="th" scope="row">
                      {row[1].name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row[1].name}</StyledTableCell>
                    <StyledTableCell align="left">{row[1].email}</StyledTableCell>
                    <StyledTableCell align="left">{row[1].role}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

function Vendor() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#fafafa',
          color: theme.palette.common.black,
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
    
      const [companies, setCompanies] = useState([]);

      useEffect(() => {
          getCompany();
      }, []);
  
      const getCompany = () => {
          axios.get("http://localhost:8080/login/getVendors")
          .then((response) => {
              setCompanies(Object.entries(response.data));
          })
          .catch(error => console.error(error));
      };
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>Vendor</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                    <Link href='CreateCompany' underline='none'>
                        <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}}
                                startIcon={<AddIcon/>}>
                                Create New Company 
                        </Button>
                    </Link>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell/>
                        <StyledTableCell >Registration Number</StyledTableCell>
                        <StyledTableCell align="left">Company Name</StyledTableCell>
                        <StyledTableCell align="left">Country of Origin</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {companies.map((company) => (
                        <Row key={company[0]} row={company[1]} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


                
        </Grid>
        
    )
}

export default Vendor;