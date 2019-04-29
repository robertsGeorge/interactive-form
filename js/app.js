
/***
jQuery used throughout. No plain JavaScript.

***/ 


"use strict";

// put focus on the name text input field on page load
$(function() {
  $('#name').focus();
});


// hide the 'other' job role text area
$('#other-title').hide();



// if 'other' role selected, show #other-title text input, else hide 
$('#title').on('change', function() {
  if ( $('#title').val() === 'other' ) {
    $('#other-title').show();
  } else $('#other-title').hide();
});


/* ===========================================
T-shirts section: show only colors that correspond to selected Design theme 
=============================*/

// for exceeds expectations grade, hide the colors menu until a t-shirt theme is selected
$('#colors-container').hide();


// listen for change on #design
  // if value = Select Theme, hide color menu
  // if value = js puns, hide I love JS options
  // else if value = I love JS, hide JS puns options
$('#design').on('change', function() {
  
  switch (  $('#design').val()  ) {
    
    case "Select Theme":
      $('#colors-container').hide();
      break;
    case "js puns":
      $('#colors-container').show();
      $('#color option').hide();
      $(`
        [value="cornflowerblue"], 
        [value="darkslategrey"], 
        [value="gold"]
        `).show();
      $('#color').val('cornflowerblue'); // set initial option displayed
      break;
    case "heart js":
      $('#colors-container').show();
      $('#color option').hide();  
      $(`
        [value="tomato"],
        [value="steelblue"],
        [value="dimgrey"]
        `).show();
      $('#color').val('tomato'); // set initial option displayed
      break;
  } 
});



/* ===========================================
Activities section: 
=============================*/

//disable conflicting checkboxes
// strike-through their text

/////conflicts:
    // Frameworks WS & Express WS
    // Libraries WS & Node WS

$('.activities').change(function(event) {
  
  switch (  $(event.target).attr('name')  ) {
    case 'js-frameworks':
      $('[name="express"]').attr('disabled', 'true');
      break; 
    case 'express':
      $('[name="js-frameworks"]').attr('disabled', 'true');
      break; 
    case 'js-libs':
      $('[name="node"]').attr('disabled', 'true');
      break; 
    case 'node':
      $('[name="js-libs"]').attr('disabled', 'true');
      break; 
  }

  // if ( $(this).attr('name') === 'js-frameworks' ) $('[name="express"]').attr('disabled');  
  // if ( $(this).attr('name') === 'express' ) $('[name=js-frameworks]').attr('disabled');


});