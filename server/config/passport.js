const passport = require('passport');


/**
 * Auth strategies
 */
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const FBTokenStrategy = require('passport-facebook').Strategy;
const mongoose = require("mongoose");
const User = require("../api/v1/models/User");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = function() {
  const jwtStrategy = new JwtStrategy(opts, (jwt_payload, next) => {
    User.findById(jwt_payload.id)
      .then(user => {
        console.log(user);
        if (user) {
          return next(null, user);
        }
        return next(null, false);
      })
      .catch(err => console.log(err));
  });
  passport.use(jwtStrategy)

  const fbStrategy = new FBTokenStrategy ({
    clientID: keys.facebook.appId,
    clientSecret: keys.facebook.appSecret,
  },
  (accessToken, refreshToken, profile, done) => {
      User.findOne({
        'email': profile.emails[0].value
      }).then(user2 => {
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
      .catch(err => console.log(err));
  });
  passport.use(fbStrategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  return {
    initialize: function() {
      return passport.initialize()
    },
    authenticateJwt: function() {
      return passport.authenticate('jwt', {session: false})
    },
    authenticateFacebook: function() {
      passport.authenticate('facebook-token', {session: false})
    }
  }

};