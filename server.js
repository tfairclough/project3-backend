// Import Dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const db = require('./config/db')
const userSeed = require('./userSeed')
const User = require('./models/user')


// Instantitate DB connection 
mongoose.connect(db, {useNewUrlParser : true})

// Log on first connection
mongoose.connection.once('open', () => console.log('Connected to MongoDB'))

//Require Route Files
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

// Instantiate express server object 
const app = express()

// Define port
const port = process.env.Port || 5001
   
// Middleware -
//  Converts JSON to Javacript Object
app.use(express.json())

/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(usersRouter);


const dummyUser =
[
{
    firstName: "Nick",
    lastName: "Langley",
    userName: "Eddy85",
    password: "1"
}, {
    firstName: "Deja",
    lastName: "Gorden",
    userName: "TheCaliforniaCoder",
    password: "1"
}, {
    firstName: "Tom",
    lastName: "Fairclough",
    userName: "Tommy",
    password: "1"
}, {
    firstName: "Ma-add",
    lastName: "Al-Jabouri",
    userName: "Maad",
    password: "1"
}, {
    firstName: "Ana",
    lastName: "Solcan",
    userName: "Ana",
    password: "1"
}, {
    firstName: "Ethan",
    lastName: "Berk",
    userName: "EBerk",
    password: "1"
}, {
    firstName: "Hal",
    lastName: "Evans",
    userName: "Hally",
    password: "1"
}, {
    firstName: "Justin",
    lastName: "Tate",
    userName: "JT",
    password: "1"
}, {
    firstName: "Nora",
    lastName: "Zics",
    userName: "Noni",
    password: "1"
}, {
    firstName: "Selina",
    lastName: "Lavery",
    userName: "Selina",
    password: "1"
}, {
    firstName: "Usman",
    lastName: "Bashir",
    userName: "Usman",
    password: "1"
}, {
    firstName: "Joan",
    lastName: "Kalanzi",
    userName: "Joan",
    password: "1"
},
]


/* User.insertMany(dummyUser, (error, users) => {
    if(error) {
        console.log(error)
    }else {
        console.log(users)
    }
    
  }) */

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))