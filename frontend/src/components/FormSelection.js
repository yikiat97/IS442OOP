// FormSelect.js

import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

function FormSelect(props) {
  const { forms, handleFormSelect } = props;
  const [selectedForm, setSelectedForm] = useState('');

  const handleChange = (event) => {
    setSelectedForm(event.target.value);
    handleFormSelect(event.target.value);
  };

  return (
    <FormControl>
      <p>Form Name:</p>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedForm}
        onChange={handleChange}
      >
        {forms.map((form) => (
          <MenuItem key={form._id} value={form._id}>
            {form.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
