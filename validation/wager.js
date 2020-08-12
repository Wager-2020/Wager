const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateWager(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  data.description = validText(data.description) ? data.description : '';
  data.karma_points = data.karma_points ? data.karma_points : null;
  data.due_date = data.due_date ? data.due_date : null;
  data.wager_choices = data.wager_choices ? JSON.parse(data.wager_choices) : [];

  // Check to see that title is not null.
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  
  // debugger;

  // Check to see that description is not null.
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  // debugger;
  
  // Check to see that karma_points is not null.
  if (!data.karma_points) {
    errors.karma_points = 'Karma points field is required';
  }

  // debugger;

  // Check to see that karma_points is an integer.
  if (!Validator.isInt(String(data.karma_points))) {
    errors.karma_points = 'Karma points field must be an integer';
  }

  // debugger;

  // potentially needs a { format: 'yyyy-dd-mm hh:mm' } option 
  if (data.due_date && !Validator.isDate(data.due_date)) {
    errors.due_date = 'Due date field is required';
  }

  // debugger;

  // Checks to see there are at least two options. 
  if (data.wager_choices.length < 2) {
    errors.wager_choices = 'Wager choices must have more than two options';
  }

  // debugger;

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}