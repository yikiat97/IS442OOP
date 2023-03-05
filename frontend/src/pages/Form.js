import $ from "jquery";
import FormRender from 'form-render';
import React, { useRef, useEffect } from "react";
import { Button, Container, Grid, Typography,TextField } from '@mui/material';

window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");
require('formBuilder/dist/form-render.min.js')
const formData = [
	{
		type: "header",
		subtype: "h1",
		label: "formBuilder in React",
	}
];

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
	disableFields: ['autocomplete','button','Hidden Input'],

	// To send the jsonData over to backend
	
	
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
					<h1>Form Name</h1><hr>${$renderContainer.html()}
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


const Form = () => {
	const fb = useRef(null);

	useEffect(() => {
		let fields = [
		{
			type: 'signature',
			required: true,
			label: 'Signature',
			name: 'signature-1',
		}];
		let templates = {
			signature: function(fieldData) {
				return {
					field: '<div class="signature-field"><label>' + fieldData.label + '</label><div id="' + fieldData.name + '" class="' + fieldData.className + '"></div></div>',
					onRender: function() {
						$(document.getElementById(fieldData.name)).jSignature();
					}
					};
				}
		};

		$(fb.current).formBuilder({
			fields,
			templates,
			...options
		});
		}, [formData]);


	return (
		<Container maxWidth="md">
			<TextField id="outlined-basic"  label="Form Name" variant="outlined" />
			<div id="fb-editor" ref={fb} />			
			{/* <Button variant="contained">Add Section</Button> */}

		</Container>
	);
}

export default Form;
