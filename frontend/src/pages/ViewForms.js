// Main component
import { useState, useEffect } from 'react';
import { Grid,Container } from '@mui/material';
import FormSelect from '../components/FormSelection';
import FormPreview from '../components/FormPreview';

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

  return (
		<Container maxWidth="md" sx={{ textAlign: 'left' }}>
      <FormSelect forms={forms} handleFormSelect={handleFormSelect} selectedForm={selectedForm} setSelectedForm={setSelectedForm} />
      {selectedForm.formName ? (
        <FormPreview formData={selectedForm} />
      ) : (
        <p>No form selected</p>
      )}
		</Container>
  );
}

export default ViewForms;
