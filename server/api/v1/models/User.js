const mongoose = require("mongoose");
const mongoolia = require('mongoolia').default;
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://image.ibb.co/hdY3gT/profiel.png'
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: false,
  },
  facebookProvider: {
    id: {
      type: String,
      required: false,
    },
    token: {
      type: String,
      required: false
    }
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false
  }
});

UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
  const User = this;
  return User.findOne({
    'facebookProvider.id': profile.id
  }, function(err, user) {
    if(user) { return cb(err, user);}

    return User.findOne({
      'email': profile.emails[0].value
    }, function(err2, user2) {
      if(user2) {
        user2.facebookProvider.id = profile.id;
        user2.facebookProvider.token = accessToken;
        user2.save(function(err3, savedUser) {
          return cb(err3, savedUser);
        })
      } else {
        var newUser = new User({
          email: profile.emails[0].value,
          name: profile.name,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });
        newUser.save(function(err3, savedUser) {
          return cb(err3, savedUser);
        })
      }
    })
  })
}

module.exports = User = mongoose.model("users", UserSchema);
