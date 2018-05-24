const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 5, max: 200 })) {
    errors.text = "Comment must be between 5 and 200 characters";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
