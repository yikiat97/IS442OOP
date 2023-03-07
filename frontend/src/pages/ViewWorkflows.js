import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
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




function ViewWorkflows(){


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

    function createData(Workflow) {
        return { Workflow};
      }
      
      const rows = [
        createData('Health Evaluation'),
        createData('Health Evaluation'),
        createData('Health Evaluation'),
        createData('Health Evaluation'),
        createData('Health Evaluation'),
      ];
    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>Workflow Templates</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                    <Link href='CreateWorkflow' underline='none'><Button variant="contained" sx={{width:120,backgroundColor:"#2596BE"}} startIcon={<AddIcon/>}>Create</Button></Link>
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
                        <StyledTableCell>Workflows</StyledTableCell>

                        <StyledTableCell align="left"> </StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Workflow}>
                        <StyledTableCell component="th" scope="row">
                            {row.Workflow}
                        </StyledTableCell>
                        <StyledTableCell align="right"><Link href='CreateWorkflow' underline='none' color="#616161"><ArrowForwardIosIcon /></Link></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


                
        </Grid>
        
    )
    
}

export default ViewWorkflows;