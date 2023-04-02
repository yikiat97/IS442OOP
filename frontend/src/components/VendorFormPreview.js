import React, { useEffect,useState } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Container,
  FormControl
} from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from "./Rating";
import Divider from '@mui/material/Divider';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CancelIcon from '@mui/icons-material/Cancel';

import Canvas from "./canvas";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  textAlign:"left"
}));


const VendorFormPreview = ({ formData, fakeID, status,role, form,workflowStatus}) => {
  //console.log(formData)
  const [updatedStructure, setUpdatedStructure] = useState(formData.questionData);
  const [invalidFields, setInvalidFields] = useState([]);
  const [signature, setSignature] = useState(null)
  const [rating,setRating] = useState(null)

  console.log(workflowStatus)
  const [updateStatus, setStatus]=useState(status)
  const [comments, setComments]=useState(formData.comments);
  console.log(updateStatus)
  console.log(formData)
  if (formData == undefined) {
    return (
      
        <p>
          Please await admin to assign form to you
        </p>
  
    );
  }

  const submit = (data) => {
    // Check for invalid fields
    const newInvalidFields = data.filter((field) => {
      if (field.required && field.role === role && (field.value === undefined || field.value === '')) {
        return true;
      }
  
      if (field.type === 'checkbox-group' && field.role === role) {
        const hasSelectedOption = field.values.some((option) => option.selected);
        return !hasSelectedOption;
      }
  
      if (field.type === 'radio-group' && field.role === role) {
        const hasSelectedOption = field.values.some((option) => option.selected);
        return !hasSelectedOption;
      }
  
      return false;
    }).map((field) => field.name);
  
    setInvalidFields(newInvalidFields);
  
    if (newInvalidFields.length > 0) {
      alert('Please fill out all required fields.');
      return;
    }
  
  
  console.log(data)
  
  if(role=='Vendor'){
    status="Pending"
  } else if(role=='Admin'){
    status="Awaiting Approval"
  }
  let formJsonObject = { questionData: data,status: status };
  fetch("http://localhost:8080/Question/updateQuestion/" + fakeID, {
    method: "PUT",
    body: JSON.stringify(formJsonObject),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Submitted");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("failed");
    });
  }



  const updateForm = (data,stat) => {

      // Check for invalid fields
    const invalidFields = data
    console.log(data)
    let formJsonObject = { questionData: data, status: stat, comments: comments };
    console.log(formJsonObject)
    alert(stat)
    fetch("http://localhost:8080/Question/updateQuestion/" + fakeID, {
      method: "PUT",
      body: JSON.stringify(formJsonObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Submitted");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("failed");
      });

  }

  const save = (data) => {
 
    //alert(fakeID);
    console.log(data);
    let formJsonObject = { questionData: data };
    fetch("http://localhost:8080/Question/updateQuestion/" + fakeID, {
      method: "PUT",
      body: JSON.stringify(formJsonObject),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Saved");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("failed");
      });
  };

  const renderField = (field) => {
    // useEffect(() => {
  
    // }, [signature]);
    // Add this function to get the styles for a field based on its validity
    const getStylesForField = (fieldName) => {
      if (invalidFields.includes(fieldName)) {
        return { borderColor: "red", borderWidth: 2, borderStyle: "solid" };
      }
      return {};
    };


    // Add and update the field handling functions here
    const handleTextareaChange = (fieldId, newValue) => {
      // Clone the updatedStructure array to avoid modifying the original state
      const updatedFields = [...updatedStructure];
    
      // Find the field index
      const fieldIndex = updatedFields.findIndex((f) => f.name === fieldId);
    
      // Check if the field is found and then update its value
      if (fieldIndex !== -1) {
        // Update the value of the textarea
        updatedFields[fieldIndex].value = newValue;
        updatedFields[fieldIndex].src = newValue;
    
        console.log(updatedFields);
        // Update the updatedStructure state using setUpdatedStructure
        setUpdatedStructure(updatedFields);
      } else {
        console.error('Field not found:', fieldId);
      }
    };
    



    const handleRatingChange = (fieldId, selectedValue) => {
      // Find the field index
      const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
      let value = null;
    
      // Create a new structure array with the updated field value
      const newStructure = updatedStructure.map((field, index) => {
        if (index === fieldIndex) {
          value = selectedValue;
          return { ...field, value };
        }
        return field;
      });
    
      // Update the fields state using setUpdatedStructure
      setUpdatedStructure(newStructure);
      
    };



      
    const handleRadioChange = (fieldId, selectedValue) => {
      // Clone the fields array to avoid modifying the original state
      
      //const updatedFields = [...formData.questionData];
      // Find the field index
      const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
      let value = null                   
      // Create a new structure array with the updated field value
                         const newStructure = updatedStructure.map((field, index) => {
                          if (index === fieldIndex) {
                              return { ...field, value };
                          }
                          return field;
                      });
      console.log(fieldIndex)
      // Update the selected property of the radio options
      field.values.forEach((option) => {
        if (option.value === selectedValue) {
          option.selected = true;
        } else {
          option.selected = false;
        }
      });
      // Update the fields state using setFields
      setUpdatedStructure(newStructure);
      setInvalidFields((prevInvalidFields) => {
        const newInvalidFields = prevInvalidFields.filter((fieldName) => fieldName !== fieldId);
        return newInvalidFields;
      });
    };


    const handleCheckboxChange = (fieldId, option) => {
      // Toggle the selected property of the clicked checkbox option
      let value = null
      option.selected = !option.selected;
      // Log the updated fields array
      console.log(field);

      const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
                  // Create a new structure array with the updated field value
                  const newStructure = updatedStructure.map((field, index) => {
                    if (index === fieldIndex) {
                        return { ...field, value };
                    }
                    return field;
                });
            
                // Update the updatedStructure state
                setUpdatedStructure(newStructure);
                setInvalidFields((prevInvalidFields) => {
                  const newInvalidFields = prevInvalidFields.filter((fieldName) => fieldName !== fieldId);
                  return newInvalidFields;
                });
      
    };


    const handleSelectChange = (fieldId, selectedValue) => {
      const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
      let value = null;
    
      const newStructure = updatedStructure.map((field, index) => {
        if (index === fieldIndex) {
          return { ...field, value: selectedValue };
        }
        return field;
      });
    
      setUpdatedStructure(newStructure);
    
      setInvalidFields((prevInvalidFields) => {
        const newInvalidFields = prevInvalidFields.filter((fieldName) => fieldName !== fieldId);
        return newInvalidFields;
      });
    };




      const handleFieldChange = (fieldId, value) => {
   // Find the index of the field in the updatedStructure array
   const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
   field.value = value;
 
   // Create a new structure array with the updated field value
   const newStructure = updatedStructure.map((field, index) => {
     if (index === fieldIndex) {
       return { ...field, value };
     }
     return field;
   });
 
   // Update the updatedStructure state
   setUpdatedStructure(newStructure);
 
   // If the field's value has changed, remove it from the invalidFields array
   setInvalidFields((prevInvalidFields) => {
     const newInvalidFields = prevInvalidFields.filter((fieldName) => fieldName !== fieldId);
     return newInvalidFields;
   });
          
      };
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
          <Typography>{field.label}</Typography>
          <FormGroup>
            {field.values.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={
                  <Checkbox
                    checked={option.selected}
                    onChange={() => handleCheckboxChange(field, option)}
                    required={field.role === role}
                    disabled={field.disabled || (field.role !== role)}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        </Item>

        );
      case "date":
        return (
          <Item sx={{ m: 2 }}>
            <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>

            <input 
              disabled={role !== field.role}
              required={field.role === role}
              style={getStylesForField(field.name)}
              type="date"
              className={field.className}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: "1900-01-01",
                max: "2099-12-31",
              }}
              value={field.value || ""}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
            />
          </Item>
        );
      case "number":
          return (
            <Item sx={{ m: 2, }}>
              <Typography sx={{ display: 'block' }}>{field.label}</Typography>
              <FormGroup>
                  <br></br>
                  <input
                      disabled={role !== field.role}
                      required={field.role === role}
                      id="standard-number"
                      label="Number"
                      type="number"
                      style={getStylesForField(field.name)}
                      class="formbuilder-number"
                      value={field.value}
                      InputLabelProps={{
                      shrink: true,
                      }}
                      variant="standard"
                      sx={{ display: 'block' }}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}

                  />                    
              </FormGroup>

              </Item>
                  // <input type="number"></input>
          );
      case "radio-group":
        return (
          <Item sx={{ m: 2 ,display:"block"}}  class="formbuilder-radio">
          <Typography>{field.label}</Typography>
          <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name={field.name}
              style={getStylesForField(field.name)}
              value={field.values.find((option) => option.selected)?.value || ""}
              onChange={(e) => handleRadioChange(field.name, e.target.value)}
            >
              {field.values.map((option, index) => (
                <div key={index}>
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                    required={field.role === role}
                    disabled={field.disabled || (field.role !== role)}
          
                  />
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
                label={field.name}
                id={field.name}
                style={getStylesForField(field.name)}
                className={field.className}
                multiple={field.multiple}
                value={field.values.find((option) => option.selected)?.value || ""}
                onChange={(e) => handleRadioChange(field.name, e.target.value)}
                disabled={field.role !== role}
                required={field.role === role}
                
              >
                {field.values.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Item>

        );
      case "textarea":
        return (
          <Item>
            <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>

            <TextField
              multiline
              fullWidth
              disabled={field.role !== role}
              required={field.role === role}              
              style={getStylesForField(field.name)}
              value={field.value}
              onChange={(e) => handleTextareaChange(field.name, e.target.value)}
            />
          </Item>
        );

      case "canvas":
       // console.log(field.role)
          return (
            <Item sx={{ opacity: field.role === role ? 1 : 0 }}>
              <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
              <div style={{ position: 'relative' }}>
                <Canvas role={role} assignedRole={field.role} signature={signature} setSignature={setSignature}/>
                <br></br>
                <img id={field.name} value={field.value}
                //onChange={(e) => handleTextareaChange(field.name, e.target.src)}
                onLoad={(e) => handleTextareaChange(field.name, e.target.src)}
                 src={ signature == null ? field.value :signature } alt="Signature" />
              </div>
            </Item>
          );
      case "rating":
        // haveRating=true;
        console.log(field.value)
        return(
          <Item>
              <Typography sx={{ fontWeight: 'bold' }}>{field.label}</Typography>
              <Rating rating={rating} value={field.value}
              setRating={setRating}  
              
              onRatingChange={(newRating) => handleRatingChange(field.name, newRating)}>

              </Rating>            
          </Item>

        );
      default:
        return null;

      }
  };

  return (
    <Container maxWidth="xl" id="generatePDF" sx={{py:5}}>
      <Divider/>
      <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', py:2}}>
          {form}
          <br />
      </Typography>
    <form>
      <Grid container sx={{ textAlign: 'left' }}>

          {formData.questionData.map((field, index) => (
              <Grid key={index} item xs={12}sx={{ textAlign: 'left' }} >
              {field.subtype ? (
                  renderField({ ...field, type: field.subtype })
              ) : (
                  renderField(field)
              )}
              </Grid>
          ))}

          <Grid item sx={{py:2}} xs={12} sm={12} md={12}>
          {workflowStatus!="Pending Approver" &&
            <><Divider light sx={{ my: 3 }}>Approval</Divider><TextField
            label="Comments"
            fullWidth
            multiline
            rows={5}
            required
            value={comments}
            disabled={role == 'Admin' || role == 'Vendor'}
            onChange={(e)=>{
              console.log(e.target.value)
                          setComments(e.target.value)
                      }} /></>
          }
            
          
          

          </Grid>
          
          <Grid item xs={2} sx={{pt:2}} >
            {(role=='Admin' || role=='Vendor')?
              <Button variant="contained" color="primary" onClick={() => save(updatedStructure)}>
              Save
            </Button> :
            role=="Approver" ?
              <Button variant="contained" color="success" startIcon={<TaskAltIcon/>} 
                onClick={() => { 
                                  updateForm(updatedStructure, "Approved")
                                  console.log(fakeID)
                                  }}>
                Approve
              </Button>  : <></>

            }
            
          </Grid>
          <Grid item xs={2} sx={{pt:2}}>
          {(role=='Admin' || role=='Vendor') ?
            <Button variant="contained" color="primary" onClick={() => submit(updatedStructure)}>
              Submit
            </Button> :
            role=="Approver" ?
            <Button variant="contained" color="error" startIcon={<CancelIcon/>} 
            onClick={()=> { 
                            updateForm(updatedStructure, "Rejected")
                            
                    }}>
                    Reject
            </Button>  : <></>
          }
        </Grid>
      </Grid>
      {/* {renderRatingsSummary()} */}
    </form>
  </Container>
  );
};

export default VendorFormPreview;




