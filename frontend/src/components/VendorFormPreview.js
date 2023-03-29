import React, { useState } from "react";
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
} from "@mui/material";
import Canvas from "./canvas";

const VendorFormPreview = ({ formData, fakeID }) => {
  //console.log(formData)
  const [updatedStructure, setUpdatedStructure] = useState(formData.questionData);
  const [invalidFields, setInvalidFields] = useState([]);
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
  const invalidFields = data
    .filter((field) => {
      if (field.required) {
        const isValuePresent =
          field.type === "radio-group" || field.type === "checkbox-group"
            ? field.values.some((option) => option.selected)
            : field.value && field.value.trim() !== "";
        return !isValuePresent;
      }
      return false;
    })
    .map((field) => field.name);

  // If any required field is not filled, display an alert and update the invalidFields state
  if (invalidFields.length > 0) {
    alert("Please fill all required fields.");
    setInvalidFields(invalidFields);
    return;
  }
  }

  const save = (data) => {
 
    alert(fakeID);
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
        alert("submitted");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("failed");
      });
  };

  const renderField = (field) => {

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
    
      // Update the value of the textarea
      updatedFields[fieldIndex].value = newValue;
    
      // Update the updatedStructure state using setUpdatedStructure
      setUpdatedStructure(updatedFields);
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
          
      };
      
      
      switch (field.type) {
      case "h2":
          console.log(field)
          return <h2>{field.label}</h2>;
      case "header":
          return <h1>{field.label}</h1>;
      case "checkbox-group":
        return (
          <Grid style={getStylesForField(field.name)} container sx={{ m: 2 }} class="formbuilder-checkbox">
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
                      
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </Grid>
        );
      case "date":
        return (
          <Grid container sx={{ m: 2 }}>
            <TextField
              label={field.label}
              style={getStylesForField(field.name)}
              type="date"
              className={field.className}
              required={field.required}
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

              </Grid>
                  // <input type="number"></input>
          );
      case "radio-group":
        return (
          <Grid container sx={{ m: 2 }} class="formbuilder-radio">
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
                  />
                </div>
              ))}
            </RadioGroup>
          </Grid>
        );
      case "select":
        return (
          <div style={{backgroundColor: "white", borderRadius: "10px"}}>
          <Grid container sx={{ }}>
            <InputLabel style={{paddingRight:"10px",}} htmlFor={field.name}>{field.label}</InputLabel>
 
            <Select
              labelId={field.name}
              id={field.name}
              style={getStylesForField(field.name)}
              className={field.className}
              required={true}
              multiple={field.multiple}
              value={field.values.find((option) => option.selected)?.value || ""}
              onChange={(e) => handleRadioChange(field.name, e.target.value)}
            >
              {field.values.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          </div>
        );
      case "textarea":
        return (
          <div style={{backgroundColor: "white", borderRadius: "10px"}}>
          <Grid style={{padding:"50px",}}container sx={{ }}>
            <TextField
              multiline
              fullWidth
              required={field.required}
              style={getStylesForField(field.name)}
              value={field.value}
              onChange={(e) => handleTextareaChange(field.name, e.target.value)}
            />
          </Grid>
          </div>
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
          return (
            <p>
            Please await admin to assign form to you
          </p>
          );;
      }
  };

  return (
    <div>
    <Grid style={{ width:"70%", margin:"auto"}} container spacing={2}>
      {formData.questionData.map((field, index) => (
        <Grid key={index} item xs={12}>
          {field.subtype ? renderField({ ...field, type: field.subtype }) : renderField(field)}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={() => save(updatedStructure)}>
          Save
        </Button>
        <Button variant="contained" color="primary" onClick={() => submit(updatedStructure)}>
          Submit
        </Button>
      </Grid>
    </Grid>
    </div>
  );
};

export default VendorFormPreview;




// import React, { useState, useEffect } from "react";
// import $ from "jquery";
// import {Grid,Input,Box,Button, FormControl,FormControlLabel,FormGroup, FormLabel, RadioGroup, Radio, Checkbox, Select, MenuItem, InputLabel, TextField, TextareaAutosize } from '@mui/material';
// import Paper from '@mui/material/Paper';

// // import Unstable_DateField from '@mui/x-date-pickers/DateField';
// import { styled } from '@mui/material/styles';

// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { Unstable_DateField as DateField } from '@mui/x-date-pickers';
// import "../styles/formPreview.css" 
// import Canvas from "./canvas";
// import { Typography } from "antd";
// window.jQuery = $;
// window.$ = $;
// require("formBuilder"); 
// require('formBuilder/dist/form-render.min.js')




// const VendorFormPreview = ({ formData,fakeID}) => {
//     const [fieldValues, setFieldValues] = useState({});
//     const [Editedfield, setEditedfield] = useState([]);
//     const [updatedStructure, setUpdatedStructure] = useState(formData.questionData);
    
//     if (!formData) {
//         return null;
//     }
//     console.log(updatedStructure)

//     const submit = (data) => {
//       alert(fakeID)
//       console.log(data)
//       let formJsonObject = {"questionData": data}
//       fetch('http://localhost:8080/Question/updateQuestion/'+ fakeID, {
// 			method: 'PUT',
// 			body: JSON.stringify(formJsonObject),
// 			headers: {
// 			'Content-Type': 'application/json'
// 			}
// 		})
// 		.then(response => response.json())
// 		.then(data => {
// 			alert("submitted")
// 			console.log(data); // Handle the response data
// 		})
// 		.catch(error => {
// 			console.error('Error:', error);
// 			alert("failed")
// 		});
//     }


//     const renderField = (field) => {
    

//       const handleTextareaChange = (fieldId, newValue) => {
//         // Clone the updatedStructure array to avoid modifying the original state
//         const updatedFields = [...updatedStructure];
      
//         // Find the field index
//         const fieldIndex = updatedFields.findIndex((f) => f.name === fieldId);
      
//         // Update the value of the textarea
//         updatedFields[fieldIndex].value = newValue;
      
//         // Update the updatedStructure state using setUpdatedStructure
//         setUpdatedStructure(updatedFields);
//       };


        
//       const handleRadioChange = (fieldId, selectedValue) => {
//         // Clone the fields array to avoid modifying the original state
        
//         //const updatedFields = [...formData.questionData];
//         // Find the field index
//         const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
//         let value = null                   
//         // Create a new structure array with the updated field value
//                            const newStructure = updatedStructure.map((field, index) => {
//                             if (index === fieldIndex) {
//                                 return { ...field, value };
//                             }
//                             return field;
//                         });
//         console.log(fieldIndex)
//         // Update the selected property of the radio options
//         field.values.forEach((option) => {
//           if (option.value === selectedValue) {
//             option.selected = true;
//           } else {
//             option.selected = false;
//           }
//         });
//         // Update the fields state using setFields
//         setUpdatedStructure(newStructure);
//       };


//       const handleCheckboxChange = (fieldId, option) => {
//         // Toggle the selected property of the clicked checkbox option
//         let value = null
//         option.selected = !option.selected;
//         // Log the updated fields array
//         console.log(field);

//         const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
//                     // Create a new structure array with the updated field value
//                     const newStructure = updatedStructure.map((field, index) => {
//                       if (index === fieldIndex) {
//                           return { ...field, value };
//                       }
//                       return field;
//                   });
              
//                   // Update the updatedStructure state
//                   setUpdatedStructure(newStructure);
//       };

//         const handleFieldChange = (fieldId, value) => {
//             // Find the index of the field in the updatedStructure array
//             const fieldIndex = updatedStructure.findIndex((field) => field.name === fieldId);
//             field.value = value;
//             // Create a new structure array with the updated field value
//             const newStructure = updatedStructure.map((field, index) => {
//                 if (index === fieldIndex) {
//                     return { ...field, value };
//                 }
//                 return field;
//             });
        
//             // Update the updatedStructure state
//             setUpdatedStructure(newStructure);
            
//         };
        
        
//         switch (field.type) {
//         case "h2":
//             console.log(field)
//             return <h2>{field.label}</h2>;
//         case "header":
//             return <h1>{field.label}</h1>;
//         case "checkbox-group":
//           return (
//             <Grid container sx={{ m: 2 }} class="formbuilder-checkbox">
//               <Typography>{field.label}</Typography>
//               <FormGroup>
//                 {field.values.map((option, index) => (
//                   <FormControlLabel
//                     key={index}
//                     value={option.value}
//                     control={
//                       <Checkbox
//                         checked={option.selected}
//                         onChange={() => handleCheckboxChange(field, option)}
//                       />
//                     }
//                     label={option.label}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>
//           );
//         case "date":
//             return (
//             <Grid container sx={{ m: 2 }} >
//                 {/* <Unstable_DateField
//                 /> */}
//             </Grid>
//             );
//         case "number":
//             return (
//                 <Grid container sx={{ m: 2 }}>
//                 <Typography sx={{ display: 'block' }}>{field.label}</Typography>
//                 <FormGroup>
//                     <br></br>
//                     <input
//                         id="standard-number"
//                         label="Number"
//                         type="number"
//                         class="formbuilder-number"
//                         value={field.value}
//                         InputLabelProps={{
//                         shrink: true,
//                         }}
//                         variant="standard"
//                         sx={{ display: 'block' }}
//                         onChange={(e) => handleFieldChange(field.name, e.target.value)}
//                     />                    
//                 </FormGroup>
 
//                 </Grid>
//                     // <input type="number"></input>
//             );
//         case "radio-group":
//           return (
//             <Grid container sx={{ m: 2 }} class="formbuilder-radio">
//               <Typography>{field.label}</Typography>
//               <RadioGroup
//                 aria-labelledby="demo-radio-buttons-group-label"
//                 name={field.name}
//                 value={field.values.find((option) => option.selected)?.value || ""}
//                 onChange={(e) => handleRadioChange(field.name, e.target.value)}
//               >
//                 {field.values.map((option, index) => (
//                   <div key={index}>
//                     <FormControlLabel
//                       value={option.value}
//                       control={<Radio />}
//                       label={option.label}
//                     />
//                   </div>
//                 ))}
//               </RadioGroup>
//             </Grid>
//           );
//         case "select":
//           return (
//             <Grid container sx={{ m: 2 }}>
//               <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
//               <Select
//                 labelId={field.name}
//                 id={field.name}
//                 className={field.className}
//                 required={field.required}
//                 multiple={field.multiple}
//                 value={field.values.find((option) => option.selected)?.value || ""}
//                 onChange={(e) => handleRadioChange(field.name, e.target.value)}
//               >
//                 {field.values.map((option, index) => (
//                   <MenuItem key={index} value={option.value}>
//                     {option.label}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </Grid>
//           );
//         case "textarea":
//           return (
//             <Grid container sx={{ m: 2 }}>
//               <TextField
//                 label={field.label}
//                 multiline
//                 fullWidth
//                 required={field.required}
//                 value={field.value || ""}
//                 onChange={(e) => handleTextareaChange(field.name, e.target.value)}
//               />
//             </Grid>
//           );

//         case "canvas":
//             return (
//                 <Grid container   >
//                     <Typography>{field.label}</Typography><br></br>
//                     <Canvas sx={{ m: 2, float: 'left',display:'block'  }}/>
//                 </Grid>
//             );
//         default:
//             return (
//                 <Grid container   >
//                     <Typography>{field.label}</Typography><br></br>
//                     <Canvas sx={{ m: 2, float: 'left',display:'block'  }}/>
//                 </Grid>
//             );;
//         }
        
//     };

//     return (
//         <div>
//         <Box>

//             {formData.questionData.map((field, index) => (
//                 <Grid key={index} id='test'>
//                 {field.subtype ? (
//                     renderField({ ...field, type: field.subtype })
//                 ) : (
//                     renderField(field)
//                 )}
                 
//                 </Grid>

//             ))}
//             <button onClick={() => submit(updatedStructure)}>Save</button>
//         </Box>

        
//         </div>             
//     );


// };
// export default VendorFormPreview;

