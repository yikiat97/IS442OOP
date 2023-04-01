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
    IconButton,
    Select
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import VendorFormPreview from '../components/VendorFormPreview';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Steps, theme } from 'antd';

function FormWorkflow(){
    useEffect(() => {
        getWorkflow();
        
    }, []);
    const role = sessionStorage.getItem("role");
    const workflowID = useParams().workflowID;
    const[workflow, setWorkflow]=React.useState([])
    const[steps, setSteps]=React.useState([])
    const[forms, setForms]=React.useState([])
    const [status, setStatus]=React.useState("")

    const getWorkflow = () => {

        axios.get("http://localhost:8080/vendorWorkflow/vendorWorkflowByID/" + workflowID)
        .then((response) => {
                
                const ini=[]
                const promises=[]
                const forms =[]
                console.log(response.data)
                
                setStatus(response.data.status)
                for(const formID of response.data.forms){
                    
                    
                    axios.get("http://localhost:8080/getForm/" + formID)
                    .then((response)=>{
                        forms.push(response.data.formName)
                    })
                
                }

                for(const id of response.data.questionID){
                    
                    promises.push(
                        axios.get("http://localhost:8080/getQuestion/" + id))
                        console.log(promises)
                }

                setForms(forms)
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
    console.log(status)
    console.log(forms)
    console.log(steps)
    console.log(workflow)
    const navigate = useNavigate();
    const viewEmails = (event) =>{
        navigate("/ViewWorkflowEmails/" + workflowID)
    }
    
    const statuses = [
        "Pending",
        "Pending Admin",
        "Pending Approver",
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
    const stepsContent = steps.map((step, index) => ({
        key: step.questionID,
        content: step,
        title: forms[index]
    }));
    const contentStyle = {
        
        textAlign: 'left',
        color: token.colorTextTertiary,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 10,
    };


    console.log(typeof workflowID)

    const handleStatusChange =()=>{
        let statusUpdate={
            id:workflowID,
            status:status
        }

        axios.put("http://localhost:8080/vendorWorkflow/updateVendorWorkflowStatus", statusUpdate)
                            .then((response)=>{
                                console.log(response.status, response.data.token);
                                window.location.reload();
                            })


    }

    const vendortoAdmin = () =>{
        let vendorComplete=true;
        for(let step of steps){
            if(role=='Vendor' && step.status!='Pending'){
                vendorComplete=false;
            }
        }

        if(vendorComplete && role=='Vendor'){
            axios.put("http://localhost:8080/vendorWorkflow/vendorWorkflowToAdmin/" + workflowID)
                            .then((response)=>{
                                console.log(response.status, response.data.token);
                            })
            
        }
    }

    const admintoApprover = () =>{
        let adminComplete=true;
        for(let step of steps){
            if(role=='Admin' && step.status!='Awaiting Approval'){
                adminComplete=false;
            }
        }

        if(adminComplete && role=='Admin'){
            axios.put("http://localhost:8080/vendorWorkflow/vendorWorkflowToApprover/" + workflowID)
                    .then((response)=>{
                        console.log(response.status, response.data.token);
                    })
            
        }
    }

    const finalApproval = () =>{
        let approverComplete=true;
        
        for(let step of steps){
            if(role=='Approver' && (step.status=='Rejected')){
                approverComplete=false;
            } else if(role=='Approver' && (step.status=='Approved' ||step.status=='Rejected')){
                approverComplete=null
                alert("Form has not been reviewed!")
                break;
            }
            
        }

        if(role=='Approver' && approverComplete){
            axios.put("http://localhost:8080/vendorWorkflow/approveVendorWorkflow/" + workflowID)
                            .then((response)=>{
                                console.log(response.status, response.data.token);
                                
                            })
            
        } else if (role=='Approver' && approverComplete==false){
            axios.put("http://localhost:8080/vendorWorkflow/rejectVendorWorkflow/" + workflowID)
                        .then((response)=>{
                            console.log(response.status, response.data.token);
                            
                        })
        }
    }

    if(role=='Vendor'){
        if(steps.length!=0){
            vendortoAdmin()
            
        }
    } else if(role=='Admin'){
        if(steps.length!=0){
            admintoApprover()
        }
    } else if(role=='Approver'){
        if(steps.length!=0){
            finalApproval()
        }
    }
    
    return(
    
    <Grid sx={{my:6, textAlign:'left', px:4}}>
        
        <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={2.25} sm={2.5}>
                    <Typography variant='h4'>
                        {workflow.workflowName}
                        {status=='Approved' &&
                        <CheckCircleIcon color="success" sx={{pl:1}}/>
                        }
                        
                        
                    </Typography>
                    
                </Grid>


                <Grid item md={0.75} sm={1.5} sx={{justifyContent:"flex-end", display:'flex'}}>
                    {/* {role=='Admin'?
                        <Button color="primary" variant="contained" fullWidth sx={{ backgroundColor:"#2596BE"}} startIcon={<EmailIcon/>} onClick={viewEmails}>
                        View Emails
                        </Button> : 
                    role=='Approver' ?
                        <Button color="primary" variant="contained" fullWidth sx={{ backgroundColor:"#2596BE"}} 
                        onClick={updateWorkflow}
                        >
                        Update Workflow
                        </Button> : <></>
                    } */}
                        {role=='Admin' &&
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
                        <Select variant="filled" size='small' value={status} select 
                        sx={{width:200}} disabled={role=='Vendor'}
                        onChange={(e) =>{
                            setStatus(e.target.value)
                        }}>
                        {statuses.map((status, index) => (
                                            <MenuItem key={index} value={status}>
                                            {status}
                                            </MenuItem>
                                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                {(role=='Admin') &&
                <Grid item>
                    <Button variant="contained" onClick={handleStatusChange}>Update Workflow</Button>
                </Grid>
                }
            </Grid> 
            
            <Divider light sx={{my:3}}>Form Status</Divider>
                <Grid container>
                    <Grid item>
                        <List>
                            {stepsContent.map((step) =>(
                            <ListItem>
                                    <ListItemIcon sx={{pr:2}}>
                                        {   step.content.status=='Pending' ? <Chip label={step.content.status} sx={{backgroundColor:"#ffb74d", width:"100px" }}/> :
                                            step.content.status=='Approved' ? <Chip label={step.content.status}  sx={{ width:"100px" }} color="success"/> :
                                            step.content.status=='Rejected' ? <Chip label={step.content.status} sx={{ width:"100px" }} color="error"/> :
                                            step.content.status==null ? <Chip label="Incomplete" sx={{backgroundColor:"#e0e0e0", width:"100px" }}/> : <></>
                                        }
                                        
                                    </ListItemIcon>
                                    <ListItemText primary={step.title}></ListItemText>

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
            {steps.length>0 && 
                <VendorFormPreview formData={stepsContent[current].content} 
                                    fakeID={stepsContent[current].key} 
                                    status={stepsContent[current].content.status} 
                                    role={role} form={forms[current]}
                                    workflowStatus={status}/> }

            
        
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