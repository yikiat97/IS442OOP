import * as React from 'react';
import dayjs from 'dayjs';

import {Box } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from "axios";
import { useEffect, useState } from "react";
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
    Link
} from "@mui/material";


function AssignWorkflow(){
    const [vendorWorkflowName, AssignWorkflow] = useState(null);
    const[workflows, setWorkflows] = useState([]);
    const [dueDate, setDueDate] = useState(dayjs('07-04-2023'));
    const [date, setDate] = useState("");

    const[status, setStatus]= useState(null);
    const statuses = [
        "Workflow Created",
        "Awaiting Approver",
        "Awaiting Admin",
        "Rejected"
    ]
    
    const[companies, setCompanies]= useState([]);
    const[assignees, setAssignees] = useState({});
    const[forms, setForms] = useState([]);
    const [name, setAssigneeName] = useState("");
    const [email, setAssigneeEmail] = useState("");
    const [company, setAssigneeCompany] = useState("");

    //set form values
    useEffect(() => {
        getWorkflows();
        getCompanies();
        getAssignees();
        setDate(dueDate.$D + "/" + (dueDate.$M+1) + "/" + dueDate.$y);
    }, []);

    const getWorkflows = () =>{
        axios.get("http://localhost:8080/workflow/allWorkflow")
        .then((response) => {
            const iniWorkflow={}
            const workflowData=response.data
            
            for(let i=0; i<workflowData.length; i++){
                iniWorkflow[workflowData[i].workflowName]= [workflowData[i].forms]
            }
            setWorkflows(iniWorkflow)
            // console.log(ini)
            
        })
        .catch(error => console.error(error.response));
    }

    const getCompanies = () =>{
        axios.get("http://localhost:8080/company")
        .then((response) => {
            const ini={}
            const companyData=response.data
           
            for(let comp of companyData){
                ini[comp.name]=comp.userEmail
            }

            
            setCompanies(ini);
        })
        .catch(error => console.error(error));
    }


    const getAssignees = () =>{
        axios.get("http://localhost:8080/login/getVendors")
        .then((response) => {
            const ini={}
            const companyData=response.data
            
            for(const [key, value] of Object.entries(companyData)){
                
                for(let user of value){
                    ini[user.name]={userEmail: user.email,
                                    comp:user.company}
                }
                
            }
            setAssignees(ini);
            // console.log(ini)
            
            
            
        })
        .catch(error => console.error(error));
    }
    


    const handleSubmit= async (e) =>{
        e.preventDefault();
        
        try {
            const res = await axios.post(
                "http://localhost:8080/vendorWorkflow/insertVendorWorkflow",
                {forms,
                vendorWorkflowName,
                status,
                email,
                company,
                date,
                name},
                
                {headers: {
                    "Content-Type": "application/json"
                },
                }
            );
            console.log(res, "res");
            } catch (error) {
                console.log( error.response);
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
                    <Button sx={{bgcolor:"#D3D3D3", color:"#000000", width:100}}>Cancel</Button>
                </Grid>

            </Grid>
            

            
            <Paper elevation={1} sx={{height:350,pt:3}}>

                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <FormControl>
                            <FormLabel htmlFor="WorkflowName" sx={{}}>Choose Workflow</FormLabel>
                                    <Autocomplete
                                    id="grouped-demo"
                                    options={Object.keys(workflows)}
                                    sx={{width:200}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(event,newValue) => {
                                        AssignWorkflow(newValue);
                                        setForms(workflows[newValue][0]);
                                        }}
                                    /> 
                    </FormControl>

                </Grid>

                <Grid sx={{px:2, mb:4}} container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    
                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Assignee">Assignee</FormLabel>
                            
                                    <Autocomplete
                                    id="grouped-demo"
                                    options={Object.keys(assignees)}
                                    sx={{width:200}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(event, newValue) => {
                                        setAssigneeName(newValue);
                                        setAssigneeCompany(assignees[newValue].comp);
                                        setAssigneeEmail(assignees[newValue].userEmail);
                                        }}
                                    /> 
                                                        
                            </FormControl>
                        </Grid>

                        {/* <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Company-helper">Company</FormLabel>
                                    
                                <Autocomplete
                                    id="country-select-demo"
                                    sx={{width:200}}
                                    options={Object.keys(companies)}
                                    autoHighlight
                                    onChange={(event, newValue) => {
                                        setCompanyValue(newValue);
                                        }}
                                    
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {option}
                                        </Box>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        inputProps={{
                                            ...params.inputProps,
                                        }}
                                        />
                                    )}
                                    />

                            </FormControl>
                            
                        </Grid> */}

                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="DueDate">Due Date</FormLabel>
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker   
                                            value={dueDate}
                                            format="DD-MM-YYYY"
                                            onChange={(newValue) => {
                                            setDueDate(newValue);
                                            setDate(dueDate.$D + "/" + (dueDate.$M+1) + "/" + dueDate.$y);
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
                    </FormControl>

                </Grid>

            </Paper>

        </Grid>
        
    )
    
}

export default AssignWorkflow;