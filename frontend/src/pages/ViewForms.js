import $ from "jquery";
import React, { useState, useEffect } from 'react';
import { Grid,Container,Button,Box,Typography } from '@mui/material';
import FormSelect from '../components/FormSelection';
import FormPreview from '../components/FormPreview';
import FormCreationComponent from "../components/FormCreationComponent";
window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js')

function ViewForms() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});
  const [haveRating, setHaveRating] = useState(false);
  const [formFields, setFormFields] = useState([]);
  const [ratingsRendered, setRatingsRendered] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [useEffectDone, setUseEffectDone] = useState(false); // Add state variable
  const [jsonDataToPass,setJsonDataToPass]=useState(null);
  const [selectedFormData,setSelectedFormData]=useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idToPass,setIdToPass] = useState(null);

  const renderRatingsSummary = () => {
    if(useEffectDone && haveRating){ // Wait until useEffectDone is true
        return (
        <Box sx={{ marginTop: 2 }}>
            <Typography>Total Score:{totalRating}</Typography>
        </Box>
        );            
    }
  };
  useEffect(() => {
    fetch("http://localhost:8080/getForm/All")
      .then((res) => res.json())
      .then((data) => setForms(data));
  
    let count = 0;
    console.log(formFields);
    formFields.forEach((field) => {
      if (field.type === "rating") {
        alert("theres rating field");
        setHaveRating(true);
        count += 1;
      }
    });
    setRatingsRendered(count);
    setJsonDataToPass(selectedForm)
    console.log(selectedForm)
    setUseEffectDone(true);
  }, [selectedForm, formFields]); // Add selectedForm as a dependency


  const handleFormSelect = (formId) => {
    fetch(`http://localhost:8080/getForm/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedForm(data);
        setIsLoading(false);

      });
      
  };

  const handleDeleteForm = () => {
    // TODO: implement delete functionality
    console.log('Deleting form');
  };
  
  return (
    <Container maxWidth="md" sx={{ textAlign: "left", my: 5 }}>
      <FormSelect
        forms={forms}
        idToPass={idToPass}
        setIdToPass={setIdToPass}
        handleFormSelect={handleFormSelect}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      {selectedForm.formName && (
        <Button
          variant="outlined"
          color="error"
          sx={{ float: "right", marginTop: "25px" }}
          onClick={handleDeleteForm}
        >
          Delete form
        </Button>
      )}
      {isLoading ? (
          <p>No form selected</p>
        ) : selectedForm.formName ? (
        <FormCreationComponent
          idToPass={idToPass}
          jsonDataToPass={jsonDataToPass.questionData}
          setJsonDataToPass={setJsonDataToPass}
          formFields={formFields}
          setFormFields={setFormFields}
        />
      ) : (
        <p>No form selected</p>
      )}
    </Container>
  );
}

export default ViewForms;
