// Main component
import { useState,useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import FormSelect from '../components/FormSelection';
import VendorFormPreview from '../components/VendorFormPreview';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


// const testjson = {"questionID":"6414368009c2b82277d41e08",
// "questionData": [
//   {
//     "type": "header",
//     "subtype": "h1",
//     "label": "HEADING",
//     "className": "header",
//     "access": true,
//     "role": "Test"
//   },
//   {
//     "type": "checkbox-group",
//     "required": true,
//     "label": "Skill set CheckBox",
//     "toggle": false,
//     "inline": false,
//     "name": "checkbox-group-1679119721976-0",
//     "access": false,
//     "other": false,
//     "values": [
//       {
//         "label": "java",
//         "value": "java",
//         "selected": true
//       },
//       {
//         "label": "python",
//         "value": "python",
//         "selected": false
//       },
//       {
//         "label": "js",
//         "value": "js",
//         "selected": false
//       }
//     ]
//   },
//   {
//     "type": "date",
//     "required": true,
//     "label": "Date Field",
//     "className": "form-control",
//     "name": "date-1679119725153-0",
//     "access": false
//   },
//   {
//     "type": "number",
//     "required": false,
//     "label": "Number",
//     "className": "form-control",
//     "name": "number-1679119725972-0",
//     "access": false,
//     "value": "123"
//   },
//   {
//     "type": "number",
//     "required": false,
//     "label": "Number",
//     "className": "form-control",
//     "name": "number-1679119725972-1",
//     "access": false,
//     "value": "123"
//   },
//   {
//     "type": "radio-group",
//     "required": true,
//     "label": "Gender",
//     "inline": false,
//     "name": "radio-group-1679119726671-0",
//     "access": false,
//     "other": false,
//     "values": [
//       {
//         "label": "Male",
//         "value": "Male",
//         "selected": false
//       },
//       {
//         "label": "Female",
//         "value": "Female",
//         "selected": false
//       }
//     ]
//   },
//   {
//     "type": "select",
//     "required": false,
//     "label": "Drinks",
//     "className": "form-control",
//     "name": "select-1679119729874-0",
//     "access": false,
//     "multiple": false,
//     "values": [
//       {
//         "label": "coffeee",
//         "value": "coffeee",
//         "selected": true
//       },
//       {
//         "label": "tea",
//         "value": "tea",
//         "selected": false
//       },
//       {
//         "label": "Milo",
//         "value": "Milo",
//         "selected": false
//       }
//     ]
//   },
//   {
//     "type": "textarea",
//     "required": false,
//     "label": "Wrtie smth here",
//     "className": "form-control",
//     "name": "textarea-1679119731045-0",
//     "access": false,
//     "subtype": "textarea"
//   },
//   {
//     "type": "canvas",
//     "required": false,
//     "label": "Signature",
//     "name": "canvas-1679119735970-0",
//     "access": false
//   }
// ]}
   // {"questionID":"6414368009c2b82277d41e08","questionData":[{"type":"header","subtype":"h2","label":"like","className":"header","access":false},{"type":"textarea","required":false,"label":"trxt lor:","className":"form-control","name":"textarea-1679045646826-0","access":false,"subtype":"textarea"},{"type":"canvas","required":false,"label":"Signature OBss","name":"canvas-1679045658018-0","access":false}]}

   function ViewForms() {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState(null);
    const [formJsonObject, setformJsonObject] = useState({});
    const fakeID = '6414455f69f70a5ec4999300'
    console.log(formJsonObject)

    ///////get all forms on load
    useEffect(() => {
        fetch('http://localhost:8080/getQuestion/'+ fakeID )
        .then((res) => res.json())
        .then(data => {
            console.log(data); // Handle the response data
            //console.log(testjson)
            setformJsonObject(data)
        })
        .then((data) => setForms(data));
    }, []);

    return (    
        <div>
            {Object.keys(formJsonObject).length > 0 && (
                <VendorFormPreview formData={formJsonObject} fakeID={fakeID} />
            )}
        </div>
    );
}
export default ViewForms;

