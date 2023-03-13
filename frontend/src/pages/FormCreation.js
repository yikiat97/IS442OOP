import $ from "jquery";
import FormRender from 'form-render';
import React, { useRef, useEffect } from "react";
import { Button, Container, Grid, Typography,TextField } from '@mui/material';
import '../components/customFields.js';
import renderFormElements from "../components/FormPreview.js";
window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js')


// Define the custom field type
// $.fn.formBuilder.inputFields['canvas'] = {
// 	// Specify the template for the field
// 	field: '<div class="form-group"><label class="form-label"></label><canvas></canvas></div>',

// 	// Define the render function for the field
// 	onRender: function() {
// 		var $field = this;
// 		// Set the canvas dimensions
// 		$field.find('canvas').attr({
// 		width: $field.data('width') || 200,
// 		height: $field.data('height') || 200
// 		});
// 	}
// };

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
		field: '<canvas id="'+fieldData.name+'" width="00" height="00"></canvas>',
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
// to be populated from users in database
const options = {
	
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
	disableFields: ['autocomplete','button','hidden','header','paragraph'],
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


		let formRenderOpts = {
			dataType: 'xml',
			formData:jsonObject
		};
		let $renderContainer = $('<form/>');
		$renderContainer.formRender(formRenderOpts);
		let html = `
			<!doctype html>
				<title>Form Preview</title>
				<body class="container">
					<hr>${$renderContainer.html()}
				</body>
				<footer>
					<div class="panel-footer text-right">
						<button type="button" id="btnSave" class="btn btn-default pull-right">Submit for approval</button>
					</div>
				</footer>
			</html>`;
		var formPreviewWindow = window.open('', 'formPreview', 'height=480,width=640,toolbar=no,scrollbars=yes');
	
		formPreviewWindow.document.write(html);
		var style = document.createElement('link');
		style.setAttribute('href', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		formPreviewWindow.document.head.appendChild(style);
		}
	};


const FormCreation = () => {
	const fb = useRef(null);

	useEffect(() => {
		// const canvasField = {
		// 	name: 'canvas',
		// 	label: 'Canvas',
		// 	category: 'Basic',
		// 	icon: 'fa fa-pencil',
		// 	fieldRender: function (options) {
		// 		return '<canvas id="' + options.name + '"></canvas>';
		// 	},
		// 	onRender: function (options) {
		// 		var canvas = $('#' + options.name);
		// 		canvas.attr('width', options.canvasWidth || 200);
		// 		canvas.attr('height', options.canvasHeight || 200);
		// 	},
		// };

		// $.fn.formBuilder.inputFields['canvas'] = canvasField;
		function canvasField(data) {
			var field = this;
			var canvasId = data.canvasId || 'canvas-' + data.field_id;
			var canvasWidth = data.canvasWidth || 300;
			var canvasHeight = data.canvasHeight || 150;
	  
			var container = document.createElement('div');
			container.className = 'form-group';
	  
			var label = document.createElement('label');
			label.innerText = data.label;
			label.setAttribute('for', canvasId);
			container.appendChild(label);
	  
			var canvas = document.createElement('canvas');
			canvas.setAttribute('id', canvasId);
			canvas.setAttribute('width', canvasWidth);
			canvas.setAttribute('height', canvasHeight);
			container.appendChild(canvas);
	  
			field.el = container;
			field.canvas = canvas;
			field.canvasId = canvasId;
		  }
		$(fb.current).formBuilder({
			// fields: [
			// 	{
			// 	  type: 'canvas',
			// 	  label: 'Canvas',
			// 	  subtype: '',
			// 	  required: false,
			// 	  id: 'canvas-1',
			// 	  className: 'canvas-field'
			// 	}
			//   ],
			// fields:[canvasField],
			// templates,
			// fields: [
			// 	{
			// 	  type: 'canvas',
			// 	  label: 'Canvas',
			// 	  canvasId: 'my-canvas',
			// 	  canvasWidth: 400,
			// 	  canvasHeight: 200
			// 	},
			// 	{
			// 	  type: 'text',
			// 	  label: 'Text Field'
			// 	}
			//   ],
			fields,
			templates,
			formData,
			...options
		});
		}, [formData]);


	return (
		<Container maxWidth="md">
				<div id="fb-editor" ref={fb} />			
			{/* <Button variant="contained">Add Section</Button> */}

		</Container>
	);
}

export default FormCreation;
