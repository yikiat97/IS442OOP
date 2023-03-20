import { FormControl, MenuItem, Select } from '@mui/material';

function FormSelect(props) {
    const { forms, handleFormSelect } = props;
    
    const handleChange = (event) => {
        handleFormSelect(event.target.value);
    };
    
    return (
        <FormControl>
            <p>Form Name:</p>
            <Select
                labelId="form-select-label"
                id="form-select"
                value=""
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
