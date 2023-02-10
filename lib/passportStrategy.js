const passportJWT = require('passport-jwt');
const User = require('./../models/user')
const jwtOptions = require('./passportOptions');

const JwtStrategy = passportJWT.Strategy;


const strategy = new JwtStrategy(jwtOptions, (jwtPayLoad, next) => {
    console.log('Payload recived!')
    console.log('User ID:', jwtPayLoad.id)
    console.log('Token expires on:', jwtPayLoad.exp)
    User.find()
    if (User.userName === jwtPayLoad.userName) {
        next(null, User);
    } else {
        next(null, false);
    }
})

module.exports = strategy;