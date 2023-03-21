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
import SearchIcon from '@mui/icons-material/Search';
import {

    Grid, 
    Paper, 
    Button,
    Card, 
    CardContent,
    Typography,
    TextField,
    TableContainer,
    Link,
    Menu,
    MenuItem
        
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Table, Space } from 'antd';
import Highlighter from "react-highlight-words";


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



    useEffect(() => {
        getVendorWorkflows();
        ;
    }, []);
    const[vendorWorkflows, setVendorWorkflows]= React.useState([]);
    const [completedWorkflow, setCompletedWorkflow]=React.useState([])
    const [uncompletedWorkflow, setUncompletedWorkflow]=React.useState([])
    const [rejectedWorkflow, setRejectedWorkflow]=React.useState([])
    const getVendorWorkflows = () =>{
        axios.get("http://localhost:8080/vendorWorkflow/allVendorWorkflow")
        .then((response) => {
            
            
            

            const completedWorkflows=[]
            const uncompletedWorkflows=[]
            const rejectedWorkflows=[]

            for(let workflow of response.data){
                if(workflow.status=='Approved'){
                    completedWorkflows.push(workflow)
                }
                else if(!(workflow.status=='Approved' || workflow.status=='Rejected' || workflow.status=='Deleted') ){
                    uncompletedWorkflows.push(workflow)
                }  
                else if(workflow.status=='Rejected'){
                    rejectedWorkflows.push(workflow)
                }
            }

            setVendorWorkflows(response.data)
            setCompletedWorkflow(completedWorkflows)
            setUncompletedWorkflow(uncompletedWorkflows)
            setRejectedWorkflow(rejectedWorkflows)
            
        })
        .catch(error => console.error(error.response));
    }

        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');
        const searchInput = useRef(null);
        const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        };
        const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        };
        const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
            style={{
                padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
            >
            <TextField
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                fullWidth 
                size="small"
                sx={{
                mb:2,
                display: 'block',
                variant:"outlined",
                }}
            />
            <Space>
                <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchIcon />}
                variant="contained"
                size="small"
                style={{
                    width: 90,
                }}
                >
                Search
                </Button>
                
                {/* <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                variant="contained"
                color="error"
                style={{
                    width: 90,
                }}
                >
                Reset
                </Button> */}
            </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchIcon
            style={{
                color: filtered ? '#1890ff' : undefined,
            }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            
            searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
                }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
            ) : (
            text
            ),
        });

        const columns = [
        {
            title:"Workflows",
            dataIndex:"workflowName",
            ...getColumnSearchProps('workflowName'),
        },
        {
            title:"Due Date",
            dataIndex:"date",
            defaultSortOrder:'descend',
            ...getColumnSearchProps('date'),
        },
        {
            title:"Assignee",
            dataIndex:"name",
            ...getColumnSearchProps('name'),
        },
        {
            title:"Company",
            dataIndex:"company",
            ...getColumnSearchProps('company'),
        },
        {
            
            render: () => (
                
                    <ArrowForwardIosIcon />
                
                ),
        }
        ];

        const onChange = (pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
        };

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
                            <Link href='ViewWorkflowsTemplate' underline='none' color="#616161"><MenuItem onClick={handleClose} color="#616161"><GridViewIcon/>View Templates</MenuItem></Link>
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
                                {completedWorkflow.length}
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
                                {uncompletedWorkflow.length}
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
                                {rejectedWorkflow.length}
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
                <Table columns={columns} dataSource={vendorWorkflows} onChange={onChange} />;
            </TableContainer>


                
        </Grid>
        
    )
    
}

export default WorkflowsAdmin;

