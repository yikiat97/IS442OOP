import $ from "jquery";
import FormRender from 'form-render';
import React, { useRef, useEffect,useState } from "react";
import { Button, Container, Grid, Typography,TextField ,Box,Modal} from '@mui/material';
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
	const [jsonObject, setJsonObject] = useState(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);



	const formData = [
		{
			type: "header",
			subtype: "h1",
			label: "Form Name",
		}
	];
	
	
	let fields = [
		{
		label: 'Signature',
		attrs: {
			type: 'canvas'
		},
		icon: '✏️'
		}
	];
	
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
		}
	};
	const options = {
	// to be populated from users in database
		roles: {
			Test: 'Test',
			Test1: 'Test1',
			Test2: 'Test2'
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
		disableFields: ['autocomplete','button','hidden','header','paragraph','file'],
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
				},
				{
					label: 'Form Name',
					fields: [
						{
						type: 'header',
						subtype: 'h1',
						label: 'Form Name',
						className: 'header',
						},
	
					]
				}
			],
		
		onSave: function(evt,formData){
				const formBuilder = $('#fb-editor').formBuilder('instance');
				const jsonObject = JSON.parse(formData.replace(/\\/g, ''));
				console.log(formData)
				setJsonObject(jsonObject);
				setIsPreviewOpen(true);

				// console.log(ReactDOMServer.renderToString(<FormPreview jsonObject={jsonObject} />))
				// const html = ReactDOMServer.renderToString(<FormPreview jsonObject={jsonObject} />);
				// console.log(html)
				// var formPreviewWindow = window.open('', 'formPreview', 'height=480,width=640,toolbar=no,scrollbars=yes');
				// formPreviewWindow.document.write(html);
				// var style = document.createElement('link');
				// style.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
				// style.setAttribute('rel', 'stylesheet');
				// style.setAttribute('type', 'text/css');
				// console.log(formPreviewWindow)
				// console.log(style)
				// formPreviewWindow.document.head.appendChild(style);
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
		<Container maxWidth="md">
				<div id="fb-editor" ref={fb} />	
				{/* <Modal open={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}> */}
					<Box sx={{ border: 1, borderRadius: 1 }}>
						<FormPreview formData={jsonObject} />
					</Box>
				{/* </Modal> */}
					
		</Container>
	);
}

export default FormCreation;
