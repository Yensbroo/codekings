const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUserInput = require('../validation/user');
const errorHandler = require('../utilities/errorHandler');

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

exports.user_login = (req, res) => {
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
};

exports.update_user = (req, res, next) => {

  const { errors, isValid} = validateUserInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const userFields = {}
  const oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  const newPassword2 = req.body.newPassword2;
  
  
  User.findOne({
    _id: req.user.id
  }).then(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if(err) throw err;
        newPassword = hash;
        console.log(newPassword);
        bcrypt.compare(oldPassword, user.password).then(isMatch => {
          if(isMatch) {
            User.findOneAndUpdate({
              _id: req.user.id
            },
            {
              $currentDate: {
                created_at: true
              },
              $set: {
                password: newPassword,
              }, 
            },
           {
              new: true
            }
          ).then(user => res.json(user));
          } else {
            return errorHandler.handleAPIError(400, 'Your old password is not correct', next)
          }
        })
      })    
    })
    
  })
};

// console.log(user);
//     if(!user) {
//       return errorHandler.handleAPIError(404, 'There is no user', next);
//     }
//     bcrypt.compare(oldPassword, user.password).then(isMatch => {
//       if(isMatch) {
//         console.log('sucess')
//       .then(user => res.json(user))
//       .catch(err => console.log(err));
//       } else {
//         errors.oldPassword = 'Your old password is incorrect';
//         return res.status(400).json(errors);
//       }
//     })