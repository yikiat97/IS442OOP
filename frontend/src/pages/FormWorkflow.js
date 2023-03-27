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
    StepButton
} from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import VendorFormPreview from '../components/VendorFormPreview';
import { useParams } from 'react-router-dom';
import FormPreview from '../components/FormPreview';
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
                for(const id of response.data.forms){
                    promises.push(
                        axios.get("http://localhost:8080/getForm/" + id))
                        console.log(promises)
                }

                setWorkflow(response.data);

                Promise.all(promises)
                    .then((response) => {
                        console.log(response)
                        for(let obj of response){
                            ini.push(obj.data)
                        }
                        setSteps(ini)
                    })
                
        })
        .catch(error => console.error(error));
    };

    console.log(steps)
    
    
    const statuses = [
        "Workflow Created",
        "Deleted",
        "Approved",
        "Rejected"
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
        key: step.formID,
        title: step.formName,
        content: step
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };


    return(
    
    <Grid sx={{mt:6, textAlign:'left', px:4}}>
        
        <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={1.5}>
                    <Typography variant='h4'>
                        {workflow.workflowName}
                    </Typography>
                    
                </Grid>

                <Grid item md={0.5}></Grid>
                { role=='Approver' &&
                <><Grid item md={0.5} sm={6} sx={{ alignItems: "flex-end", justifyContent: "center", display: 'flex' }}>
                        <Button variant="contained" sx={{ width: 100, backgroundColor: "#2596BE" }}>Approve</Button>
                    </Grid><Grid item sx={{ alignItems: "center", justifyContent: "flex-end", display: 'flex' }} md={0.5} sm={6}>
                            <Button sx={{ bgcolor: "#D3D3D3", color: "#000000", width: 100 }}>Deny</Button>
                        </Grid></>
                }

                </Grid>


        <Paper elevation={1} sx={{height:"30%", pt:4, pb:2, px:3, mt:4}}>
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
                        <TextField variant="filled" size='small' defaultValue={workflow.status} select sx={{width:200}}>
                        {statuses.map((status) => (
                                            <MenuItem key={status} value={status}>
                                            {status}
                                            </MenuItem>
                                        ))}
                        </TextField>
                    </FormControl>
                </Grid>
            </Grid> 

        </Paper>

        <Paper elevation={1} sx={{height:"100%", pt:4, pb:2, px:3, mt:4}}>
            <>
        <Steps current={current} items={stepsContent} />
        <div style={contentStyle}>
            {steps.length>0 && <FormPreview formData={stepsContent[current].content}/> }
        </div>
        <div
            style={{
            marginTop: 24,
            }}
        >
            {current < steps.length - 1 && (
            <Button color="primary" variant='contained' onClick={() => next()}>
                Next
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button color="success" variant='contained' onClick={() => message.success('Workflow Submitted!')}>
                Done
            </Button>
            )}
            {current > 0 && (
            <Button
                variant='contained'
                sx={{
                margin: '0 8px',
                }}
                onClick={() => prev()}
            >
                Previous
            </Button>
            )}
        </div>
        </>
        
        </Paper>

    </Grid>
    

    );
}

export default FormWorkflow;