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
/* disable conflicting activity checkbox and grey-out its parent label */
function handleConflict(activity) {
  activity.toggleAttribute('disabled');
  $(activity).parent().toggleClass('js-grey-out'); // switch to jQuery to use its toggleClass method
}

/* use event delegation to listen on the parent for changes to checkboxes
 and show/update the total, then handle conflicting activities */
$('.activities').change(function(event) {
  $totalMessage.show();
  switch ( $(event.target).attr('name') ) { // match the checkbox that triggered the event by its name attribute value 
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

/* Listen on the parent <select> element for changes to the option selected;
show the selected option and hide the others */
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
/* insert a span (error message placeholder) with class js-error-message
 before each input (jQuery auto-loops over input collection) that has a previous sibling */
$('input').prev().after(`<span class="js-error-message"></span>`);
/* insert a span (error message placeholder) with class js-error-message 
after the activities section <legend> element */
$('.activities legend').after(`<span class="js-error-message"></span>`);
/* Hide all the spans that were just inserted */
$('.js-error-message').hide(); 

/* prevent chrome's automatic form validation */
$('form').attr('novalidate', 'true');


/* accept an input field, a regex and a message and validate the field, 
providing conditional feedback by apply error style and 
showing error span with error message inserted */
function validateAndConditionalFeedback($field, regex1, message1, message2, regex2, message3) {
  const value = $field.val();
  const test1 = regex1.test(value);
  function applyError(message) {
    $field.addClass('js-error');
    $field.prev().show().text(message); // add error message text to span element already dynamically inserted
    event.preventDefault();
  }
  if (value.length === 0) { 
    applyError(message1);
  } else if (!test1) {
    if (regex2) {
      const test2 = regex2.test(value);
      if (test2) {
        applyError(message3);
      } else {
        applyError(message2);
      }
    } else { 
      applyError(message2);
    }
  } else if (test1) {
    $field.removeClass('js-error');
    $field.prev().hide().text('');
  }
}
/* Add realtime encasing to validateAndConditionalFeedback(), responding to 
realtime input events on the field element passed in */
function validateInRealtime($field, regex, message1, message2, regex2, message3) {
  $field.on('input', function() {
    validateAndConditionalFeedback($field, regex, message1, message2, regex2, message3);
  });
} 
/* validate the name, email, and credit card fields in realtime */
validateInRealtime(  $('#name'),  /\w+/,  'Please enter a name', 'Please enter a name'  ); // intentional repetition of string argument
validateInRealtime(  $('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter an email address', 'Please enter a valid email address'  );
validateInRealtime(  $('#cc-num'),  /^\d{13,16}$/, 'Please enter a credit card number', 'Please enter a number between 13 and 16 digits long', /\s+/, 'No spaces please'  );
validateInRealtime(  $('#zip'),  /^\d{5}$/, 'Please enter a zip', 'Enter a number 5 digits long', /\s+/, 'No spaces please'  );
validateInRealtime(  $('#cvv'),  /^\d{3}$/, 'Please enter a cvv', 'Enter a number 3 digits long', /\s+/, 'No spaces please'  );

/* Function to validate that at least one activity has been checked.
this function must be called inside an event handler which provides the event object */
function validateActivities() {
  let activitiesChecked = 0;
  /* loop over each input checkbox and increment/decrement activitiesChecked if checked/unchecked */
  $('.activities input').each(function() {
    if ( $(this).prop('checked') === true ) {
      activitiesChecked += 1;
    }
  });
  /* if no activities checked, show error message */
  if (activitiesChecked === 0) {
    $('.activities .js-error-message').show().text('Please select at least one activity');
    event.preventDefault();
  } else {
    $('.activities .js-error-message').hide().text('');
  }
}
/* run validateActivities() in realtime, 
in response to input events on the checkbox children of fieldset element with class 'activities'
(possible because events on the children bubble up to the fieldset element) */
$('.activities').on('input', function(event) {
  validateActivities();
});

/* also run validate when an overall form submit event is triggered 
(e.g. user clicks the register button)  */
$('form').on('submit', function(event) {
  /* Name, email and activities validation */  
  validateAndConditionalFeedback(  $('#name'),  /\w+/,  'Please enter a name', 'Please enter a name'  ); // intentional repetition of string argument
  validateAndConditionalFeedback(  $('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i, 'Please enter an email address', 'Please enter a valid email address'  );
  validateActivities();
  /* Credit Card details validation - only if payment option selected is credit-card */  
  if ( $('#payment').val() === 'credit-card' ) {
    validateAndConditionalFeedback(  $('#cc-num'),  /^\d{13,16}$/, 'Please enter a credit card number', 'Please enter a number between 13 and 16 digits long', /\s+/, 'No spaces please'  );
    validateAndConditionalFeedback(  $('#zip'),  /^\d{5}$/, 'Please enter a zip', 'Enter a number 5 digits long', /\s+/, 'No spaces please'  );
    validateAndConditionalFeedback(  $('#cvv'),  /^\d{3}$/, 'Please enter a cvv', 'Enter a number 3 digits long', /\s+/, 'No spaces please'  );
  }
});




