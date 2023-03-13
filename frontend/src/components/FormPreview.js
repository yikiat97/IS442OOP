import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Button } from "@mui/material";
window.jQuery = $;
window.$ = $;
require("formBuilder");
require('formBuilder/dist/form-render.min.js')

// const FormPreview = ({ jsonObject }) => {
    // const [html, setHtml] = useState("");
    // console.log(jsonObject)
    // useEffect(() => {
    // const formRenderOpts = {
    //     dataType: "xml",
    //     formData: jsonObject,
    // };


    
    // const $renderContainer = $("<form/>");
    // $renderContainer.formRender(formRenderOpts);
    // const newHtml = `
	// 		<!doctype html>
	// 			<title>Form Preview</title>
    //             <script src="https://formbuilder.online/assets/js/form-builder.min.js"></script>
	// 			<body class="container">
	// 				<hr>${$renderContainer.html()}
	// 			</body>
	// 			<footer>
	// 				<div class="panel-footer text-right">
	// 					<button type="button" id="btnSave" class="btn btn-default pull-right">Submit for approval</button>
	// 				</div>
	// 			</footer>
	// 		</html>`;
    // setHtml(newHtml);
// }, [jsonObject]);

//     return (
//         <div dangerouslySetInnerHTML={{ __html: html }} />
//     );
// };

const FormPreview = ({ formData }) => {
    if (!formData) {
        return null;
    }
    const renderField = (field) => {
        switch (field.type) {
        case "header":
            return <h1>{field.label}</h1>;
        case "checkbox-group":
            return (
            <div>
                <label>{field.label}</label>
                {field.values.map((value, index) => (
                <div key={index}>
                    <input
                    type="checkbox"
                    id={`${field.name}-${index}`}
                    name={field.name}
                    value={value.value}
                    checked={value.selected}
                    />
                    <label htmlFor={`${field.name}-${index}`}>{value.label}</label>
                </div>
                ))}
            </div>
            );
        case "date":
            return (
            <div>
                <label>{field.label}</label>
                <input
                type="date"
                className={field.className}
                name={field.name}
                />
            </div>
            );
        case "number":
            return (
            <div>
                <label>{field.label}</label>
                <input
                type="number"
                className={field.className}
                name={field.name}
                />
            </div>
            );
        case "radio-group":
            return (
            <div>
                <label>{field.label}</label>
                {field.values.map((value, index) => (
                <div key={index}>
                    <input
                    type="radio"
                    id={`${field.name}-${index}`}
                    name={field.name}
                    value={value.value}
                    checked={value.selected}
                    />
                    <label htmlFor={`${field.name}-${index}`}>{value.label}</label>
                </div>
                ))}
            </div>
            );
        case "select":
            return (
            <div>
                <label>{field.label}</label>
                <select
                className={field.className}
                name={field.name}
                multiple={field.multiple}
                >
                {field.values.map((value, index) => (
                    <option
                    key={index}
                    value={value.value}
                    selected={value.selected}
                    >
                    {value.label}
                    </option>
                ))}
                </select>
            </div>
            );
        case "text":
            return (
            <div>
                <label>{field.label}</label>
                <input
                type="text"
                className={field.className}
                name={field.name}
                />
            </div>
            );
        case "textarea":
            return (
            <div>
                <label>{field.label}</label>
                <textarea
                className={field.className}
                name={field.name}
                rows={field.rows}
                cols={field.cols}
                />
            </div>
            );
        case "canvas":
            return <canvas name={field.name}></canvas>;
        default:
            return null;
        }
    };

    return (
        <div>
            <form>
                {formData.map((field, index) => (
                    <div key={index}>
                        {field.subtype ? (
                            renderField({ ...field, type: field.subtype })
                        ) : (
                            <div className={field.className}>
                                {field.label && renderField(field)}
                            </div>
                        )}
                    </div>
                ))}
            </form>
        </div>
    );
};
export default FormPreview;
