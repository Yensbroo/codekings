const PassReset = require("../models/PassReset");
const randomize = require("randomatic");
const User = require("../models/User");
const send = require('../utilities/email_sender').send_email;
const bcrypt = require('bcryptjs');
const validateRequestInput = require('../validation/pass_request');
const validateResetInput = require('../validation/pass_reset');

exports.send_request = (req, res) => {
  const {
    errors,
    isValid
  } = validateRequestInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      res.status(404).json("User not found");
    }

    const reset_token = randomize("Aa0", 40);

    PassReset.findOne({
      email: user.email
    }).then(result => {
      if (result) {
        res
          .status(400)
          .json({
            alreadyrequested: "There already has been a request to reset this password"
          });
      } else {
        const newPassReset = new PassReset({
          email: user.email,
          token: reset_token
        });

        newPassReset.save().then(result => {
          const subject = `You requested to reset your password!`;
          const text = 'Request your password';
          const email_body = `<h2>Reset your password</h2><br/>
          <a href="http://localhost:8000/verify/${result.token}">Click this link to reset your password</a><br/>
          <p>If you did not request to reset your password, please click this <a href="http://localhost:8000/deny_reset/${result.token}">link</a>`;
          send(result.email, subject, text, email_body);
          res.json(result);
        });
      }
    });
  });
};

exports.reset_password = (req, res) => {
  const {
    errors,
    isValid
  } = validateResetInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    let password = req.body.password;
    PassReset.findOne({
      token: req.params.token
    }).then((result) => {
      if (!result) {
        res.status(404).json({
          norequest: 'There is no request for a password reset'
        })
      }

      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          password = hash;
          User.findOneAndUpdate({
              email: result.email
            }, {
              $currentDate: {
                updated_at: true
              },
              $set: {
                password: password
              },
            }, {
              new: true
            }).then((user) => {
              PassReset.findOneAndRemove({
                email: result.email
              }).then(() => {
                return null;
              })
              res.json({
                success: 'Your password has been reset'
              });
            })
            .catch(err => res.json(err));
        })
      })
    })
  }



};

exports.deny_reset = (req, res) => {
  PassReset.findOneAndRemove({
      token: req.params.token
    }).then(() => {
      res.json({
        success: 'The reset request has been removed'
      })
    })
    .catch(err => res.json(err))
}