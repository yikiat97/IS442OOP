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
    Typography
} from "@mui/material";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import VendorFormPreview from '../components/VendorFormPreview';
import { useParams } from 'react-router-dom';

function FormWorkflow(){
    useEffect(() => {
        getWorkflow();
    }, []);

    const workflowID = useParams().workflowID;
    const[workflow, setWorkflow]=React.useState([])
    const[steps, setSteps]=React.useState([])

    const getWorkflow = () => {
        axios.get("http://localhost:8080/vendorWorkflow/vendorWorkflowByID/" + workflowID)
        .then((response) => {
            setWorkflow(response.data);
            // console.log(response.data)
            setSteps(response.data.forms)
        })
        .catch(error => console.error(error));
    };
    
    const statuses = [
        "Workflow Created",
        "Deleted",
        "Approved",
        "Rejected"
    ]

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
    return step === 1;
    };

    const isStepSkipped = (step) => {
    return skipped.has(step);
    };

    const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
        // You probably want to guard against something like this,
        // it should never occur unless someone's actively trying to break something.
        throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
    });
    };

    const handleReset = () => {
    setActiveStep(0);
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

                <Grid item md={0.5} sm={6} sx={{alignItems:"flex-end", justifyContent:"center", display:'flex'}}>
                    <Button variant="contained" sx={{width:100, backgroundColor:"#2596BE"}}>Approve</Button>
                </Grid>

                <Grid item sx={{alignItems:"center", justifyContent:"flex-end", display:'flex'}} md={0.5} sm={6}>
                    <Button sx={{bgcolor:"#D3D3D3", color:"#000000", width:100}}>Deny</Button>
                </Grid>

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

            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                
                if (isStepSkipped(index)) {
                    stepProps.completed = false;
                }
                return (
                    <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
        {activeStep === steps.length ? (
            <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleReset}>Reset</Button>
            </Box>
            </React.Fragment>
        ) : (
            <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                >
                Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                </Button>
                )}

                <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
            </React.Fragment>
        )}

        </Paper>

    </Grid>
    
    );
}

export default FormWorkflow;