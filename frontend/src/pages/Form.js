import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
import Container from '@mui/material/Container';

window.jQuery = $;
window.$ = $;
require("jquery-ui-sortable");
require("formBuilder");

const formData = [
	{
		type: "header",
		subtype: "h1",
		label: "formBuilder in React"
	},
	{
		type: "paragraph",
		label: "This is a demonstration of formBuilder running in a React project."
	}
];
class Form extends Component {
	fb = createRef();
	componentDidMount() {
		$(this.fb.current).formBuilder({ formData });
	}


	render() {
		return (
			<Container maxWidth="md">
				<div id="fb-editor" ref={this.fb} />
			</Container>
		);
	}
}
export default Form;