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
  const [useEffectDone, setUseEffectDone] = useState(false);
  const [jsonDataToPass,setJsonDataToPass]=useState(null);
  const [selectedFormData,setSelectedFormData]=useState(null);
  const [selectedFormID,setSelectedFormID]=useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [idToPass,setIdToPass] = useState(null);

  useEffect(() => {
    if (selectedFormID !== null) {
      setIsLoading(true);
      fetch(`http://localhost:8080/getForm/${selectedFormID}`)
        .then((res) => res.json())
        .then((data) => {
          setSelectedForm(data);
          setIsLoading(false);
        });
    }
  }, [selectedFormID]);

  useEffect(() => {
    fetch("http://localhost:8080/getForm/All")
      .then((res) => res.json())
      .then((data) => setForms(data));
  
    let count = 0;
    formFields.forEach((field) => {
      if (field.type === "rating") {
        setHaveRating(true);
        count += 1;
      }
    });
    setRatingsRendered(count);
    setJsonDataToPass(selectedForm)
    setUseEffectDone(true);
  }, [selectedForm, formFields]);

  const handleFormSelect = (formId) => {
    setSelectedFormID(formId);
  };

  const handleDeleteForm = () => {
    if (selectedFormID !== null) {
      console.log('Deleting form:', selectedFormID);
      fetch(`http://localhost:8080/softDeleteForm/${selectedFormID}`, {
        method: 'PUT',
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Form deleted successfully:', data);
          setSelectedForm({});
          setSelectedFormID(null);
        })
        .catch((error) => {
          console.error('Error deleting form:', error);
        });
    }
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
      {useEffectDone && selectedForm.formName && (
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
          set

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
