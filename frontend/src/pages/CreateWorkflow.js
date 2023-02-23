import * as React from 'react';
import dayjs from 'dayjs';
import { Container, textAlign, spacing } from "@mui/system";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
    MenuItem,
    Button
} from "@mui/material";
// import {Paper} from '@mui/material';

function CreateWorkflow(){

    const [value, setValue] = React.useState(dayjs('2022-04-07'));
    const status = [
        "Workflow Created",
        "Awaiting Approver",
        "Awaiting Admin",
        "Rejected"
    ]
    const companyList = [
        {name:"Ever Green", id: 1},
        {name:"Sparks Analytics", id:2},
        {name:"Little Asia", id:3}
    ];
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

                <Grid item md={0.5} sm={6}>
                    <Button variant="contained" sx={{width:100}}>Save</Button>
                </Grid>

                <Grid item sx={{alignItems:"center", justifyContent:"center"}} md={0.5} sm={6}>
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
                                    defaultValue="Assignee"
                                    aria-describedby="Assignee-text"
                                    />
                            </FormControl>
                        </Grid>

                        <Grid item>
                            <FormControl>
                                <FormLabel htmlFor="Company-helper">Company</FormLabel>
                                    <OutlinedInput
                                    id="Company"
                                    defaultValue="Company"
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
            


        </Grid>
        
    )
    
}

export default CreateWorkflow;