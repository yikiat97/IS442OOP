
function renderFormElements(formElements) {
return (
    <div>
    {formElements.map((element, index) => {
            switch (element.type) {
            case 'header':
                const HeaderTag = `h${element.subtype.slice(-1)}`;
                return <HeaderTag key={index}>{element.label}</HeaderTag>;
            case 'radio-group':
                return (
                <div key={index}>
                    <label>{element.label}</label>
                    {element.values.map((value, i) => (
                    <div key={i}>
                        <input
                        type="radio"
                        name={element.name}
                        value={value.value}
                        checked={value.selected}
                        disabled={element.access}
                        />
                        <label>{value.label}</label>
                    </div>
                    ))}
                </div>
                );
            case 'select':
                return (
                <div key={index}>
                    <label>{element.label}</label>
                    <select
                    name={element.name}
                    className={element.className}
                    multiple={element.multiple}
                    disabled={element.access}
                    >
                    {element.values.map((value, i) => (
                        <option key={i} value={value.value} selected={value.selected}>
                        {value.label}
                        </option>
                    ))}
                    </select>
                </div>
                );
            case 'textarea':
                return (
                <div key={index}>
                    <label>{element.label}</label>
                    <textarea
                    name={element.name}
                    className={element.className}
                    disabled={element.access}
                    ></textarea>
                </div>
                );
            default:
                return null;
            }
        })}
        </div>
    );
}

export default renderFormElements