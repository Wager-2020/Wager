const Validator = require('validator');

module.exports = function validateBet(data) {
  let errors = {};

  data.amount_bet = data.amount_bet ? data.amount_bet : '';
  data.option = data.option ? data.option : '';
  
  // // Check to see that amount_bet is not null.
  // if (Validator.isEmpty(String(data.amount_bet))) {
  //   errors.amount_bet = 'Amount bet field is required';
  // }

  // debugger;

  // Check to see that amount_bet is an integer.
  if (!Validator.isEmpty(String(data.amount_bet)) && !Validator.isInt(String(data.amount_bet))) {
    errors.amount_bet = 'Amount bet field must be an integer';
  }

  // debugger;

  // Check to see if amount_bet is zero. 
  if (String(data.amount_bet) === "0") {
    errors.amount_bet = 'Amount bet must be non-zero.'
  }

  if (Validator.isEmpty(data.option)) {
    errors.option = 'Option field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}