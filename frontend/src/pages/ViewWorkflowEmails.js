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
import { useParams,useNavigate } from 'react-router-dom';


function ViewEmails(){

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
    const workflowID = useParams().workflowId;
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
        getWorkflow();
    }, []);

    const [emails, setEmails] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [workflow, setWorkflow] = useState("");

    const getVendorWorkflows = () =>{
        axios.get("http://localhost:8080/email/workflow?workflowId=" + workflowID)
        .then((response) => {
            setEmails(response.data);
        })
        .catch(error => console.error(error.response));
    }

    const getWorkflow = () => {

        axios.get("http://localhost:8080/vendorWorkflow/vendorWorkflowByID/" + workflowID)
        .then((response) => {
            console.log(response);
            setCompanyName(response.data.company);
            setWorkflow(response.data.workflowName);
                    
        })
        .catch(error => console.error(error));
    };

    const navigate = useNavigate();
    const redirect = () => {
        navigate("/FormWorkflow/" + workflowID)
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
            title:"Email Type",
            dataIndex:"type",
            ...getColumnSearchProps('type'),
        },
        {
            title:"Receiver",
            dataIndex:"toEmail",
            ...getColumnSearchProps('toEmail'),
        },
        {
            title:"Status",
            dataIndex:"status",
            ...getColumnSearchProps('status'),
        },
        {
            title:"Date",
            dataIndex:"date",
            ...getColumnSearchProps('date'),
        },
        {
            render: (_,{status}) => (
                <Button>Resend</Button>
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
                    <h1>Emails of {companyName}</h1>
                </Grid>

            </Grid>

            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:4}} sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Grid item md={2.0} sm={2.5}>
                    <h4>Workflow: {workflow}</h4>
                </Grid>
                <Grid item md={2.0} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    <Button variant="contained" sx={{width:250, backgroundColor:"#2596BE"}} onClick={redirect}>
                            Return to workflow
                    </Button>
                </Grid>

            </Grid>
          
            <Table columns={columns} dataSource={emails} onChange={onChange} />
            


                
        </Grid>
        
    )
    
}

export default ViewEmails;

