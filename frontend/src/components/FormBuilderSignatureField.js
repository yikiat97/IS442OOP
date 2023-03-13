class FormBuilderSignatureField extends FormBuilderInputField {
    constructor(fieldData) {
        super(fieldData);
        this.signature = null;
    }

    setValue(value) {
        this.signature = value;
    }

    getValue() {
        return this.signature;
    }

    template() {
        return `<div class="form-group">
                    <label for="${this.id}">${this.label}</label>
                    <div>
                        <canvas id="${this.id}-canvas" class="form-control" style="height: 150px;"></canvas>
                        <input type="hidden" name="${this.name}" id="${this.id}" value="">
                    </div>
                </div>`;
    }
}