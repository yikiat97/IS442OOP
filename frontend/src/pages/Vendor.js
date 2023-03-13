import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {

    Grid, 
    Paper, 
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    TextField,
    InputBase,
    Autocomplete,
    InputAdornment,
    Input,
    Link
        
} from "@mui/material";




function Vendor(){


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.common.black,
          fontWeight: theme.typography.fontWeightBold,
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

    function createData(Company, ContactName, Email, UserRole) {
        return { Company, ContactName, Email, UserRole};
      }
      
      const rows = [
        createData('Ever Green', 'Carol Chua', 'carolchua@evergreen.co','Vendor'),
        createData('Sparks Analytics', 'Timothy Low', 'timlow@sparksanlytics.com','Vendor'),
        createData('Ever Green', 'Carol Chua', 'carolchua@evergreen.co','Vendor'),
        createData('Sparks Analytics', 'Timothy Low', 'timlow@sparksanlytics.com','Vendor'),
        createData('Ever Green', 'Carol Chua', 'carolchua@evergreen.co', 'Vendor'),
        createData('Sparks Analytics', 'Timothy Low', 'timlow@sparksanlytics.com','Vendor'),
        createData('Sparks Analytics', 'Timothy Low', 'timlow@sparksanlytics.com','Vendor'),
        createData('Ever Green', 'Carol Chua', 'carolchua@evergreen.co', 'Vendor'),
        createData('Sparks Analytics', 'Timothy Low', 'timlow@sparksanlytics.com','Vendor'),
      ];
    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>Vendor</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                    <Link href='CreateNewContact' underline='none'>
                        <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}}
                                startIcon={<AddIcon/>}>
                                Create New Contact 
                        </Button>
                    </Link>
                </Grid>

                <Grid item md={0.5} sm={6} sx={{mb:5}}>

                    <TextField
                        sx={{background:"#eeeeee"}}
                        size='small'
                        InputProps={{ 
                          endAdornment:(
                            <InputAdornment position='end'>
                          <SearchIcon/>
                        </InputAdornment>)}}>
                    
                      </TextField>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Company</StyledTableCell>
                        <StyledTableCell align="left">Contact Name</StyledTableCell>
                        <StyledTableCell align="left">Email</StyledTableCell>
                        <StyledTableCell align="left">User Role</StyledTableCell>
                        <StyledTableCell align="left"></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Company}>
                        <StyledTableCell component="th" scope="row">
                            {row.Company}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.ContactName}</StyledTableCell>
                        <StyledTableCell align="left">{row.Email}</StyledTableCell>
                        <StyledTableCell align="left">{row.UserRole}</StyledTableCell>
                        <StyledTableCell align="right"><DeleteOutlineIcon sx={{color:'#c62828'}}/></StyledTableCell>
                        <StyledTableCell align="left"><EditIcon sx={{color:'#757575'}} /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


                
        </Grid>
        
    )
    
}

export default Vendor;