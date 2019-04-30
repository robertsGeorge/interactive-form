
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
const $totalMessage = $(`<p>Total: $<span></span></p>`);
$('.activities').append($totalMessage);
// $totalMessage.hide();

//disable conflicting activities' checkboxes and line-through their label's textcontent:
    // Frameworks conflicts w/ Express
    // Libs WS conflicts w/ Node
$('.activities').change(function(event) {
  // vanilla JS selection used so can use toggleAttribute() method (not available on jQuery objects)
  const frameworks = document.querySelector('[name="js-frameworks"]');
  const libs = document.querySelector('[name="js-libs"]');
  const express = document.querySelector('[name="express"]');
  const node = document.querySelector('[name="node"]');

  
  switch (  $(event.target).attr('name')  ) {
    
    case 'all':
      if ( $(event.target).prop('checked') === true ) {
        amount += 200;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 200;
        $('.activities span').text(`${amount}`);
      }
      break;


    case 'build-tools':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }
      break;
    

    case 'npm':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }
      break;


    case 'js-frameworks':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }
      // disable conflicting activity
      express.toggleAttribute('disabled');
      $('[name="express"]').parent().toggleClass('js-greyed-out');
      break; 
    

    case 'express':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }

      frameworks.toggleAttribute('disabled');
      $('[name="js-frameworks"]').parent().toggleClass('js-greyed-out');
      break;


    case 'js-libs':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }

      node.toggleAttribute('disabled');
      $('[name="node"]').parent().toggleClass('js-greyed-out');
      break;


    case 'node':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities span').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities span').text(`${amount}`);
      }

      libs.toggleAttribute('disabled');
      $('[name="js-libs"]').parent().toggleClass('js-greyed-out');
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