// A user should be able to enter an amount (in U.S. dollars) and then specify another currency (such as the South Korean won). The user should then see the total amount they entered in converted currency. In the example above, a user might enter 10 dollars and then see that amount in South Korean won.
// Users should be able to convert U.S. currency into at least 5 other types of currency.
// If the API call results in an error (any message not a 200 OK), the application should return a notification to the user that states what the error is. (That means the error should show up in the DOM, not in the console.)
// If the query response doesn't include that particular currency, the application should return a notification that states the currency in question doesn't exist. (Note: Even if you use a dropdown menu to specify currencies instead of a form field, you'll still need to add this functionality to your code.)
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-exchange';

function clearFields() {
  $('#inputUSD').val("");
  $("#newCurrency").val("");
  $('.showResults').text("");
  $('.showError').text("");
}

$(document).ready(function() {
  $("form#currency-exchanger").submit(function(event) {
    event.preventDefault();
    const USD = parseInt($('#inputUSD').val());
    const currencyArray = $("#newCurrency").val();
    let currency = currencyArray.toString();
    clearFields();

    if (USD < 0)
      return $(".showResult").text("Enter a positive amount");
    if (currency === "null")
      return $(".showResult").text("Choose a currency");

// "target_code": "GBP",
// "conversion_rate": 0.8412
// if target_code = value then USD * conversion_rate

    let promise = CurrencyExchange.getCurrency(currency);
    promise.then(function(response) {
      const results = JSON.parse(response);
      let USD = parseInt($('#inputUSD').val());
      $('.showResult').text(`(${Math.round(results.conversion_rate * USD)}`);
      $('.showError').text("");
    }, function(error) {
      $('.showError').text(`There was an error: ${error}`);
    });
  });
});

// if (error === "unsupported-code") {
//   $('.showError').text("Choose a currency from the provided list");
// } else if (error === "invalid-key" ||  error === "inactive-account") {
//   $('.showError').text("Follow instructions for obtaining a valid API key");
// } else if (error === "quota-reached" ||  error === "quota-reached") {
//   $('.showError').text("See documentation for directions & limitations using this API");
// } else {}