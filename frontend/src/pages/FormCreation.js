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


const FormCreation = () => {
	const fb = useRef(null);
	const [formJsonObject, setFormJsonObject] = useState(null);
	const [jsonObjectToReturn, setJsonObjectToReturn] = useState(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [formName, setFormName] = useState(null);



	const formData = [
		// {
		// 	type: "header",
		// 	subtype: "h1",
		// 	label: "Form Name",
		// }
	];
	
	
	let fields = [
		{
		label: 'Signature',
		attrs: {
			type: 'canvas'
		},
		icon: '✏️'
		},
		{
			label: 'Calculation Table',
			attrs: {
				type: 'calculationTable'
			},

		}
	];
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submission behavior
		console.log(formJsonObject)

		fetch('http://localhost:8080/Form/insertForm', {
			method: 'POST',
			body: JSON.stringify(formJsonObject),
			headers: {
			'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => {
			alert("submitted")
			console.log(data); // Handle the response data
		})
		.catch(error => {
			console.error('Error:', error);
			alert("failed")
		});
	};
	let templates = {
		canvas: function(fieldData) {
			return {
			field: '<canvas id="'+fieldData.name+'" width="0" height="0"></canvas>',
			onRender: function() {
				var canvas = document.getElementById(fieldData.name);
				var context = canvas.getContext("2d");
				context.fillStyle = "white";
				context.fillRect(0, 0, canvas.width, canvas.height);
				canvas.addEventListener("mousedown", startDrawing);
				canvas.addEventListener("mousemove", draw);
				canvas.addEventListener("mouseup", stopDrawing);
				canvas.addEventListener("mouseout", stopDrawing);
	
				var isDrawing = false;
				var lastX, lastY;
	
				function startDrawing(event) {
				isDrawing = true;
				lastX = event.offsetX;
				lastY = event.offsetY;
				}
	
				function draw(event) {
				if (isDrawing) {
					context.beginPath();
					context.moveTo(lastX, lastY);
					context.lineTo(event.offsetX, event.offsetY);
					context.stroke();
					lastX = event.offsetX;
					lastY = event.offsetY;
				}
				}
	
				function stopDrawing() {
				isDrawing = false;
				}
			}
			};
		},
		calculationTable:function(fieldData){
			return{
				field: "Number of rows<input type='number'>",

			};
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
				testJson["FormName"] = formName
				testJson["FormType"]=""
				testJson["questionData"] = jsonObject
				console.log(testJson)
				setFormJsonObject(testJson)
				
				// setIsPreviewOpen(true);
				
			}
		};
		

	useEffect(() => {

		$(fb.current).formBuilder({

			fields,
			templates,
			formData,
			...options
		});
		}, [formData]);


	return (
		<Container maxWidth="lg" sx={{ textAlign: 'left' }}>
			
			<TextField id="formName" label="Form Name" variant="outlined" onChange={(event) => setFormName(event.target.value)}
/>				<div id="fb-editor" ref={fb} />	
				{/* <Modal open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}> sx={{textAlign:center}}*/}
					<FormControl onSubmit={handleSubmit} sx={{ width: "100%" }}>
						<Box sx={{ border: 1, borderRadius: 1,padding:"15px" }}>
							<FormPreview formData={formJsonObject} />
						</Box>
					
					<br></br>
					<Button type="submit" sx={{float:'right'}}>Submit</Button> {/* Add submit button */}
					</FormControl>

				{/* </Modal> */}
					
		</Container>
	);
}

export default FormCreation;
