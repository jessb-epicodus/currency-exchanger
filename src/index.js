import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './js/currency-service.js';

function clearFields() {
  $('#input-USD').val("");
  $('.showResults').text("");
}

$(document).ready(function() {
  $('form#currency-exchanger').submit(function() {
    event.preventDefault();
    const USD = $('#input-USD').val();
    $('#input-USD').val("");
    clearFields();
    let promise = CurrencyService.getCurrency(USD);
    promise.then(function(response) {
      const exchange= JSON.parse(response);
      $('.showResult').text(`${exchange}`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});