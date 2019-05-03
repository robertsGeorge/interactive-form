/***
jQuery used extensively throughout
***/ 

"use strict";

// focus the name text input field on page load
$(function() {
  $('#name').focus();
});
// hide the 'other' job role text area
$('#other-title').hide();
// if 'other' role selected, show #other-title text input 
$('#title').on('change', function() {
  if ( $('#title').val() === 'other' ) {
    $('#other-title').show();
  } else $('#other-title').hide();
});

/* ===========================================
T-shirts section:  
=============================*/
// hide the colors menu until a t-shirt theme is selected
$('#colors-container').hide();
// show only colors that correspond to selected Design theme
$('#design').on('change', function() { 
  switch ( $('#design').val() ) {
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
/* dynamically create & append total cost message
span with class 'js-total' to hold the dynamically updated number value */
const $totalMessage = $(`<p>Total: $<span class="js-total"></span></p>`);
  $('.activities').append($totalMessage);
  $totalMessage.hide();
const $totalSpan = $('.activities .js-total');
let total = 0;
/* vanilla JS selection used to create the following 4 bindings 
  so can use toggleAttribute() method (not available on jQuery objects) */
const frameworks = document.querySelector('[name="js-frameworks"]');
const libs = document.querySelector('[name="js-libs"]');
const express = document.querySelector('[name="express"]');
const node = document.querySelector('[name="node"]');

/* increment amount if checkbox checked, and vice-versa */
function updateTotal(amount) {
  if ( $(event.target).prop('checked') === true ) {
    total += amount;
    $totalSpan.text(total);
  } else {
    total -= amount;
    $totalSpan.text(total);
  }
}

function handleConflict(activity) {
  activity.toggleAttribute('disabled');
  $(activity).parent().toggleClass('js-grey-out'); // switch to jQuery to use its toggleClass method
}

/* listen for changes to checkboxes and show/update the total; 
    also handle conflicting activities by greying-out & disabling */
$('.activities').change(function(event) {
  $totalMessage.show();

  switch ( $(event.target).attr('name') ) {
    case 'all':
      updateTotal(200);
      break;

    case 'build-tools':
      updateTotal(100);
      break;
    
    case 'npm':
      updateTotal(100);
      break;

    case 'js-frameworks':
      updateTotal(100);
      handleConflict(express);
      break; 
    
    case 'express':
      updateTotal(100);
      handleConflict(frameworks);
      break;

    case 'js-libs':
      updateTotal(100);
      handleConflict(node);
      break;

    case 'node':
      updateTotal(100);
      handleConflict(libs);
      break; 
  }

  // hide the total message if user deselects all activity options
  if ( total === 0 ) $totalMessage.hide();
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

function validateAndConditionalFeedback($field, regex, message1, message2) {
  const value = $field.val();
  const test = regex.test(value);
  if (value.length === 0) {
    $field.addClass('js-error');
    $field.prev().show().text(message1); // add error message text to span element already dynamically inserted
    event.preventDefault();
  } else if (!test) {
    $field.addClass('js-error');
    $field.prev().show().text(message2); // add error message text to span element already dynamically inserted
    event.preventDefault();
  } else if (test) {
    $field.removeClass('js-error');
    $field.prev().hide().text('');
  }
}

/* === Realtime input event handlers (outside of, seperate from and additional to the main form submit event handler below) === */
function validateInRealtime($field, regex, message1, message2) {
  $field.on('input', function() {
    validateAndConditionalFeedback($field, regex, message1, message2);
  });
} 

/* this function must be called inside an event handler which provides the event object */
function validateActivities() {
  let activitiesSelected = 0;
  /* loop over each activity checkbox and increment activitiesSelected if checked */
  $('.activities input').each(function() {
    if ( $(this).prop('checked') === true ) {
      activitiesSelected += 1;
    }
  });
  /* if no activities selected, show error message */
  if (activitiesSelected === 0) {
    $('.activities .js-error-message').show().text('Please select at least one activity');
    event.preventDefault();
  } else {
    $('.activities .js-error-message').hide().text('');
  }
}

validateInRealtime(  $('#name'),  /\w+/,  'Please enter a name', 'Please enter a name'  );
validateInRealtime(  $('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter an email address', 'Please enter a valid email address'  );
validateInRealtime(  $('#cc-num'),  /^\d{13,16}$/, 'Please enter a credit card number', 'Please enter a number between 13 and 16 digits long'  );
validateInRealtime(  $('#zip'),  /^\d{5}$/, 'Please enter a zip', 'Enter a number 5 digits long'  );
validateInRealtime(  $('#cvv'),  /^\d{3}$/, 'Please enter a cvv', 'Enter a number 3 digits long'  );

/* run validateActivities() in realtime, 
in response to input on the activity fieldset's checkbox input elements */
$('.activities').on('input', function(event) {
  validateActivities();
});

/* ================== Overall form submit event handler ========================== */
$('form').on('submit', function(event) {
  
  /* ==== Name and email field validation ==== */  
  validateAndFeedback(  $('#name'),  /\w+/,  'Please enter a name'  );
  validateAndConditionalFeedback(  $('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter an email address', 'Please enter a valid email address'  );

  /* ==== Credit Card details validation ==== */  
  if ( $('#payment').val() === 'credit-card' ) {
    validateAndConditionalFeedback(  $('#cc-num'),  /^\d{13,16}$/, 'Please enter a credit card number', 'Please enter a number between 13 and 16 digits long'  );
    validateAndConditionalFeedback(  $('#zip'),  /^\d{5}$/, 'Please enter a zip', 'Enter a number 5 digits long'  );
    validateAndConditionalFeedback(  $('#cvv'),  /^\d{3}$/, 'Please enter a cvv', 'Enter a number 3 digits long'  );
  }

  /* ==== Activities validation ==== */  
  validateActivities();
});




