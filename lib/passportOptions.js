const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const secretKey = require('dotenv').config();

const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRET_KEY;


module.exports = jwtOptions; 
