// Main component
import $ from "jquery";
import React, { useState, useEffect } from 'react';
import { Grid,Container,Button } from '@mui/material';
import FormSelect from '../components/FormSelection';
import FormPreview from '../components/FormPreview';
window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js')
function ViewForms() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState({});


  useEffect(() => {
    fetch("http://localhost:8080/getForm/All")
      .then((res) => res.json())
      .then((data) => setForms(data));
  }, []);

  const handleFormSelect = (formId) => {
    console.log(formId);
    fetch(`http://localhost:8080/getForm/${formId}`)
      .then((res) => res.json())
      .then((data) => setSelectedForm(data));
  };

  const handleDeleteForm = () => {
    // TODO: implement delete functionality
    console.log('Deleting form');
  };
  return (
		<Container maxWidth="md" sx={{ textAlign: 'left', my:5 }}>
      <FormSelect forms={forms} handleFormSelect={handleFormSelect} selectedForm={selectedForm} setSelectedForm={setSelectedForm} />
      {selectedForm.formName &&
      <Button variant="outlined" color="error" sx={{ float: 'right',marginTop:'25px' }} onClick={handleDeleteForm}>
        Delete form
      </Button>}
      {selectedForm.formName ? (
        <FormPreview formData={selectedForm} />
      ) : (
        <p>No form selected</p>
      )}
		</Container>
  );
}

export default ViewForms;
