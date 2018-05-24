const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = require("../api/v1/models/User");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, next) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return next(null, user);
          }
          return next(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
