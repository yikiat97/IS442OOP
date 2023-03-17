// Main component
import { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import FormSelect from '../components/FormSelection';
import FormPreview from '../components/FormPreview';
function ViewForms() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);

    useEffect(() => {
        fetch('/getForm/All')
        .then((res) => res.json())
        .then((data) => setForms(data));
    }, []);

    const handleFormSelect = (formId) => {
        setSelectedForm(forms.find((form) => form._id === formId));
    };
    const renderForm = (selectedFormName) => {
        // need to query db using selectedFormName and get the JsonObject of particular form
        // <FormPreview jsonObject={selectedFormObject}></FormPreview>
    };
    return (
        <Grid sx={{ mt: 6, textAlign: 'left', px: 4 }}>
            <FormSelect forms={forms} handleFormSelect={handleFormSelect} />
            {selectedForm && renderForm(selectedForm)}
        </Grid>
    );
}
export default ViewForms;
