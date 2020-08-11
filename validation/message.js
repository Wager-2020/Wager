const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMessage(data) {
  let errors = {};

  data.body = validText(data.body) ? data.body : '';

  if (Validator.isEmpty(data.body)) {
    errors.handle = 'A message cannot be empty.';
  }

}