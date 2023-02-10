// Passport Package
const passportJWT = require('passport-jwt');

// Passport Options
const jwtOptions = require('./passportOptions');

// JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy;

// Dummy User for TESTING
// Use a database for real use case
const dummyUser = {
    id: "42",
    username: 'deja',
    password: '1234'
  };

// The function where we are going to see if the requesting user
// has a valid JWT or not. And, to see if the token is expired.
const strategy = new JwtStrategy(jwtOptions, (jwtPayLoad, next) => {
    console.log('Payload Received!');
    console.log('User ID:', jwtPayLoad.id);
    console.log('Token Expires On:', jwtPayLoad.exp);
  
    // Example Database Call:
    // User.findById(jwtPayLoad.id)
    if (dummyUser.id === jwtPayLoad.id) {
      // If ID is in the database, then let's run our original route
      next(null, dummyUser);
    } else {
      // If ID does not matches, then skip our route and return 401
      next(null, false);
    }
  });
  
  module.exports = strategy;
