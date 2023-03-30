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

import WorkflowTable from "../components/WorkflowTable"

function ViewAllWorkflow(){
    const role = sessionStorage.getItem("role");
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

    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4, mb:5}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>
                    <h1>All Workflows</h1>
                </Grid>

            </Grid>



            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}} sx={{display:'flex', justifyContent:"space-between"}}>
                

                <Grid item md={0.5} sm={6} sx={{mb:5}}>
                    {role=='Admin' &&
                <Link href='CreateWorkflow' underline='none'><Button variant="contained" sx={{width:120, backgroundColor:"#2596BE"}} startIcon={<AddIcon/>}>Create</Button></Link>
                    }
                </Grid>

                <Grid item md={0.5} sm={6} sx={{mb:5}}>

                </Grid>
            </Grid>

            
            <WorkflowTable  props={vendorWorkflows} />;
            


                
        </Grid>
        
    )
    
}

export default ViewAllWorkflow;