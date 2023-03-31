import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import {

    Paper, 
    Button,
    TableContainer,
    Chip,
    Link
        
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Table, Space, Input } from 'antd';
import Highlighter from "react-highlight-words";


function WorkflowTable({props}){

    const role = sessionStorage.getItem("role");

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div
                style={{
                padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
        <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            fullWidth 
            size="small"
            style={{
            marginBottom:10,
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
        title:"Workflows",
        dataIndex:"workflowName",
        key:"workflowName",
        ...getColumnSearchProps('workflowName'),
    },
    {
        title:"Due Date",
        dataIndex:"date",
        key:"date",
        defaultSortOrder:'descend',
        ...getColumnSearchProps('date'),
    },
    // {
    //     render:()=>(

    //         role=='Admin' ?
    //             <Button variant='contained' size='small' sx={{ml:5, background:"#90a4ae"}} endIcon={<AddAlertIcon/>}>
    //                 Send</Button> :null

    //     ),
    // },
    {
        title:"Assignee",
        dataIndex:"name",
        key:"name",
        ...getColumnSearchProps('name'),
    },
    {
        title:"Company",
        dataIndex:"company",
        key:"company",
        ...getColumnSearchProps('company'),
    },
    {
        title:"Status",
        dataIndex:"status",
        key:"status",
        ...getColumnSearchProps('status'),
        render:(_,{status})=> (
        <Chip label={status} sx={{color:'#FFFFFF', 
                                    'backgroundColor': 
                                        status === 'Approved' ? '#4caf50' : 
                                        status === 'Rejected' ? '#c62828' :
                                        status === 'Deleted' ? '#c62828' :
                                        status === 'Awaiting Approver' ? '#ff9800' :
                                        status === 'Pending' ? '#ff9800' : '#03a9f4'}}></Chip>
        ),
    
    },

    {   
        render: (_,{id,status}) => (

            status=='Pending' && role=='Vendor' ?
                    
                        <Link href={'FormWorkflow/' + id} underline='none'>
                            <ArrowForwardIosIcon  /> 
                        </Link> :
            role=='Admin' ?
                        <Link href={'FormWorkflow/' + id} underline='none'>
                        <ArrowForwardIosIcon  /> 
                        </Link> :
            role=='Approver' && !(status=='Pending' || status=='In Progress') ?
                        <Link href={'FormWorkflow/' + id} underline='none'>
                        <ArrowForwardIosIcon  /> 
                        </Link> : null
            ),
    }
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    


    return(
        

            <TableContainer component={Paper}>
                <Table columns={columns} dataSource={props} onChange={onChange} />;
            </TableContainer>

    )
    
}

export default WorkflowTable;