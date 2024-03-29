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
    MenuItem,
    Chip
        
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Table, Space } from 'antd';
import Highlighter from "react-highlight-words";

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

    const [anchorEl, setAnchorEl] = React.useState(null);

    useEffect(() => {
        getVendorWorkflows();
        ;
    }, []);

    const [emails, setEmails] = useState([]);

    const resendEmail = (id) =>{
        axios.get("http://localhost:8080/email/resend?id=" + id)
        .then((response) => {
            console.log(response.data);
        })
        .catch(error => console.error(error.response));
    };

    const getVendorWorkflows = () =>{
        axios.get("http://localhost:8080/email")
        .then((response) => {
            setEmails(response.data);
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
            render:(_,{status})=> (
                <Chip label={status} sx={{color:'#FFFFFF', 
                                            'backgroundColor': 
                                                status === 'Success' ? '#4caf50' : 
                                                status === 'Error' ? '#c62828' : <></>
                                                }}></Chip>
                ),
        },
        {
            title:"Date",
            dataIndex:"date",
            ...getColumnSearchProps('date'),
        },
        {
            dataIndex: "id",
                render: (_, { id }) => (
                <Button onClick={() => resendEmail(id)}>Resend</Button>
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
                    <h1>Email Logs</h1>
                </Grid>

            </Grid>
          
            <Table columns={columns} dataSource={emails} onChange={onChange} />
            


                
        </Grid>
        
    )
    
}

export default ViewEmails;

