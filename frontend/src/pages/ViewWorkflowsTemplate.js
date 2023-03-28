import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {

    Grid, 
    Button,
    TextField,
    InputAdornment,
    Link
        
} from "@mui/material";
import { Table, Space } from 'antd';
import Highlighter from "react-highlight-words";



function ViewWorkflowsTemplate(){

  useEffect(() => {
    getWorkflowTemplate();
    ;
  }, []);
  const[workflowTemplates, setWorkflowTemplate]= React.useState([]);
  const getWorkflowTemplate = () =>{
      axios.get("http://localhost:8080/workflow/allWorkflow")
      .then((response) => {
      
          
  
        // console.log(response)
          console.log(response.data)
          setWorkflowTemplate(response.data)
          
          
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
      width:'90%',
      ...getColumnSearchProps('workflowName'),
  },
  {
      
      render: (_,{id}) => (
        
        <Link href={'UpdateWorkflow/' + id} underline='none'>
            <ArrowForwardIosIcon  /> 
        </Link>
        
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
                    <h1>Workflow Templates</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                    <Link href='CreateWorkflow' underline='none'><Button variant="contained" sx={{width:120,backgroundColor:"#2596BE"}} startIcon={<AddIcon/>}>Create</Button></Link>
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

            <Table columns={columns} dataSource={workflowTemplates} onChange={onChange} />;


                
        </Grid>
        
    )
    
}

export default ViewWorkflowsTemplate;