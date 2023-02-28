import * as React from 'react';
import dayjs from 'dayjs';
import { Container, textAlign, spacing } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import {red,green,orange} from '@mui/material/colors';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import {
    FormControl, 
    Grid, 
    Paper, 
    TextField, 
    Input, 
    InputLabel, 
    OutlinedInput,
    FormControlLabel, 
    FormLabel,
    MenuItem,
    Button,
    Box,
    Card, 
    CardActions, 
    CardContent,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
        
} from "@mui/material";




function WorkflowsAdmin(){

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

    function createData(Workflow, DueDate, Assignee, Company) {
        return { Workflow, DueDate, Assignee, Company};
      }
      
      const rows = [
        createData('Health Evaluation', '12 Feb 2023', 'Carol Chua', 'Ever Green'),
        createData('Health Evaluation', '12 Feb 2023', 'Carol Chua', 'Ever Green'),
        createData('Health Evaluation', '12 Feb 2023', 'Carol Chua', 'Ever Green'),
        createData('Health Evaluation', '12 Feb 2023', 'Carol Chua', 'Ever Green'),
        createData('Health Evaluation', '12 Feb 2023', 'Carol Chua', 'Ever Green'),
      ];
    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>Workflows</h1>
                </Grid>

            </Grid>

            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#E7F9DD"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#054322"}>
                                300
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#054322"}>
                                <br />
                                Completed Workflows
                                <ArrowCircleRightOutlinedIcon  />
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FEDBC2"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#8A3C03"}>
                                34
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#8A3C03"}>
                                <br />
                                Uncompleted Workflows
                                <ArrowCircleRightOutlinedIcon  />
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FFD9D9"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#790202"}>
                                14
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#790202"}>
                                <br />
                               Rejected Workflows 
                               <ArrowCircleRightOutlinedIcon  />
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>

            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h3>Workflows Due</h3>
                </Grid>

                <Grid item md={0.5} sm={6} alignItems="flex-start">
                    <Button variant="contained" sx={{width:120}}>View All<ArrowForwardIosIcon fontSize='small' /></Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Workflows</StyledTableCell>
                        <StyledTableCell align="left">Due Date</StyledTableCell>
                        <StyledTableCell align="left">Assignee</StyledTableCell>
                        <StyledTableCell align="left">Company</StyledTableCell>
                        <StyledTableCell align="left"> </StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.Workflow}>
                        <StyledTableCell component="th" scope="row">
                            {row.Workflow}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.DueDate}</StyledTableCell>
                        <StyledTableCell align="left">{row.Assignee}</StyledTableCell>
                        <StyledTableCell align="left">{row.Company}</StyledTableCell>
                        <StyledTableCell align="right"><ArrowForwardIosIcon /></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>


                
        </Grid>
        
    )
    
}

export default WorkflowsAdmin;


  