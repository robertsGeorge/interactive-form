# Interactive Form

## About this project
With this project I learnt jQuery and Regular Expressions and applied them to build dynamic interactivity and validation into a HTML registration form. <br><br>
Validation is applied in realtime as user input events are registered.<br><br>
Error messages displayed update in realtime conditionally according to the error (e.g. field is blank, or entry isn't of the write length).<br><br>
This was all coded from scratch: no in-built or automatic validation was used, and no pre-written regexs were used.
<br><br>
### What unobtrusive interactivity has been included?
* Name field focuses on page load
* Job role "Other" text input field is hidden (until selected)
* T-Shirt colour drop-down is hidden until a theme is selected; plus colour options unrelated to selected theme are hidden
* Activities that conflict with a selection are disabled and greyed-out
* A running total cost of activities selected appears and updates in realtime
* Credit card payment option is dynamically selected by default and other options info is hidden
<br><br>
### What conditional and realtime validation has been applied?
* Validation is applied in both realtime and on final form submit to name, email, activities (1 must be selected) and credit card details
  * Realtime error indicators (border colour) are applied as user makes changes to the input value (e.g. while typing)
  * Conditional error messages are displayed in realtime, depending on the error, as follows:
    * Credit card number, zip code and CVV: 
      * 'Please enter a credit card number / zip code / cvv'
      * 'Please enter a number x digits long'
      * 'No spaces please'
<br><br>

## Principles applied
* Progressive Enhancement
* Unobtrusive JavaScript (jQuery): dynamically adding functionality in accordance with principle of Progressive Enhancement
* DRY: spotting repeating patterns and replacing them with functions that accept parameters to deal with variables within the patterns

## Skills demonstrated
* jQuery (for majority of the code), including use of looping over collections of jQuery objects, and methods such as .each()
* Regular Expressions: custom writing these to handle name, email and credit card validation
* DOM selection, traversal, manipulation and insertion
* Event handling - delegation, progagation, use of the Event Object, preventDefault()
* Conditional statements, including use of a switch statement
* CSS cosmetics - font-selection, colours
* CSS classes to style error indicators - dynamically toggling these using jQuery
* git / GitHub: full commit history and use of branches to build incremental features, test them then merge back into master


