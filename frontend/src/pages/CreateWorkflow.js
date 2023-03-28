import * as React from 'react';
import dayjs from 'dayjs';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { Container, textAlign, spacing, Box } from "@mui/system";
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
    Link,
    formControlClasses,
    Select
} from "@mui/material";



function CreateWorkflow(){
    
      //submit workflow and set form steps
      const [workflowName, setWorkflowName] = React.useState('New Workflow');
      const [workflow, setWorkflow] = React.useState({});
      const [formSteps, setFormStep]= React.useState([]);  

    //set steps
    const [nextId, setNextId]=React.useState(1);
    const [formID, setFormID]=React.useState('');
    const [formName, setFormName]=React.useState('');
    const [stepValue, setSteps] = React.useState([
        {id:0,
        formID: '640b618edb086d54e974b3b4',
        formName: 'Safety Pre-Check Form 1'}]);

    // const onAddBtnClick = (event) => {
    //     const step ={
    //         label:"Select form",
    //         form: ""
    //     }
    //     setSteps([
    //         ...stepValue,
    //         step
    //     ]);
    //     setWorkflow([...workflow])
    //     .then(() => console.log(workflow));    }

    //stepper handle next and back button
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //not working
    const deleteStep = (index) => {
        setSteps(current => {
          const newSteps = [...current];
          newSteps.splice(index, 1);
          return newSteps;
        });
        if(index!=0){
            handleBack();
        }
      };

    
    useEffect(() => {
        getForms();
        getWorkflows();
    }, []);


    //retrieve form values
    const [forms, setForms] = React.useState([]);
    const getForms = () => {
        // console.log(activeStep);

        axios.get("http://localhost:8080/getForm/All")
        .then((response) => {
            const ini={}
            const data=response.data
            
            for(let i=0; i<data.length; i++){
                // ini.push(data[i].formID)
                ini[data[i].formID]= [data[i].formName]
            }
            console.log(ini)
            setForms(ini)
        })
        .catch(error => console.error(error));
    };
    
    // retrieve workflows
    const [workflowDatabase, setWorkflowDatabase]=React.useState([]);
    const getWorkflows = () => {
        

        axios.get("http://localhost:8080/workflow/allWorkflow")
        .then((response) => {
            const ini=[]
            const data=response.data
            
            for(let i=0; i<data.length; i++){
                ini.push(data[i].workflowName)
            }
            // console.log(ini)f
            setWorkflowDatabase(ini)

        })
        .catch(error => console.error(error));
    };


    // const addFormToWorkflow = ()=>{
    //     console.log(formName)
    // }
    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log(stepValue);
        console.log(workflowName);
        
        
        const formIDS = stepValue.map((form) => form.formID);
        
        
        
        // validate if there are duplicate chosen forms
        const uniqueForms = new Set(formIDS);
        if (uniqueForms.size !== formIDS.length) {
            alert('There are repeated forms!');
            return;
        }
        
        // validate if there is a workflow with the same name
        console.log(workflowDatabase);
        if(workflowDatabase.includes(workflowName)){
            alert('There is already a workflow with the same name!');
            return;
        }

        
        const workflow = {
            forms: formIDS,
            workflowName: workflowName,
        };
        console.log(workflow);
        
        axios.post("http://localhost:8080/workflow/insertWorkflow", workflow).then((response) => {
            console.log(response.status, response.data.token);
            alert("Workflow has been created!");
            window.location.reload();
        });
    };
    

    const handleFormNameChange = (e) => {
        const newValue = e.target.value;
        console.log(newValue)
        setSteps((prevSteps) => {
            const updatedSteps = [...prevSteps];
            updatedSteps[activeStep].formName = forms[newValue];
            updatedSteps[activeStep].formID = newValue;
            // console.log(newValue);
            // console.log(forms);
        return updatedSteps;
        });
        // console.log(stepValue);
    };

    // console.log(forms)
    // console.log(stepValue)
    return(
        
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
        
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={1.5}>
                    <TextField variant='standard' value={workflowName} onChange={(e) => {
                                                                setWorkflowName(e.target.value);
                                                                }}
                                fullWidth hiddenLabel></TextField>
                </Grid>

                <Grid item md={1}></Grid>

                <Grid item md={0.25} sm={6} sx={{alignItems:"flex-end", justifyContent:"center", display:'flex'}}>
                    <Button variant="contained" sx={{width:100, backgroundColor:"#2596BE"}}>Save</Button>
                </Grid>

                <Grid item sx={{alignItems:"center", justifyContent:"flex-end", display:'flex'}} md={0.25} sm={6}>
                    <Button sx={{bgcolor:"#D3D3D3", color:"#000000", width:100}}>Cancel</Button>
                </Grid>

            </Grid>
            



            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h4>Workflow Steps</h4>
                </Grid>
    
                <Stepper activeStep={activeStep} orientation="vertical">
                                {stepValue.map((step, index) => ( 
                                <Step key={step.id}>
                                
                                <StepLabel>
                                    Select form
                                </StepLabel>
                                <StepContent>
                                
                                <Box sx={{ mb: 2 }}>

                                    <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{display:"flex",alignItems:"center"}}>
                                        <Grid item sx={{}}>
                                        
                                            
                                                <Select
                                                    name='form'
                                                    value={step.formID}
                                                    onChange={(e) => {
                                                        handleFormNameChange(e);
                                                        
                                                        // addFormToWorkflow();
                                                        console.log(stepValue);
                                                        console.log(step);
                                                        }}
                                                    size="medium" select sx={{width:300}}>
                                                    
                                                    <Button><Link underline="none" href='Form'>Create New Form</Link><AddCircleIcon color='success' sx={{pl:1}}/></Button>
                                                        
                                                        {Object.keys(forms).map((option) => (
                                                            <MenuItem key={option} value={option}>{forms[option]}</MenuItem>
                                                        ))}
            
                                                </Select>
                                        
                                        

                                        </Grid>
                                        <Grid item>
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }}
                                                variant="contained"
                                                onClick={()=> {
                                                    handleNext();
                                                    // setFormName(formName)
                                                    // addFormToWorkflow();
                                                    setNextId(nextId + 1);
                                                    setSteps([
                                                        ...stepValue,
                                                        {id: nextId,
                                                        formID: formID,
                                                        formName: formName}
                                                    ]);
                                                    console.log(nextId)
                                                    
                                                }}
                                                sx={{ mt: 1, mr: 1 }}>
                                                Add Step
                                            
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }}
                                                variant="contained" color="error"
                                                disabled={stepValue.length === 1}
                                                onClick={() => deleteStep(index)}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>

                                        
                                    </Grid>
                                        <Grid item>  
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }} 
                                                disabled = {activeStep+1 === stepValue.length}
                                                variant="outlined"
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1 }}>
                                                Next
                                            </Button>

                                            <Button columns={{ xs: 12, sm: 12, md: 12 }}
                                                disabled={index === 0}
                                                variant="outlined"
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1 }}>
                                                Back
                                            </Button>
                                        </Grid>  
                                    </Box>
                                </StepContent>
                            </Step>
                            ))}
                    </Stepper>

                <Grid sx={{mx:2, mb:4, display:"flex", justifyContent:"flex-end"}} columns={{ xs: 12, sm: 12, md: 12}}>
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success"
                        onClick = {()=>handleSubmit()}
                        >
                                Finish
                        </Button>              
                </Grid> 
            </Paper>
        </Grid>
    )
}

export default CreateWorkflow;