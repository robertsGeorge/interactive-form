
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

// hide all color options on page load and show only message "Please select a T-Shirt theme"
$('#color option').hide();

// listen for change on #design
  // if value = "Select Theme", hide all options
  // if value = "js puns", hide I love JS options
  // else if value = I love JS, hide JS puns options
$('#design').on('change', function() {
  
  switch (  $('#design').val()  ) {
    case "Select Theme":
      $('#color option').hide(); 
      $('#color').val('Please select a T-shirt theme');
      break;

    case "js puns":
      $('#color option').hide();
      $('option[value="cornflowerblue"]').show();
      $('option[value="darkslategrey"]').show();
      $('option[value="gold"]').show();
      $('#color').val('cornflowerblue'); // set what option is initially selected & displayed
      break;

    case "heart js":
      $('#color option').hide();  
      $('option[value="tomato"]').show();
      $('option[value="steelblue"]').show();
      $('option[value="dimgrey"]').show();
      $('#color').val('tomato'); // set what option is initially selected & displayed
      break;
  } 
});