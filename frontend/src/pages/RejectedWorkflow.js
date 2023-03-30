import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import WorkflowTable from "../components/WorkflowTable"
import axios from "axios";
import { useEffect } from "react";

import {

    Grid, 
    Button,
    TextField,
    InputAdornment,
    Link
        
} from "@mui/material";




function RejectedWorkflow(){

  const role = sessionStorage.getItem("role");
  useEffect(() => {
    getVendorWorkflows();
    ;
  }, []);
  const[vendorWorkflows, setVendorWorkflows]= React.useState([]);
  const getVendorWorkflows = () =>{
      axios.get("http://localhost:8080/vendorWorkflow/allVendorWorkflow")
      .then((response) => {
          const vendorWorkflows=[]
          
          for(let workflow of response.data){
            if(workflow.status=='Rejected'){
              vendorWorkflows.push(workflow)
            }
            
          }

          // console.log(vendorWorkflows)
          setVendorWorkflows(vendorWorkflows)
          
          
      })
      .catch(error => console.error(error.response));
  }
  
    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4, mb:6}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>Rejected Workflows</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                  {role=='Admin' &&
                    <Link href='CreateWorkflow' underline='none'><Button variant="contained" sx={{width:120}} startIcon={<AddIcon/>}>Create</Button></Link>
                  }
                </Grid>

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
{/* 
                    <TextField
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

            <WorkflowTable props={vendorWorkflows}/>


                
        </Grid>
        
    )
    
}

export default RejectedWorkflow;