import $ from "jquery";
import FormRender from 'form-render';
import React, { useRef, useEffect,useState } from "react";
import { Button, Container,FormControl, Grid, Typography,TextField ,Box,Modal,Input} from '@mui/material';
import "../styles/formCreation.css";
import FormPreview from "../components/FormPreview.js";
import "../styles/formPreview.css"

window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js')


const FormCreationComponent = (props) => {
	const fb = useRef(null);
	const [formJsonObject, setFormJsonObject] = useState(null);
	const [jsonObjectToReturn, setJsonObjectToReturn] = useState(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [formNameValue, setFormNameValue] = useState(props.initialValue || '');
    const [ratings, setRatings] = useState([]);
    
	const { jsonDataToPass, setJsonDataToPass, formFields, setFormFields,idToPass } = props;
    // const [jsonData, setJsonData] = useState(props.jsonDataToPass);
    // const [fieldsStored, setFieldsStored] = useState(props.formFields);
	console.log(idToPass);
	const formData = jsonDataToPass.questionData
	console.log(formData)
	// const passedInFormName = jsonDataToPass.formName
	// console.log(passedInFormName)
	console.log(formNameValue)
	useEffect(() => {
		$(fb.current).formBuilder({

			fields,
			templates,
			formData,
			...options
		});
	});

	let fields = [
		{
		label: 'Signature',
		attrs: {
			type: 'canvas'
		},
		icon: '✏️'
		},
		{
			label: 'Rating',
			attrs: {
				type: 'rating'
			},

		}
	];
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submission behavior
		formJsonObject.FormName = formNameValue;
		console.log(JSON.stringify(formJsonObject))
		// console.log(idToPass)
		//6412db6e15da8346ffc889d7
		var url = "http://localhost:8080/Form/updateFormById/" + idToPass
		fetch(url, {
				method: "PUT",
				headers: {
				"Content-Type": "application/json",
				},
				body: JSON.stringify(formJsonObject)
			})
				.then((response) => {
				if (response.ok) {
					alert("Form updated!")
					window.location.reload(); // Reload the current page
					return response.json();
				} else {
					throw new Error("Something went wrong");
				}
				})
				.then((data) => {
				console.log(data);
				})
				.catch((error) => {
				console.error(error);
				});
		
	};
	let templates = {
		canvas: function(fieldData) {
			return {
			field: '<canvas id="'+fieldData.name+'" width="0" height="0"></canvas>',
			onRender: function() {
				var canvas = document.getElementById(fieldData.name);

			}
			};
		},
		rating:function(fieldData){
			return{
				field: '<rating></rating>',
				onRender: function() {
	
				}
			}

		}
		
	};
	const options = {
	// to be populated from users in database
		roles: {
			Admin: 'Admin',
			Approver: 'Approver',
			Vendor: 'Vendor'
		},
		disableActionButtons: ['data'],
		stickyControls: {
			enable: true,
			offset: {
				top: 20,
				right: 20,
				left: 'auto'
			}
		},
		disableFields: ['autocomplete','button','hidden','header','paragraph','file','text'],
		disabledAttrs: [
			'name',
			'className'
		],
	
	
		
		// To send the jsonData over to backend
		inputSets: [
				{
					label: 'Section Name',
					fields: [
						{
						type: 'header',
						subtype: 'h2',
						label: 'Section Name',
						className: 'header',
	
						},
	
					]
				}
			],
		
		onSave: function(evt,formData){
				const formBuilder = $('#fb-editor').formBuilder('instance');				
				console.log(formData)

				const jsonObject = JSON.parse(formData.replace(/\\/g, '').replace(/\t/g, ''));
				// setJsonObjectToReturn(jsonObject)
				const testJson = {};
				testJson["FormName"] = formNameValue
				testJson["questionData"] = jsonObject
				console.log(testJson)
				setFormJsonObject(testJson)
				
				// setIsPreviewOpen(true);
				
			}
		};
		
	// const setFormNameValue = (value) => {
	// 	console.log('New form name:', value);
	// 	setJsonDataToPass((prevState) => ({ ...prevState, formName: value }));
	// };


	return (
		<Container maxWidth="lg" sx={{ textAlign: 'left', mt:5 }}>
			

			<TextField id="formName" variant="outlined" onChange={(event) => setFormNameValue(event.target.value)} value={formNameValue}></TextField>				
				<div id="fb-editor" ref={fb} />	
					<form onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<Box sx={{ border: 1, borderRadius: 1,padding:"15px", mt:3 }}>
							
							<FormPreview formData={formJsonObject} />
						</Box>
					
					<br></br>
					<Button type="submit"  variant='contained' sx={{float:'right', mb:5}}>Submit</Button> {/* Add submit button */}
					</form>

					
		</Container>
	);
}

export default FormCreationComponent;