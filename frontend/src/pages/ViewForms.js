import * as React from 'react';
import {

    Grid, 
    Paper, 
    Button,
    Card, 
    CardContent,
    Typography,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Link,
    Menu,
    MenuItem
        
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import Create from '@mui/icons-material/Create';
import DraftsIcon from '@mui/icons-material/Drafts';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Container from '@mui/material/Container';
import { useState } from 'react';
import FormPreview from '../components/FormPreview';


function ViewForms() {

    const [selectedForm, setSelectedForm] = useState(null);


    const handleFormSelect = (event) => {
        setSelectedForm(event.target.value);
    };
    
    const renderForm = (selectedFormName) => {
        // need to query db using selectedFormName and get the JsonObject of particular form
        // <FormPreview jsonObject={selectedFormObject}></FormPreview>
    };

    return(

            <Grid sx={{mt:6, textAlign:'left', px:4}}>
                <FormControl>
                    <p>Form Name:</p>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleFormSelect}>
                        {/* To be populated with Form names in DB */}
                        <MenuItem value={"form1"}>Form 1</MenuItem>
                        <MenuItem value={"form2"}>Form 2</MenuItem>
                        <MenuItem value={"form3"}>Form 3</MenuItem>
                    </Select>
                </FormControl>

                {renderForm(selectedForm)}

            </Grid>



    );
}

export default ViewForms;