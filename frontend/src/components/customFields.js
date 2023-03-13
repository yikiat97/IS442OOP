// customFields.js
import $ from 'jquery';
// import '../../public/scripts/form-builder';

// Wait for the form builder to initialize before defining the custom field type
$(document).ready(() => {
  // Define the custom field type using the addFieldType method
  $.formBuilder.inputBox.addClass('canvas', {
    // Specify the template for the field
    template: '<div class="form-group"><label class="form-label"></label><canvas></canvas></div>',

    // Define the render function for the field
    render: function() {
      var $field = this;
      // Set the canvas dimensions
      $field.find('canvas').attr({
        width: $field.data('width') || 200,
        height: $field.data('height') || 200
      });
    }
  });
});




