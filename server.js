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

//Require Passport Strategy and Options
const strategy = require('./lib/passportStrategy');
const jwtOptions = require('./lib/passportOptions');

const saltRounds = 10;

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

//Define our auth strategy from before

passport.use(strategy);

/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(usersRouter);

// Dummy User for TESTING
// Use a database for real use case
const dummyUser = {
    id: "42",
    username: 'deja',
    password: '1234'
  };

  app.post('/api/login', (req, res) => {
    if (req.body.username && req.body.password) {
      // This should be a Database call...
      //
      // Example:
      // User.find({username: req.body.username})
      if (req.body.username === dummyUser.username && req.body.password === dummyUser.password) {
        // Select the information we want to send to the user
        const payload = {
          id: dummyUser.id
        };
  
        // Build a JSON Web Token using the payload
        const token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: 600 }); // 10 minutes
  
        // Send the JSON Web Token back to the user
        res.status(200).json({ success: true, token: token });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } else {
      res.status(400).json({ error: 'Username & Password Required' });
    }
  });

   // this is the minimum needed to protect your route from users who aren't logged in
   app.get('/api/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({
      message: 'Hey, you can only see this message with the JSON Web Token.',
      user: req.user
    });
  });

  app.get('/test', (req, res) => {
    bcrypt.hash('1234', saltRounds, (error, hash) =>{
        res.status(200).json({ password: hash});
    });
}) 

/* User.insertMany(userSeed, (error, users) => {
    if(error) {
        console.log(error)
    }else {
        console.log(users)
    }
    
}) */

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))