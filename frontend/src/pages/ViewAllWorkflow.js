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
    Input,
    Link
        
} from "@mui/material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Table, Space } from 'antd';
import Highlighter from "react-highlight-words";


function ViewAllWorkflow(){

    useEffect(() => {
        getVendorWorkflows();
        ;
    }, []);

    const statuses = [
      "Draft",
      "Workflow Created",
      "Awaiting Approver",
      "Awaiting Admin",
      "Deleted",
      "Approved",
      "Rejected"
  ]

    const[vendorWorkflows, setVendorWorkflows]= React.useState([]);
    const getVendorWorkflows = () =>{
        axios.get("http://localhost:8080/vendorWorkflow/allVendorWorkflow")
        .then((response) => {
            // const vendorWorkflows=[]
            console.log(response.data)
            setVendorWorkflows(response.data)
            
            
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
            
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              variant="contained"
              color="error"
              style={{
                width: 90,
              }}
            >
              Reset
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
      {
        render:()=>(
          <Button variant='contained' size='small' sx={{ml:5, background:"#90a4ae"}} endIcon={<AddAlertIcon/>}>Send</Button>
        ),
      },
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
                                        status === 'Draft' ? '#e0e0e0':
                                        status === 'Awaiting Approver' ? '#ff9800' :
                                        status === 'Awaiting Admin' ? '#ff9800' : '#03a9f4'}}></Chip>
        ),
      
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
        <Grid sx={{mt:6, textAlign:'left', px:4, mb:5}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>All Workflows</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                <Link href='CreateWorkflow' underline='none'><Button variant="contained" sx={{width:120}} startIcon={<AddIcon/>}>Create</Button></Link>
                </Grid>

                <Grid item md={0.5} sm={6} sx={{mb:5}}>

                    {/* <TextField
                        sx={{background:"#eeeeee"}}
                        size='small'
                        InputProps={{ 
                          endAdornment:(
                            <InputAdornment position='end'>
                          <SearchIcon/>
                        </InputAdornment>)}}>
                    
                      </TextField> */}
                </Grid>
            </Grid>

            <TableContainer component={Paper}>
                <Table columns={columns} dataSource={vendorWorkflows} onChange={onChange} />;
            </TableContainer>


                
        </Grid>
        
    )
    
}

export default ViewAllWorkflow;