import * as React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled, alpha} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import {

    Grid, 
    Paper, 
    Button,
    Card, 
    CardContent,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Menu,
    MenuItem
        
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";


function UserManagement(){
    const [numVendor, setNumVendor] = useState("");
    const [numApprover, setNumApprover] = useState("");
    const [numAdmin, setNumAdmin] = useState("");
    const [companies, setCompanies] = useState([]);

        const StyledMenu = styled((props) => (
            <Menu
            elevation={0}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            {...props}
            />
        ))(({ theme }) => ({
            '& .MuiPaper-root': {
            borderRadius: 6,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color:
                theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
            boxShadow:
                'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            '& .MuiMenu-list': {
                padding: '4px 0',
            },
            '& .MuiMenuItem-root': {
                '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
                },
                '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
                },
            },
            },
        }));

            const [anchorEl, setAnchorEl] = React.useState(null);
            const open = Boolean(anchorEl);
            const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            };
            const handleClose = () => {
            setAnchorEl(null);
            };

            const StyledTableCell = styled(TableCell)(({ theme }) => ({
                [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.info.dark,
                color: theme.palette.common.white,
                fontWeight: theme.typography.fontWeightBold,
                fontSize: 14,
                },
                [`&.${tableCellClasses.body}`]: {
                fontSize: 14,
                },
            }));
            
            const StyledTableRow = styled(TableRow)(({ theme }) => ({
                '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
                },
                // hide last border
                '&:last-child td, &:last-child th': {
                border: 0,
                },
            }));

            useEffect(() => {
                getNumUsers();
                getCompany();
            }, []);

            const getNumUsers = () => {
                axios.get("http://localhost:8080/login/numUsers")
                .then((response) => {
                    setNumAdmin(response.data["Admin"]);
                    setNumApprover(response.data["Approver"]);
                    setNumVendor(response.data["Vendor"]);
                })
                .catch(error => console.error(error));
            };

            const getCompany = () => {
                axios.get("http://localhost:8080/company")
                .then((response) => {
                    setCompanies(response.data);
                })
                .catch(error => console.error(error));
            };
    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <Grid item md={2.0} sm={2.5}>
                    <h1>User Management</h1>
                </Grid>

            </Grid>

            <Grid container spacing={4} sx={{pt:4}}>
                <Grid item xs={4}>
                    <Link href='Vendor' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#E7F9DD"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#054322"}>
                                {numVendor}
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#054322"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        Vendors
                                        </Grid>
                                        <Grid item sx={{pl:1}}>
                                        <ArrowCircleRightOutlinedIcon  />
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>

                <Grid item xs={4}>
                    <Link href='Admin' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FEDBC2"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#8A3C03"}>
                                {numAdmin}
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#8A3C03"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        Admin
                                        </Grid>
                                        <Grid item sx={{pl:1}}>
                                        <ArrowCircleRightOutlinedIcon  />
                                        </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>

                <Grid item xs={4}>
                    <Link href='Approver' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FFD9D9"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#790202"}>
                                {numApprover}
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#790202"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                            <Grid item>
                                            Approver
                                            </Grid>
                                            <Grid item sx={{pl:1}}>
                                            <ArrowCircleRightOutlinedIcon  />
                                            </Grid>
                                    </Grid>
                                </Typography>
                        </CardContent>
                    </Card>
                    </Link>
                </Grid>

                <Grid item xs={12}></Grid>
                
            </Grid>

            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h2>Company</h2>
                </Grid>
                
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Link href='CreateCompany' underline='none'>
                        <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}}
                                startIcon={<AddIcon/>}>
                                Create New Company 
                        </Button>
                    </Link>
                </Grid>

            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="left">Company Name</StyledTableCell>
                        <StyledTableCell align="left">Country of Origin</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {companies.map((company) => (
                        <StyledTableRow key={company.name}>
                        <StyledTableCell component="th" scope="row">
                            {company.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">{company.country}</StyledTableCell>
                        {company.name === "Quantum"
                            ? <Link href={'QuantumDetails'} underline='none'>
                                <StyledTableCell align="right"><ArrowForwardIosIcon /></StyledTableCell>
                            </Link>
                            : <Link href={'CompanyDetails/' + company.registrationNum} underline='none'>
                                <StyledTableCell align="right"><ArrowForwardIosIcon /></StyledTableCell>
                            </Link>
                        }
                        
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
                
        </Grid>
        
    )
    
}

export default UserManagement;


  