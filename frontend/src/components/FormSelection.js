import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
function FormSelect(props) {
    const { forms, handleFormSelect } = props;
    const [selectedFormID, setSelectedFormID] = useState(null);

    const handleChange = (event) => {
        handleFormSelect(event.target.value);
        setSelectedFormID(event.target.value);

    };
    const selectedForm = forms.find((form) => form.formID === selectedFormID);
    console.log(forms)
    return (
        <FormControl>
        <p>Form Name:</p>
        <Select
          labelId="form-select-label"
          id="form-select"
          value={selectedFormID || ''}
          label="Select Form"
          onChange={handleChange}
          sx={{ minWidth: '200px' }}
        >
          {forms.map((form) => (
            <MenuItem key={form.formID} value={form.formID}>
              {form.formName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
}

export default FormSelect;
