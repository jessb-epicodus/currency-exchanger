import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/currency-exchange';

function clearFields() {
  $('#inputUSD').val("");
  $("input:radio[name=newCurrency]").removeAttr("checked");
  $('.showResult').text("");
  $('.showError').text("");
}

function getCurrency(response) {
  // let USD = parseInt($('#inputUSD').val());
  if (response) {
    $('.showResult').text(`${response.conversion_rate} ${response.target_code}`);
  } else {
    $('.showError').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(currency) {
  const response = await CurrencyExchange.getExchange(currency);
  getCurrency(response);
}

$(document).ready(function() {
  $("form#currency-exchanger").submit(function(event) {
    event.preventDefault();
    let currency = $("input:radio[name=newCurrency]:checked").val();
    //If (currency !== 'checked' || !USD > 0) {
    // $(".showError").text("Enter an amount & choose a currency to convert to.") }
    //  else {
    clearFields();
    makeApiCall(currency);
  });
});