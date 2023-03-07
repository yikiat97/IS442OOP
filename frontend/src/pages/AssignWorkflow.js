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



function AssignWorkflow(){
    //create new workflow


    //set form values
    const workflows = ['Vendor Assessment', 'Pre-Evaluation Form','Health Performance'];
    const [assignWorkflow, AssignWorkflow] = React.useState(null);



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
    const assigneeList=['Carol Chua','Charlie Tan','Emmanuel Kant','Jack Liu'];


    return(
        <Grid sx={{mt:6, textAlign:'left', px:4}}>
            
            <Grid container spacing={{ md: 6 }} columns={{xs:12, sm:4,md:3}}>

                <Grid item md={1.5}>
                    <h1>Assign Workflow</h1>
                </Grid>

                <Grid item md={1}></Grid>

                <Grid item md={0.25} sm={6} sx={{alignItems:"center", justifyContent:"flex-end", display:'flex'}}>
                    <Button variant="contained" sx={{width:100, backgroundColor:"#2596BE"}}>Save</Button>
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
                                    options={workflows}
                                    sx={{width:200}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(newValue) => {
                                        AssignWorkflow(newValue);
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
                                    options={assigneeList}
                                    sx={{width:200}}
                                    renderInput={(params) => <TextField {...params} />}
                                    onChange={(newValue) => {
                                        setAssigneeValue(newValue);
                                        }}
                                    /> 
                                                        
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Company-helper">Company</FormLabel>
                                    
                                <Autocomplete
                                    id="country-select-demo"
                                    sx={{width:200}}
                                    options={companyList}
                                    autoHighlight
                                    onChange={(newValue) => {
                                        setCompanyValue(newValue);
                                        }}
                                    getOptionLabel={(option) => option.name}
                                    renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                        {option.name}
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

        </Grid>
        
    )
    
}

export default AssignWorkflow;