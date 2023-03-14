import * as React from 'react';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled, alpha} from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import GridViewIcon from '@mui/icons-material/GridView';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddAlertIcon from '@mui/icons-material/AddAlert';
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




function WorkflowsAdmin(){

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
        <Grid sx={{mt:6, mb:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h1>Workflows</h1>
                </Grid>
                
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}}
                            endIcon={<KeyboardArrowDownIcon />}
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            disableElevation
                            onClick={handleClick}>
                    
                            Manage Workflows 
                    </Button>
                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                            <Link href='AssignWorkflow' underline='none' color="#616161"><MenuItem onClick={handleClose} color="#616161"><AssignmentIndIcon/>Assign Workflow</MenuItem></Link>
                            <Link href='ViewWorkflows' underline='none' color="#616161"><MenuItem onClick={handleClose} color="#616161"><GridViewIcon/>View Templates</MenuItem></Link>
                            <Link href='CreateWorkflow' underline='none' color="#616161"><MenuItem onClick={handleClose} ><AddIcon/>Create Template</MenuItem></Link>

                    </StyledMenu>
                
                </Grid>

            </Grid>

            <Grid container spacing={4} sx={{pt:4}}>
                <Grid item xs={4}>
                    <Link href='CompletedWorkflow' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#E7F9DD"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#054322"}>
                                300
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#054322"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        Completed Workflows
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
                    <Link href='UncompletedWorkflow' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FEDBC2"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#8A3C03"}>
                                34
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#8A3C03"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                        <Grid item>
                                        Uncompleted Workflows
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
                    <Link href='RejectedWorkflow' underline='none'>
                    <Card sx={{ borderRadius: '16px' }} style={{backgroundColor: "#FFD9D9"}}>
                        <CardContent align="center">
                                <Typography variant="h2" component="div" fontWeight="Bold" color={"#790202"}>
                                14
                                </Typography>
                                <Typography variant="body2" fontWeight="Bold" color={"#790202"}>
                                    <Grid container sx={{alignContent:"center", justifyContent:"center", pt:3}}>
                                            <Grid item>
                                            Rejected Workflows
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
                
            </Grid>

            <Grid container spacing={{ md: 12 }} columns={{xs:12, sm:3,md:3}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center",pt:3,pb:2}}>
                <Grid item md={2}>
                    <h3>Workflows Due</h3>
                </Grid>

                <Grid item md={1} sm={6} sx={{justifyContent:"flex-end", display:'flex'}}>
                <Link href='ViewAllWorkflow' underline='none'><Button variant="contained" sx={{width:200, backgroundColor:"#fafafa", color:"#212121"}} endIcon={<ArrowForwardIosIcon/>}>View All</Button></Link>
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
                        <StyledTableCell align="left">
                            {row.DueDate}
                            <Button variant='contained' size='small' sx={{ml:5, background:"#90a4ae"}} endIcon={<AddAlertIcon/>}>Send</Button>
                        </StyledTableCell>
                        
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


  