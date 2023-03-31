import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import {
    FormControl, 
    Grid, 
    Paper, 
    TextField, 
    FormLabel,
    MenuItem,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip, 
    IconButton
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import VendorFormPreview from '../components/VendorFormPreview';
import { useParams, useNavigate } from 'react-router-dom';
import FormPreview from '../components/FormPreview';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { message, Steps, theme } from 'antd';

function FormWorkflow(){
    useEffect(() => {
        getWorkflow();
        // getForms();
    }, []);
    const role = sessionStorage.getItem("role");
    const workflowID = useParams().workflowID;
    const[workflow, setWorkflow]=React.useState([])
    const[steps, setSteps]=React.useState([])


    const getWorkflow = () => {

        axios.get("http://localhost:8080/vendorWorkflow/vendorWorkflowByID/" + workflowID)
        .then((response) => {
                
                const ini=[]
                const promises=[]
                console.log(response.data)
                //response.data.questionID = ["642586cacb7791428c767469","642586cacb7791428c76746a"]
                for(const id of response.data.questionID){
                    
                    promises.push(
                        axios.get("http://localhost:8080/getQuestion/" + id))
                        console.log(promises)
                }

                setWorkflow(response.data);

                Promise.all(promises)
                    .then((response) => {
                        console.log(response)
                        for(let obj of response){
                            ini.push(obj.data)
                            console.log(ini)
                        }
                        setSteps(ini)
                    })
                
        })
        .catch(error => console.error(error));
    };

    console.log(steps)
    const navigate = useNavigate();
    const viewEmails = (event) =>{
        navigate("/ViewWorkflowEmails/" + workflowID)
    }
    
    const statuses = [
        "Pending",
        "In Progress",
        "Awaiting Approver",
        "Approved",
        "Rejected",
        "Deleted"
    ]

    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const stepsContent = steps.map((step) => ({
        key: step.questionID,
        title: step.formName,
        content: step
    }));
    const contentStyle = {
        
        textAlign: 'left',
        color: token.colorTextTertiary,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 10,
    };

    console.log(stepsContent)
    return(
    
    <Grid sx={{my:6, textAlign:'left', px:4}}>
        
        <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={2.25} sm={4}>
                    <Typography variant='h4'>
                        {workflow.workflowName}
                    </Typography>
                    
                </Grid>

                <Grid item md={0.75} sm={1} sx={{justifyContent:"flex-end", display:'flex'}}>
                    {role=="Approver" || role=='Admin' &&
                        <Button color="primary" variant="contained" fullWidth sx={{ backgroundColor:"#2596BE"}} startIcon={<EmailIcon/>} onClick={viewEmails}>
                        View Emails
                        </Button>
                    }
                    
                </Grid>

                </Grid>


        <Paper elevation={1} sx={{height:"30%", pt:2, pb:2, px:3, mt:4}}>
            <Divider light sx={{mb:2}}>Workflow Details</Divider>
            <Grid container spacing={6} sx={{display:"flex", justifyContent:"flex-start"}}>  
                <Grid item>
                    <FormControl>
                        <FormLabel htmlFor="WorkflowName" sx={{}}>Company</FormLabel>
                        <TextField disabled label={workflow.company} variant="filled" size='small'/>
                    </FormControl>
                    
                </Grid>
                <Grid item>
                    <FormControl>
                        <FormLabel htmlFor="WorkflowName" sx={{}}>Due Date</FormLabel>
                        <TextField disabled label={workflow.date} variant="filled" size='small'/>
                    </FormControl>
                    
                </Grid>

                <Grid item>
                    <FormControl>
                        <FormLabel htmlFor="WorkflowName" sx={{}}>Status</FormLabel>
                        <TextField variant="filled" size='small' value={workflow.status} select sx={{width:200}} disabled={role=='Vendor'}>
                        {statuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                            {status}
                                            </MenuItem>
                                        ))}
                        </TextField>
                    </FormControl>
                </Grid>
            </Grid> 
            
            <Divider light sx={{my:3}}>Form Status</Divider>
                <Grid container>
                    <Grid item>
                        <List>
                            {steps.map((step) =>(
                            <ListItem>
                                    <ListItemIcon sx={{pr:2}}>
                                        <Chip label="Approved" color="success" />
                                    </ListItemIcon>
                                    <ListItemText primary={step.formName}></ListItemText>

                            </ListItem>
                            
                            ))}
                        
                            
                                
                            

                        </List>
                    </Grid>
                </Grid>

        </Paper>

        <Paper elevation={1} sx={{height:"100%", pt:4, pb:2, px:3, mt:4}}>
            <>
        <Steps current={current} items={stepsContent} />
                        
        
        <div style={contentStyle}>

            <Grid container sx={{pt:2, pr:2}} columns={{xs:12, sm:12,md:12}} spacing={2}>
                    <Grid item md={9}></Grid>
                    <Grid item md={1.5} sx={{}}>
    
                            <Button sx={{backgroundColor:"#fafafa", color:"#212121"}} variant='contained' fullWidth onClick={() => next()} 
                            disabled={current==steps.length-1}>
                                Next
                            </Button>

                            
                            </Grid>
                    <Grid item md={1.5}>
                            <Button
                            sx={{backgroundColor:"#fafafa", color:"#212121"}}
                                variant='contained'
                                fullWidth
                                onClick={() => prev()}
                                disabled={current==0}>
                                Previous
                            </Button>

            
                    </Grid>

                </Grid>
            {steps.length>0 && <VendorFormPreview formData={stepsContent[current].content} fakeID={stepsContent[current].key} status={"Pending"}/> }

            
            <Grid container>
                <Grid item sx={{p:2}} xs={12} sm={12} md={12}>
                {workflow.status=='Pending' ? <></> :
                    <><Divider light sx={{ my: 3 }}>Approval</Divider><TextField
                                        label="Comments"
                                        fullWidth
                                        multiline
                                        rows={5}
                                        required
                                        defaultValue="Input Comments"
                                        disabled={role == 'Admin' || role == 'Vendor'} /></>
                }
                
    
                </Grid>

                <Grid item sx={{p:2}} xs={6} sm={6} md={2}>
                {role=='Approver' && workflow.status=='Awaiting Approver'?
                    <Button variant="contained" color="success" startIcon={<TaskAltIcon/>}>
                        Approve
                    </Button> : <></>
                }
                </Grid>


                <Grid item sx={{p:2}} xs={6} sm={6} md={2}>
                    {role=='Approver' && workflow.status=='Awaiting Approver'?
                    <Button variant="contained" color="error" startIcon={<CancelIcon/>}>
                    Reject
                    </Button>  : <></>
                    }
                    
                </Grid>
                

            </Grid>
        
        </div>
        <div
            style={{
            marginTop: 14,
            }}
        >
            {/* {current === steps.length - 1 && (
            <Button color="success" variant='contained' onClick={() => message.success('Workflow Submitted!')}>
                Done
            </Button>
            )} */}
    
        </div>
        </>
        
        </Paper>

    </Grid>
    

    );
}

export default FormWorkflow;