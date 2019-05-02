
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
const $totalMessage = $(`<p>Total: $<span class="js-total"></span></p>`);
$('.activities').append($totalMessage);
$totalMessage.hide();


//disable conflicting activities' checkboxes and line-through their label's textcontent:
    // Frameworks conflicts w/ Express
    // Libs WS conflicts w/ Node
$('.activities').change(function(event) {
  // vanilla JS selection used so can use toggleAttribute() method (not available on jQuery objects)
  const frameworks = document.querySelector('[name="js-frameworks"]');
  const libs = document.querySelector('[name="js-libs"]');
  const express = document.querySelector('[name="express"]');
  const node = document.querySelector('[name="node"]');

  $totalMessage.show();

  
  switch (  $(event.target).attr('name')  ) {
    
    case 'all':
      if ( $(event.target).prop('checked') === true ) {
        amount += 200;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 200;
        $('.activities .js-total').text(amount);
      }
      break;


    case 'build-tools':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 100;
        $('.activities .js-total').text(amount);
      }
      break;
    

    case 'npm':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 100;
        $('.activities .js-total').text(amount);
      }
      break;


    case 'js-frameworks':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(`${amount}`);
      } else {
        amount -= 100;
        $('.activities .js-total').text(`${amount}`);
      }
      // disable conflicting activity
      express.toggleAttribute('disabled');
      $('[name="express"]').parent().toggleClass('js-grey-out');
      break; 
    

    case 'express':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 100;
        $('.activities .js-total').text(amount);
      }

      frameworks.toggleAttribute('disabled');
      $('[name="js-frameworks"]').parent().toggleClass('js-grey-out');
      break;


    case 'js-libs':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 100;
        $('.activities .js-total').text(amount);
      }

      node.toggleAttribute('disabled');
      $('[name="node"]').parent().toggleClass('js-grey-out');
      break;


    case 'node':
      if ( $(event.target).prop('checked') === true ) {
        amount += 100;
        $('.activities .js-total').text(amount);
      } else {
        amount -= 100;
        $('.activities .js-total').text(amount);
      }

      libs.toggleAttribute('disabled');
      $('[name="js-libs"]').parent().toggleClass('js-grey-out');
      break; 
  }

  // hide the running total is user deselects all activity options
  if ( amount === 0 ) $totalMessage.hide();
  

});


/* ===========================================
Payment section: 
=============================*/

// disable 'select method' option (user should not be able to submit form w/o payment method)
$('[value="select_method"]').attr('disabled', true);
// select credit card method by default on page load
$('#payment').val('credit-card');
// hide the paypal and bitcoin details on page load
$('#paypal, #bitcoin').hide();


// can't listen on each option element because there is no event to listen for?
// use event delegation to respond to events on option child elements
$('#payment').change(function() {
  if ( $('#payment').val() === 'credit-card' ) {
    $('#credit-card').show();
    $('#paypal, #bitcoin').hide();
  } else if ( $('#payment').val() === 'paypal' ) {
    $('#paypal').show();
    $('#credit-card, #bitcoin').hide();
  } else if ( $('#payment').val() === 'bitcoin' ) {
    $('#bitcoin').show();
    $('#credit-card, #paypal').hide();
  }

});


/* ===========================================
Validation
============================= */

/* insert a span (error message placeholder) before each input (jQuery auto-loops over collection)
except if there is no prev() sibling before the input (e.g. with the activity checkboxes) */
$('input').prev().after(`<span class="js-error-message"></span>`);
$('.activities legend').after(`<span class="js-error-message"></span>`);
/* Hide all the spans that were just inserted */
$('.js-error-message').hide(); 

/* prevent chrome's automatic form validation */
$('form').attr('novalidate', 'true');


/* Form submit event handler */
$('form').on('submit', function(event) {
  
  function validateAndFeedback($field, regex, message) {
    const value = $field.val();
    if ( ! regex.test(value) ) {
      $field.addClass('js-error');
      $field.prev().show().text(message); // add error message text to span element already dynamically inserted
      event.preventDefault();
    } else {
      $field.removeClass('js-error');
      $field.prev().hide().text('');      
    }
  }
  /* ==== Name and email field validation ==== */  
  validateAndFeedback(  $('#name'),  /\w+/,  'Please enter a name (field cannot be blank)'  );
  validateAndFeedback(  $('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter a valid email address'  );

  /* ==== Credit Card details validation ==== */  
  if ( $('#payment').val() === 'credit-card' ) {
    validateAndFeedback(  $('#cc-num'),  /^\d{13,16}$/,  'Please enter a number between 13 and 16 digits long'  );
    validateAndFeedback(  $('#zip'),  /^\d{5}$/,  'Enter a number 5 digits long'  );
    validateAndFeedback(  $('#cvv'),  /^\d{3}$/,  'Enter a number 3 digits long'  );
  }


  /* ==== Activities validation ==== */  
  let activitiesSelected = 0;
  /* loop over each activity checkbox and increment activitiesSelected if checked */
  $('.activities input').each(function() {
    if ( $(this).prop('checked') === true ) {
      activitiesSelected += 1;
    }
  });
  /* If no activites have been selected... */
  if (activitiesSelected === 0) {
    $('.activities .js-error-message').show().text('Please select at least one activity');
    event.preventDefault();
  } else {
    $('.activities .js-error-message').hide().text('');
  }
});



