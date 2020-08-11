const Validator = require('validator');

module.exports = function validateBet(data) {
  let errors = {};

  data.amount_bet = data.amount_bet ? data.amount_bet : '';
  
  // Check to see that amount_bet is not null.
  if (Validator.isEmpty(data.amount_bet)) {
    errors.amount_bet = 'Amount bet field is required';
  }

  // Check to see that amount_bet is an integer.
  if (!Validator.isInt(data.amount_bet)) {
    errors.amount_bet = 'Amount bet field must be an integer';
  }

  // Chceck to see if amount_bet is zero. 
  if (data.amount_bet === "0") {
    errors.amount_bet = 'Amount bet must be non-zero.'
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}