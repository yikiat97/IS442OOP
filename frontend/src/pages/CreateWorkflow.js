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
import { Form } from 'react-router-dom';


function CreateWorkflow(){

    const [stepValue, setSteps] = React.useState([{id:1, label:'Select form'}]);
    function onAddBtnClick() {
        setSteps([
            ...stepValue,
            {label:"Select form"} 
        ]);
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //not working
    const deleteStep = index =>{
        setSteps(current => {
            return current.filter(step => {return step.id !=index+1})
        })
        }    


    const forms = [{form:'Vendor Assessment'}, {form:'Pre-Evaluation Form'}, {form:'Health Performance'}];
    const [formvalue, setFormValue] = React.useState(null);
    const filter = createFilterOptions();


    const [value, setValue] = React.useState(dayjs('2022-04-07'));
    const status = [
        "Workflow Created",
        "Awaiting Approver",
        "Awaiting Admin",
        "Rejected"
    ]
    
    const [companyValue, setCompanyValue] = React.useState(null);
    const companyList = [
        {name:"Ever Green", id: 1},
        {name:"Sparks Analytics", id:2},
        {name:"Little Asia", id:3}
    ];

    const [assigneeValue, setAssigneeValue] = React.useState(null);
    const assigneeList=[

            {companyName:"Ever Green", users:
                    [{name:"Carol Chua", id:1},
                    {name:"Louie Peh", id:2}]
            },
            
            {companyName:"Sparks Analytics", users:
                    [{name:"Carol Chua", id:1},
                    {name:"Louie Peh", id:2}]
            },

            {companyName:"Ever Green", users:
                    [{name:"Carol Chua", id:1},
                    {name:"Louie Peh", id:2}]
            }
        ];
    
    

    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>
                <Grid item md={2}>

                    <h1>New Workflow</h1>

                </Grid>

                <Grid item md={0.5} sm={6} sx={{alignItems:"center", justifyContent:"center", display:'flex'}}>
                    <Button variant="contained" sx={{width:100}}>Save</Button>
                </Grid>

                <Grid item sx={{alignItems:"center", justifyContent:"center", display:'flex'}} md={0.5} sm={6}>
                    <Button sx={{bgcolor:"#D3D3D3", color:"#000000", width:100}}>Cancel</Button>
                </Grid>

            </Grid>
            

            
            <Paper elevation={1} sx={{height:350,pt:3}}>

                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>

                    <FormControl>
                            <FormLabel htmlFor="WorkflowName" sx={{}}>Workflow Name</FormLabel>
                                <OutlinedInput
                                id="WorkflowName"
                                defaultValue="Workflow Name"
                                aria-describedby="WorkflowName-text"
                                />
                    </FormControl>

                </Grid>

                <Grid sx={{px:2, mb:4}} container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    
                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Assignee">Assignee</FormLabel>
                                    <OutlinedInput
                                    id="Assignee"
                                    defaultValue="Choose Assignee"
                                    aria-describedby="Assignee-text"
                                    />  
                                                        
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Company-helper">Company</FormLabel>
                                    <OutlinedInput
                                    id="Company"
                                    defaultValue="Choose Company"
                                    aria-describedby="Company-text"
                                    />

                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="DueDate">Due Date</FormLabel>
                                
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            
                                            value={value}
                                            onChange={(newValue) => {
                                            setValue(newValue);
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
                                id="WorkflowName"
                                defaultValue="Workflow Created"
                                aria-describedby="WorkflowName-text"
                                select
                                >

                                {status.map((status) => (
                                            <MenuItem key={status} value={status}>
                                            {status}
                                            </MenuItem>
                                        ))}
                                </TextField>
                    </FormControl>

                </Grid>

            </Paper>

            <Paper elevation={1} sx={{height:"100%", pt:1,pl:2,pb:2, my:3}} md={{}}>
                <Grid sx={{mx:2, mb:4}} columns={{ xs: 12, sm: 12, md: 12 }}>
                    <h2>Workflow Steps</h2>
                </Grid>
    
                <Stepper activeStep={activeStep} orientation="vertical">
                                {stepValue.map((step, index) => ( 
                                <Step key={step.label}>
                                
                                <StepLabel>
                                    {step.label} 
                                </StepLabel>
                                <StepContent>
                                
                                <Box sx={{ mb: 2 }}>

                                
                                            
                                    <Grid container spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{display:"flex",alignItems:"center"}}>
                                        <Grid item sx={{}}>
                                        
                                            {/* needs fixing */}
                                                <TextField defaultValue="EUR" size="medium" select>
                                                    <Button><Link underline="none" href='Form'>Create New Form</Link><AddCircleIcon color='success' sx={{pl:1}}/></Button>
                                                    {forms.map((option) => (
                                                        <MenuItem key={option.form} value={option.form}>{option.form}</MenuItem>
                                                    ))}
                                                </TextField>
                                        
                                        
                                            {/* <Autocomplete
                                            
                                                    required
                                                    value={formvalue}
                                                    onChange={(event, newValue) => {
                                                    if (typeof newValue === 'string') {
                                                        setFormValue({
                                                        form: newValue,
                                                        });
                                                    } else if (newValue && newValue.inputValue) {
                                                        // Create a new value from the user input
                                                        setFormValue({
                                                        form: newValue.inputValue,
                                                        });
                                                    } else {
                                                        setFormValue(newValue);
                                                    }
                                                    }}
                                                    filterOptions={(options, params) => {
                                                    const filtered = filter(options, params);

                                                    const { inputValue } = params;
                                                    // Suggest the creation of a new value
                                                    const isExisting = options.some((option) => inputValue === option.title);
                                                    if (inputValue !== '' && !isExisting) {
                                                        filtered.push({
                                                        inputValue,
                                                        form: `Add "${inputValue}"`,
                                                        });
                                                    }

                                                    return filtered;
                                                    }}
                                                    selectOnFocus
                                                    clearOnBlur
                                                    handleHomeEndKeys
                                                    id="free-solo-with-text-demo"
                                                    options={forms}
                                                    getOptionLabel={(option) => {
                                                    // Value selected with enter, right from the input
                                                    if (typeof option === 'string') {
                                                        return option;
                                                    }
                                                    // Add "xxx" option created dynamically
                                                    if (option.inputValue) {
                                                        return option.inputValue;
                                                    }
                                                    // Regular option
                                                    return option.form;
                                                    }}
                                                    renderOption={(props, option) => <li {...props}>{option.form}</li>}
                                                    sx={{ width: 300 }}
                                                    freeSolo
                                                    renderInput={(params) => (
                                                    <TextField {...params}  />
                                                    )}
                                                /> */}
                                        </Grid>
                                        <Grid item>
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }}
                                                variant="contained"
                                                onClick={()=> {
                                                    handleNext();
                                                    onAddBtnClick();
                                                }}
                                                sx={{ mt: 1, mr: 1 }}>
                                                Add Step
                                            
                                            </Button>
                                        </Grid>

                                        <Grid item>
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }}
                                                variant="contained" color="error"
                                                disabled={index === 0}
                                                // onClick={deleteStep(1)}
                                                sx={{ mt: 1, mr: 1 }}
                                            >
                                                Delete
                                            </Button>
                                        </Grid>

                                        
                                    </Grid>

                                        <Grid item>  
                                            <Button columns={{ xs: 12, sm: 12, md: 12 }} 
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
                    
                        <Button columns={{ xs: 12, sm: 12, md: 12 }} sx={{ mt: 1, mr: 1 }} variant="contained" color="success">
                                Finish
                        </Button>
                    
                        
                </Grid>
            
            </Paper>
            


        </Grid>
        
    )
    
}

export default CreateWorkflow;