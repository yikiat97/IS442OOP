import React, { useState, useEffect } from "react";
import $ from "jquery";
import {Grid,Input,Box,Button,Container, FormControl,FormControlLabel,FormGroup, FormLabel, RadioGroup, Radio, Checkbox, Select, MenuItem, InputLabel, TextField, TextareaAutosize } from '@mui/material';
import Paper from '@mui/material/Paper';

// import Unstable_DateField from '@mui/x-date-pickers/DateField';
import { styled } from '@mui/material/styles';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Unstable_DateField as DateField } from '@mui/x-date-pickers';
import Rating from "./Rating";
import "../styles/formPreview.css" 
import Canvas from "./canvas";
import { Typography } from "antd";
window.jQuery = $;
window.$ = $;
require("formBuilder"); 
require('formBuilder/dist/form-render.min.js')


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    
}));

const FormPreview = ({ formData,renderRatingsSummary ,haveRating, setHaveRating ,formFields, setFormFields, ratingsRendered, setRatingsRendered}) => {
    // const [formFields, setFormFields] = useState([]);
    // const [ratingsRendered, setRatingsRendered] = useState(0);
    // const [haveRating, setHaveRating] = useState(false);
    const [totalRating, setTotalRating] = useState(0);

    
    const updateTotalRating = (rating) => {
        setTotalRating(totalRating + rating);
    };


    console.log('form preview rendering')
    console.log(formData)
    useEffect(() => {
        if (formData && formData.jsonObject) {
            setFormFields(formData.jsonObject.fields);
            let ratingTotal = 0;

            // const fields = formData.jsonObject.fields;
            // let totalRating = 0;
            // fields.forEach((field) => {
            //     if (field.type === "rating") {
            //         totalRating += parseInt(field.rating);
            //     }
            // });
            
            // setTotalRating(totalRating);
            // if (haveRating) {
            //     setRatingCount((prevCount) => prevCount + 1);
            // }
            // renderRatingsSummary();


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
                <Grid item xs={12}>
                    <Item sx={{ width: "100%" }}>
                    <Typography variant="h2" component="h2">
                        {field.label}
                        <br></br>
                    </Typography>
                    </Item>
                </Grid>

            );
        case "header":
            return(
                <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold' }}>
                    {field.label}
                    <br></br>
                </Typography>
            );
        case "checkbox-group":
            return (
            <Item>
                
                <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                <FormGroup>

                    {field.values.map((value, index) => (

                        <FormControlLabel value={value.value} control={<Checkbox defaultChecked />} label={value.label} />
                    ))}
                </FormGroup>
            </Item>
            );
        case "date":
            return (
            <Item sx={{ m: 2 }} >
                <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                <br></br>
                <input class="form-control" type="date" id={field.label}></input>
            </Item>
            );
        case "number":
            return (
                <Item sx={{ m: 2, }}>
                    <Typography sx={{ display: 'block',fontWeight:'bold'}}>{field.label}</Typography>
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
                </Item>
            );
        case "radio-group":
            return (
            <Item sx={{ m: 2 ,display:"block"}}  class="formbuilder-radio">
                <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                    {field.values.map((value, index) => (
                    <div key={index}>

                        <FormControlLabel value={value.value} control={<Radio />} label={value.label} />

                    </div>
                    ))}
                </RadioGroup>
                <br></br>
            </Item>
            );
        case "select":
            return (
            <Item>
                <FormControl fullWidth>
                <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
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
            </Item>
            );
        case "textarea":
            return (
            <Item >
                <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                <TextareaAutosize
                className={field.className}
                name={field.name}
                rows={field.rows}
                cols={field.cols}
                />
                <br></br>
            </Item>
            );
        case "canvas":
            return (
                <Item >
                    <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
                    <Canvas sx={{ m: 2, float: 'left',display:'block'  }}/>
                    <br></br>
                </Item>
            );
        case "rating":
            haveRating=true;
            setTotalRating(field.value)
            return(
                <Rating totalRating={totalRating} updateTotalRating={updateTotalRating} ></Rating>
            );
        default:
            return null;
        }
    };

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold' }}>
                {formData.FormName}
                <br />
            </Typography>
            <Grid container spacing={2}>

                {formData.questionData.map((field, index) => (
                    <Grid key={index} item xs={12} >
                    {field.subtype ? (
                        renderField({ ...field, type: field.subtype })
                    ) : (
                        renderField(field)
                    )}
                    </Grid>
                ))}
                {haveRating && (
                    <Grid item xs={12}>
                        <p>Total rating: {totalRating}</p>
                    </Grid>
                )} 
            </Grid>


        </Container>

    );


};
export default FormPreview;

