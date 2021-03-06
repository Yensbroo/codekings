const passport = require('passport');
const User = require("../models/User");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../../config/keys");
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
      const newUser = new User({
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        password2: req.body.password2
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              const newProfile = new Profile({
                user: user.id,
                skills: 'No skills yet'
              })

              newProfile.save()
                        .then(profile => {
                          console.log(profile);
                          res.json(profile)})
                        .catch(err => res.json(err));  
              res.json(user)})
            .catch(err => res.json(err));
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
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              succes: true,
              token: "Bearer " + token,
              strategy: 'jwt'
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
  })(req, res, next)
};

exports.facebook_login = (req, res, next) => {
 
  passport.authenticate('facebook-token', {session: false}, function(err, user, info){

    if(err) {return next(err);}
    if(!user) {
      return res.status(401) .json({
        'message': 'User Not authenticated'
      });
    }

    payload = {
      id: user.id, name: user.name, avatar: user.avatar, email: user.email
    }

    jwt.sign(
      payload,
      keys.secretOrKey,
      {expiresIn: 3600},
      (err, token) => {
        res.json({
          succes: true,
          token: "Bearer " + token,
          strategy: 'facebook-token'
        });
      }
    );
  })(req, res, next);
};

exports.update_user = (req, res, next) => {

  const { errors, isValid} = validateUserInput(req.body);
  if(!isValid) {
    return res.status(400).json(errors);
  }
  const userFields = (req.body);

  User.findOne({
    _id: req.user.id
  }).then(user => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(userFields.newPassword, salt, (err, hash) => {
        if(err) throw err;
        userFields.newPassword = hash;
        if(user.password) {
          bcrypt.compare(userFields.oldPassword, user.password).then(isMatch => {
            if(isMatch) {
              User.findOneAndUpdate({
                _id: req.user.id
              },
              {
                $currentDate: {
                  updated_at: true
                },
                $set: {
                  //avatar: userFields.avatar,
                  password: userFields.newPassword,
                }, 
              },
             {
                new: true
              }
            ).then(user => res.json(user));
            } else {
              errors.oldPassword = 'Your old password is not correct';
              return res.status(400).json(errors)
            }
          })
        } else {
          User.findOneAndUpdate({
            _id: req.user.id
          },
          {
            $currentDate: {
              updated_at: true
            },
            $set: {
              //avatar: userFields.avatar,
              password: userFields.newPassword,
            }, 
          },
         {
            new: true
          }
        ).then(user => res.json(user));
        }
      })    
    })  
  })
};

exports.update_avatar = (req, res, next) => {

  const avatar = req.file.filename;

  User.findOneAndUpdate({
    _id: req.user.id
  },
  {
    $currentDate: {
      updated_at: true
    },
    $set: {
      avatar: avatar
    }, 
  },
  {
    new: true
  }
  ).then(user => res.json(user))
}
