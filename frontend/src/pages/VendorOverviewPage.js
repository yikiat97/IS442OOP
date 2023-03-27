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

function VendorOverviewPage(){
    
    useEffect(() => {
        getVendorWorkflows();
        ;
    }, []);

    const statuses = [
      "Workflow Created",
      "Deleted",
      "Approved",
      "Rejected",
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
                    <h1>Overview</h1>
                </Grid>

            </Grid>

            
            <WorkflowTable  props={vendorWorkflows} />;
            


                
        </Grid>
        
    )
    
}

export default VendorOverviewPage;