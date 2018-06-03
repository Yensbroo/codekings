const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUserInput(data) {
  let errors = {};

  data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";


  // if (Validator.equals(data.oldPassword, data.newPassword)) {
  //   errors.newPassword = "Your new password can not be the same as your old password";
  // }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Password must be at least 6 characters long";
  }

  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
