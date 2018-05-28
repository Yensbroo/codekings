const passport = require('passport');
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUserInput = require('../validation/user');

exports.user_create = (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })    
      })
    }
  });
};

exports.user_login = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
  })(req, res, next);
};

// exports.update_user = (req, res) => {
//   const {
//     errors,
//     isValid
//   } = validateUserInput(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const userFields = {};
//   userFields.user = req.user.id;
//   if (req.body.email) userFields.email = req.body.email;
//   if (req.body.password) userFields.password = req.body.password;
 
//   User.findOne({
//     user: req.user.id
//   }).then(user => {
//       //Update
//       User.findOneAndUpdate({
//         user: req.user.id
//       }, {
//         $set: userFields
//       }, {
//         new: true
//       }).then(user => res.json(user));
//   });
// };
