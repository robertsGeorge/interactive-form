
/***
Mostly jQuery + occasional vanilla JavaScript

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

// dynamically create running total display element:
let amount = 0;
const $totalMessage = $(`<p>Total: $${amount} </p>`);
$('.activities').append($totalMessage);
$totalMessage.hide();

//disable conflicting activities' checkboxes and line-through their label's textcontent:
    // Frameworks conflicts w/ Express
    // Libs WS conflicts w/ Node
$('.activities').change(function(event) {
  const frameworks = document.querySelector('[name="js-frameworks"]');
  const libs = document.querySelector('[name="js-libs"]');
  const express = document.querySelector('[name="express"]');
  const node = document.querySelector('[name="node"]');

  switch (  $(event.target).attr('name')  ) {
    
    case 'all':
      amount += 200; // amount is not updating
      $totalMessage.toggle();
      break;

    case 'build-tools':
      // code here
      break;
    
    case 'npm':
      // code here
      break;

    case 'js-frameworks':
      express.toggleAttribute('disabled');
      if (express.parentElement.style.textDecorationLine === 'line-through' ) {
        express.parentElement.style.textDecorationLine = 'none';
      } else {
        express.parentElement.style.textDecorationLine = 'line-through';
      }
      break; 
    
    case 'express':
      frameworks.toggleAttribute('disabled');
      if (frameworks.parentElement.style.textDecorationLine === 'line-through' ) {
        frameworks.parentElement.style.textDecorationLine = 'none';
      } else {
        frameworks.parentElement.style.textDecorationLine = 'line-through';
      }
      break;

    case 'js-libs':
      node.toggleAttribute('disabled');
      if (node.parentElement.style.textDecorationLine === 'line-through' ) {
        node.parentElement.style.textDecorationLine = 'none';
      } else {
        node.parentElement.style.textDecorationLine = 'line-through';
      }
      break;

    case 'node':
      libs.toggleAttribute('disabled');
      if (libs.parentElement.style.textDecorationLine === 'line-through' ) {
        libs.parentElement.style.textDecorationLine = 'none';
      } else {
        libs.parentElement.style.textDecorationLine = 'line-through';
      }
      break; 
  }

  // if ( $(this).attr('name') === 'js-frameworks' ) $('[name="express"]').attr('disabled');  
  // if ( $(this).attr('name') === 'express' ) $('[name=js-frameworks]').attr('disabled');


});




/* switch (  $(event.target).attr('name')  ) {
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
} */