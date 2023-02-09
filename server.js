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
const reactPort = 3000;
   
// Middleware -
//  Converts JSON to Javacript Object
app.use(express.json())

app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(usersRouter);


// Comment this out after running once 
User.insertMany(userSeed, (error, users) => {
    if(error) {
        console.log(error)
    }else {
        console.log(users)
    }
    
})

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))