const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.image = !isEmpty(data.image) ? data.image : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.body = !isEmpty(data.body) ? data.body : "";


  if (Validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = "A header is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "You have to choose a category";
  }

  if (Validator.isEmpty(data.body)) {
    errors.body = 'Content is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
