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
    callbackURL: keys.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log(profile);
      User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
        return done(err, user);
      });
    });
  });
  passport.use(fbStrategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  })

  return {
    authenticateJwt: function() {
      return passport.authenticate('jwt', {session: false})
    },
    authenticateFacebook: function() {
      passport.authenticate('facebook-token', {session: false})
    }
  }

};