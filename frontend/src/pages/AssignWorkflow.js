import * as React from 'react';
import dayjs from 'dayjs';

import {Box } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { message} from 'antd';
import {
    FormControl, 
    Grid, 
    Paper, 
    TextField, 
    Input, 
    InputLabel, 
    OutlinedInput,
    FormControlLabel, 
    FormLabel,
    Menu,
    MenuItem,
    Button,
    Link,
    ListItem,
    FormHelperText 
} from "@mui/material";


function AssignWorkflow(){
    const [vendorWorkflowName, AssignWorkflow] = useState(null);
    const[workflows, setWorkflows] = useState([]);
    const [dueDate, setDueDate] = useState(dayjs());

    const[status, setStatus]= useState(null);
    const statuses = [
        "Pending",
        "In Progress",
        "Awaiting Approver",
        "Deleted",
        "Approved",
        "Rejected",
        "Reopen"
    ]

    const [error, setError] = useState([]);
    
    const[companies, setCompanies]= useState([]);
    const[assignees, setAssignees] = useState([]);
    const[activeAssignees, setActiveAssignees] = useState([]);
    const[forms, setForms] = useState([]);
    const [name, setAssigneeName] = useState("");
    const [email, setAssigneeEmail] = useState("");
    const [company, setAssigneeCompany] = useState("");

    //set form values
    useEffect(() => {
        setActiveAssignees();
        getWorkflows();
        getCompanies();
        
    }, []);

    // const getAssignees = () => {
    //     axios.get("http://localhost:8080/company/getActiveCompanies")
    //     .then((response) => {
    //         setActiveAssignees(response.data)
            
    //     })
    //     .catch(error => console.error(error.response));
    // }

    const getWorkflows = () =>{
        axios.get("http://localhost:8080/workflow/allWorkflow")
        .then((response) => {
            const iniWorkflow={}
            const workflowData=response.data
            
            for(let i=0; i<workflowData.length; i++){
                iniWorkflow[workflowData[i].workflowName]= [workflowData[i].forms]
            }
            setWorkflows(iniWorkflow)
            // console.log(iniWorkflow)
            
        })
        .catch(error => console.error(error.response));
    }

    const getCompanies = () =>{
        axios.get("http://localhost:8080/company/getActiveCompanies")
        .then((response) => {
            const ini_comp = {}


            console.log(response.data, "response.data")

            
            for(let comp of response.data){
                console.log(comp)
                ini_comp[comp.name]=comp.registrationNum
            }

            setCompanies(ini_comp)
        
        })
        .catch(error => console.error(error));
    }

    const getAssigneeFromCompany = (company)=>{
        console.log(company)
        axios.get("http://localhost:8080/login/getUsersByCompany", 
                {params:{"registrationNum":company}})
        .then(response=>{
            const data = response.data[0]
            console.log(data, "getAssigneeFromCompany")
            setAssigneeEmail(data.email)
            setAssigneeName(data.name)

        })
    }

    const navigate= useNavigate();
    const handleSubmit= async (e) =>{
        e.preventDefault();

        // do logic handling for dueDate here to map to date since date always lags behind if done on change itself
        const formattedDate = dueDate.format("DD/MM/YYYY");
        try {
            if(name===""){
                message.warning("No Assignee Chosen!")
                return;
            } else if(company===""){
                message.warning("No Company Chosen!")
                return;
            } else if(status==null){
                message.warning("No Status Chosen!")
                return;
            } else if(vendorWorkflowName==null){
                message.warning("No Workflow chosen!")
                return;
            } else{
                const res = await axios.post(
                    "http://localhost:8080/vendorWorkflow/insertVendorWorkflow",
                    {forms,
                    vendorWorkflowName,
                    status,
                    email,
                    company,
                    date: formattedDate,
                    name},
                    
                    {headers: {
                        "Content-Type": "application/json"
                    },
                    }

                    
                );

                navigate("../ViewAllWorkflow");
            
                console.log(res, "res");
            }
                } catch (error) {
                    console.log( error);
                }
    };


    
    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={1.5}>
                    <h1>Assign Workflow</h1>
                </Grid>

                <Grid item md={1}></Grid>

                <Grid item md={0.25} sm={6} sx={{alignItems:"center", justifyContent:"flex-end", display:'flex'}}>
                    <Button variant="contained" sx={{width:100, backgroundColor:"#2596BE"}}
                    onClick={handleSubmit}>Save</Button>
                </Grid>

                <Grid item sx={{alignItems:"center", justifyContent:"flex-end", display:'flex'}} md={0.25} sm={6}>
                    <Button sx={{bgcolor:"#D3D3D3", color:"#000000", width:100}} href="WorkflowsAdmin" >Cancel</Button>
                </Grid>

            </Grid>
            
            <Paper elevation={1} sx={{height:350,pt:3, pb:4}}>

                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    
                    <FormControl>
                            <FormLabel htmlFor="WorkflowName" sx={{}}>Choose Workflow</FormLabel>
                                    <Autocomplete
                                    id="grouped-demo"
                                    options={Object.keys(workflows)}
                                    sx={{width:"500px"}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(event,newValue) => {
                                        AssignWorkflow(newValue);
                                        setForms(workflows[newValue][0]);
                                        }}
                                    disableClearable
                                    /> 
                                    {vendorWorkflowName==null? <FormHelperText sx={{color:"#dd3c32"}}>Please select a workflow</FormHelperText> : <></>}
                    </FormControl>

                </Grid>

                <Grid sx={{px:2, mb:4}} container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    
                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Assignee">Assignee</FormLabel>
                            
                                    <Autocomplete
                                    id="grouped-demo"
                                    options={Object.keys(companies)}
                                    sx={{width:200}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(event, newValue) => {
                                        getAssigneeFromCompany(companies[newValue])
                                        setAssigneeCompany(newValue)
                                        }}
                                    disableClearable
                                    /> 

                                    {name==="" ? <FormHelperText sx={{color:"#dd3c32"}}>Please select an Assignee</FormHelperText> : <></>}
                                                        
                            </FormControl>
                        </Grid>


                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="DueDate">Due Date</FormLabel>
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker   
                                            value={dueDate}
                                            format="DD-MM-YYYY"
                                            disablePast
                                            onChange={(newValue) => {
                                            setDueDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        
                
                </Grid>


                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                                    
                    <FormControl>
                            <FormLabel htmlFor="WorkflowName" sx={{}}>Status</FormLabel>
                                <TextField
                                sx={{width:200}}
                                id="WorkflowName"
                                aria-describedby="WorkflowName-text"
                                onChange={(event, newValue) => {
                                    setStatus(newValue.props.value);
                                    }}
                                select
                                >

                                {statuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                            {status}
                                            </MenuItem>
                                        ))}
                                </TextField>

                                {status==null ? <FormHelperText sx={{color:"#dd3c32"}}>Please select a Status</FormHelperText> : <></>}
                    </FormControl>

                </Grid>

            </Paper>

        </Grid>
        
    )
    
}

export default AssignWorkflow;