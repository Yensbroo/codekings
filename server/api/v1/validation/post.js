const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.body = !isEmpty(data.body) ? data.body : "";


  if (Validator.isEmpty(data.title)) {
    errors.title = "title is required";
  }



  // if (!Validator.isLength(data.body, { min: 10, max: 5000 })) {
  //   errors.body = "Post must be between 10 and 5000 characters";
  // }

  // if (isEmpty(data.body)) {
  //   errors.body = 'Content is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
