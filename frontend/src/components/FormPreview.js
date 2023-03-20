import React, { useState, useEffect } from "react";
import $ from "jquery";
import {Grid,Input,Box,Button,Container, FormControl,FormControlLabel,FormGroup, FormLabel, RadioGroup, Radio, Checkbox, Select, MenuItem, InputLabel, TextField, TextareaAutosize } from '@mui/material';
import Paper from '@mui/material/Paper';

// import Unstable_DateField from '@mui/x-date-pickers/DateField';
import { styled } from '@mui/material/styles';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Unstable_DateField as DateField } from '@mui/x-date-pickers';
import "../styles/formPreview.css" 
import Canvas from "./canvas";
import { Typography } from "antd";
window.jQuery = $;
window.$ = $;
require("formBuilder"); 
require('formBuilder/dist/form-render.min.js')




const FormPreview = ({ formData}) => {
    const [formFields, setFormFields] = useState([]);
    console.log('form preview rendering')
    console.log(formData)
    useEffect(() => {
        if (formData && formData.jsonObject) {
            setFormFields(formData.jsonObject.fields);
        }
    }, [formData]);
    if (!formData) {
        return null;
    }

    const renderField = (field) => {

   
        
        console.log(field)
        switch (field.type) {
        case "h2":
            return(
                <Typography variant="h2" component="h2">
                    {field.label}
                    <br></br>
                </Typography>
            );
        case "header":
            return(
                <Typography variant="h1" component="h1">
                    {field.label}
                    <br></br>
                </Typography>
            );
        case "checkbox-group":
            return (
            <Grid container sx={{ m: 2,display:"block" }} class="formbuilder-checkbox">
                <Typography>{field.label}</Typography>
                <FormGroup>

                    {field.values.map((value, index) => (

                        <FormControlLabel value={value.value} control={<Checkbox defaultChecked />} label={value.label} />
                    ))}
                </FormGroup>
                <br></br>

            </Grid>
            );
        case "date":
            return (
            <Grid container sx={{ m: 2 }} >
                <Typography>{field.label}</Typography>
                <br></br>
                <input class="form-control" type="date" id={field.label}></input>
            </Grid>
            );
        case "number":
            return (
                <Grid container sx={{ m: 2, }}>
                <Typography sx={{ display: 'block' }}>{field.label}</Typography>
                    <input
                        id="standard-number"
                        label="Number"
                        type="number"
                        class="formbuilder-number"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="standard"
                        sx={{ display: 'block' }}
                    />                    
                </Grid>
            );
        case "radio-group":
            return (
            <Grid container sx={{ m: 2 ,display:"block"}}  class="formbuilder-radio">
                <Typography>{field.label}</Typography>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    {field.values.map((value, index) => (
                    <div key={index}>

                        <FormControlLabel value={value.value} control={<Radio />} label={value.label} />

                    </div>
                    ))}
                </RadioGroup>
                <br></br>
            </Grid>
            );
        case "select":
            return (
            <Grid container >
                <FormControl fullWidth>
                <Typography>{field.label}</Typography>
                <Select
                    labelId="demo-simple-select-label"
                    id={field.label}
                >
                    {field.values.map((value, index) => (
                        <MenuItem value={value.value}>{value.label}</MenuItem>
                    ))}
                </Select>
                        {/* <label class="field-label">{field.label}</label>
                        <select
                        className={field.className}
                        name={field.name}
                        multiple={field.multiple}
                        sx={{ width: '200px' }}

                        >
                            {field.values.map((value, index) => (
                                <option value={value.value}>{value.label}</option>
                            ))}
                        </select> */}
                </FormControl>
                <br></br>
            </Grid>
            );
        case "textarea":
            return (
            <Grid container sx={{ m: 2 ,display:"block"}} >
                <Typography>{field.label}</Typography>
                <br></br>
                <TextareaAutosize
                className={field.className}
                name={field.name}
                rows={field.rows}
                cols={field.cols}
                />
                <br></br>
            </Grid>
            );
        case "canvas":
            return (
                <Grid container   sx={{ display:"block"}} >
                    <Typography>{field.label}</Typography>
                    <Canvas sx={{ m: 2, float: 'left',display:'block'  }}/>
                    <br></br>
                </Grid>
            );
        default:
            return null;
        }
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" component="h1">
                {formData.formName}
                <br />
            </Typography>
            {formData.questionData.map((field, index) => (
                <Grid key={index} id="test" sx={{display:"block"}}>
                {field.subtype ? (
                    renderField({ ...field, type: field.subtype })
                ) : (
                    renderField(field)
                )}
                </Grid>
            ))}
        </Container>

    );


};
export default FormPreview;

