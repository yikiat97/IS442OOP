import React, { useState, useEffect } from "react";
import $ from "jquery";
import {Grid,Input,Box,Button, FormControl,FormControlLabel,FormGroup, FormLabel, RadioGroup, Radio, Checkbox, Select, MenuItem, InputLabel, TextField, TextareaAutosize } from '@mui/material';
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
            return <h2>{field.label}</h2>;
        case "header":
            return <h1>{field.label}</h1>;
        case "checkbox-group":
            return (
            <Grid container sx={{ m: 2 }} class="formbuilder-checkbox">
                <Typography>{field.label}</Typography>
                <FormGroup>

                    {field.values.map((value, index) => (

                        <FormControlLabel value={value.value} control={<Checkbox defaultChecked />} label={value.label} />
                    ))}
                </FormGroup>
            </Grid>
            );
        case "date":
            return (
            <Grid container sx={{ m: 2 }} >
                {/* <Unstable_DateField
                /> */}
            </Grid>
            );
        case "number":
            return (
                <Grid container sx={{ m: 2 }}>
                <Typography sx={{ display: 'block' }}>{field.label}</Typography>
                <FormGroup>
                    <br></br>
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
                </FormGroup>
 
                </Grid>
                    // <input type="number"></input>
            );
        case "radio-group":
            return (
            <Grid container sx={{ m: 2 }}  class="formbuilder-radio">
                <Typography>{field.label}</Typography>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    {field.values.map((value, index) => (
                    <div key={index}>

                        <FormControlLabel value={value.value} control={<Radio />} label={value.label} />

                    </div>
                    ))}
                </RadioGroup>

            </Grid>
            );
        case "select":
            return (
            <Grid container >
                <FormControl>
                        <label class="field-label">{field.label}</label>
                        <select
                        className={field.className}
                        name={field.name}
                        multiple={field.multiple}
                        sx={{ width: '200px' }}

                        >
                            {field.values.map((value, index) => (
                                <option value={value.value}>{value.label}</option>
                            ))}
                        </select>
                </FormControl>
            </Grid>
            );
        case "textarea":
            return (
            <Grid container sx={{ m: 2 }} >
                <Typography>{field.label}</Typography>
                <TextareaAutosize
                className={field.className}
                name={field.name}
                rows={field.rows}
                cols={field.cols}
                />
            </Grid>
            );
        case "canvas":
            return (
                <Grid container   >
                    <Typography>{field.label}</Typography><br></br>
                    <Canvas sx={{ m: 2, float: 'left',display:'block'  }}/>
                </Grid>
            );
        default:
            return null;
        }
    };

    return (
        <Box>

            {formData.questionData.map((field, index) => (
                <Grid key={index} id='test'>
                {field.subtype ? (
                    renderField({ ...field, type: field.subtype })
                ) : (
                    renderField(field)
                )}
                </Grid>
            ))}
        </Box>

    );


};
export default FormPreview;
