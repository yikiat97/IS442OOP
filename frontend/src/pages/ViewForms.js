// Main component
import { useState,useEffect } from 'react';
import { Grid } from '@mui/material';
import FormSelect from '../components/FormSelection';
import FormPreview from '../components/FormPreview';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
const options = ['Option 1', 'Option 2', 'Option 3'];


function ViewForms() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formJsonObject, setformJsonObject] = useState({});
    
    const classes = useStyles();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };


    useEffect(() => {
        fetch('http://localhost:8080/getForm/All')
        .then((res) => res.json())
        .then(data => {
			console.log(data); // Handle the response data
		})
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
        
        

        // <Grid sx={{ mt: 6, textAlign: 'left', px: 4 }}>
        //     <FormSelect forms={forms} handleFormSelect={handleFormSelect} />
        //     {selectedForm && renderForm(selectedForm)}
        // </Grid>
        <div>

<form className={classes.root} noValidate autoComplete="off">
      <div>
        <p
          id="outlined-select-currency"
          select
          label="Select"
          value={selectedOption}
          onChange={handleOptionChange}
          variant="outlined"
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </p>
      </div>
    </form>

		    <FormPreview formData={{
"WorkflowID":"123444kko",
"FormType":"A",
"FormName":"Safety Pre-Check Form 2",
"QuestionData": [
  {
    "type": "header",
    "subtype": "h2",
    "label": "FORM NAME 1",
    "className": "classname",
    "access": false,
    "role": "Test1"
  },
  {
    "type": "paragraph",
    "subtype": "p",
    "label": "Psmthdjiadjoiadwqaragraph",
    "className": "classname",
    "access": true,
    "role": "Test"
  },
  {
    "type": "radio-group",
    "required": false,
    "label": "Radio Group",
    "inline": false,
    "name": "radio-group-1678370813611-0",
    "access": false,
    "other": false,
    "values": [
      {
        "label": "Option 1",
        "value": "option-1",
        "selected": false
      },
      {
        "label": "Option 2",
        "value": "option-2",
        "selected": false
      },
      {
        "label": "Option 3",
        "value": "option-3",
        "selected": false
      }
    ]
  },
  {
    "type": "text",
    "required": false,
    "label": "Write your name here",
    "description": "nil",
    "placeholder": "Write",
    "className": "form-control",
    "name": "name",
    "access": true,
    "subtype": "text",
    "maxlength": 100,
    "role": "Test"
  },
  {
    "type": "textarea",
    "required": false,
    "label": "Text Area",
    "className": "form-control",
    "name": "textarea-1678370824590-0",
    "access": false,
    "subtype": "textarea"
  },
  {
    "type": "signature",
    "required": false,
    "label": "Signature",
    "name": "signature-1678371026995-0",
    "access": false
  }
]
}} />
        </div>

    );
}
export default ViewForms;
