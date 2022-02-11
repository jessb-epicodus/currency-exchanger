// A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency. In the example above, a user might enter 10 dollars and then see that amount in South Korean won.
// Users should be able to convert U.S. currency into at least 5 other types of currency.
// If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
// If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service.js';

function clearFields() {
  $('#input-USD').val("");
  $('.showResults').text("");
  $('.showError').text("");
}

$(document).ready(function() {
  $('form#currency-exchanger').submit(function(event) {
    event.preventDefault();
    let USD = $('#input-USD').val();
    if (USD === "")
      return $("#showResult").text("Enter an amount");
    let currency = $("#newCurrency").val();
    if (currency === "null")
      return $("#showResult").text("Choose a currency");
    $('#input-USD').val("");

    clearFields();
    let promise = CurrencyService.getCurrency(USD, currency);
    promise.then(function(response) {
      const exchange = JSON.parse(response);
      $('.showResult').text(`Math.round(${exchange.conversion_rate})`);
    }, function(error) {
      $('.showErrors').text(`There was an error: ${error}`);
    });
  });
});