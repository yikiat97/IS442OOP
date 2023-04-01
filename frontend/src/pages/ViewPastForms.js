import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import {

    Grid, 
    Paper, 
    Button,
    TableContainer,
    Chip,
    TextField,
    InputBase,
    Autocomplete,
    InputAdornment,
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Input,
    Link
        
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Table, Space } from 'antd';
import Highlighter from "react-highlight-words";


function ViewDeletedForms(){
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/getForm/All")
          .then((res) => res.json())
          .then((data) => {
            data = data.filter(data => data.status == 'Deleted');
            console.log(data)
            setFormData(data);
          })
          .catch((err) => console.log(err)); // <-- Add this line

    }, []);
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
        title:"Deleted Forms",
        dataIndex:"formName",
        key:"formID",
        ...getColumnSearchProps('formName'),
    },
    {
        title: "",
        key: "sendAlert",
        render: (text, record) => (
            role === "Admin" && (
            <Button
                variant="contained"
                size="small"
                sx={{ ml: 5, background: "#90a4ae" }}
                onClick={() => restoreForm(record)}
            >
                Restore form
            </Button>
            )
        ),
    }



    
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const restoreForm = (record) => {
        // Implement your logic to send alert for the selected record
        const id = record.formID;
        console.log(record)
        axios
            .put(`http://localhost:8080/restoreForm/${id}`)
            .then((res) => {
                // handle success
                alert(`Form ${id} restored successfully.`);
                window.location.reload();

            })
            .catch((err) => {
                // handle error
                alert(`Failed to restore form ${id}.`, err);
            });
    };


    return(
        

            <TableContainer component={Paper}>
                <Table columns={columns} dataSource={formData} onChange={onChange} />;
            </TableContainer>

    )
}


export default ViewDeletedForms;