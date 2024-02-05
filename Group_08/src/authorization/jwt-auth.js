/* global process */
// src/authorization/jwt-auth.js
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const authorize = require('./authorize-middleware');
const logger = require('../logger');

if (!process.env.JWT_SECRET) {
  throw new Error('missing expected env var: JWT_SECRET');
}

// Configuration options for passport-jwt
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
  //algorithms: ['HS256'], // the algorithm used to sign the token
};

// Configure the strategy to use with passport

logger.info('Configured to use JWT strategy');
logger.warn('Need to setup and setup needed to verify token signature and payload. in src/authorization/jwt-auth.js')

module.exports.strategy = () =>
  new JwtStrategy(options, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
      // The following will ensure that all routes using
      // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values
      // that matches the request payload data
      // next(null, { _id: jwt_payload._id, userName: jwt_payload.userName });
      next(null,jwt_payload.userName)
    } else {
      next(null, false);
    }
  });

module.exports.authenticate = () => authorize('jwt');
