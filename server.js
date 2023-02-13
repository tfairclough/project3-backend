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
app.use(express.static("."));
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}`}))

passport.use(strategy);
/** 
 * Routes
 * 
 * Mount imported Routers
*/
app.use(indexRouter);
app.use(usersRouter);

/**
 * Action:        CREATE
 * Method:        POST
 * URI:           /api/registerUsers
 * Description:   Creates a db of users for testing purposes
 */ 
// adds dummy users from the frontend and hashes the passwords.
// to be removed before going live
app.post('/api/registerUsers', (req, res) => {
  const users = req.body.user;
  if (!Array.isArray(users)) {
    return res.status(400).json({ error: 'User data must be an array' });
  }
  console.log(users)
  let createdUsers = 0;
  for (const userData of users) {
      console.log(userData)
    bcrypt.genSalt(saltRounds)
      .then((salt) => {
        console.log(salt);
        return bcrypt.hash(userData.password, salt);
      })
      .then((hash) => {
        const user = new User({ ...userData, password: hash });
        return user.save();
      })
      .then(() => {
        createdUsers += 1;
        if (createdUsers === users.length) {
          res.status(200).json({ message: 'Users created successfully' });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: error.message });
      });
  }
});

/**
* Action:        READ
* Method:        POST & GET
* URI:           /api/login
* Description:   Login and return token and current user details
*/  
// login authentication and token
app.post('/api/login', (req, res) => {
  // Checks if userName and password have values
  if (req.body.user.userName && req.body.user.password) {
    // finds one user that matches the userName sent
    User.findOne({userName: req.body.user.userName})
      .then((user) => {
        // if no match the following message is returned
        if (!user) {
          return res.status(401).json({ success: false, message: 'user not found' });
        }
        
        // the password being sent is then compared with the password for that user in the db
        return bcrypt.compare(req.body.user.password, user.password)
          .then((isMatch) => {
            if (isMatch) {
              // adds users id to payload
              const payload = { id: user.id };
              // generates token to include payload, secretKey
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              // returns a response that includes the created token and the current user details
              return res.status(200).json({ token: token, userDetails: user });
            }
            // error message if the passwords do not match
            return res.status(401).json({ success: false, message: 'passwords do not match' });
          })
          .catch((error) => {
            return res.status(500).json({ message: 'error' });
          });
      })
      .catch((error) => {
        return res.status(500).json({ message: 'error' });
      });
  } else {
    // error message if username and password do not match or not filled out
    return res.status(400).json({ error: 'Username & Password Required' });
  }
});

/**
* Action:        CREATE
* Method:        POST
* URI:           /api/register
* Description:   Creates a new user, sets a token and returns the users details to be stored localy
*/        
// Create single user in register      
app.post('/api/register', (req, res) => {

  bcrypt.genSalt(saltRounds)
      .then((salt) => {
          console.log(salt);
          return bcrypt.hash(req.body.user.password, salt);
      })
      .then((hash) => {
          const user = new User({ ...req.body.user, password: hash });
          return user.save();
      })
      .then(() => {
          res.status(200).json({ message: 'User created successfully' });
      })
      .catch((error) => {
          console.error(error);
          res.status(500).json({ error: error.message });
      });
});


app.get('/api/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({ message: 'hello you need a web token to see this', user: req.user })
})

// Ensuring the server is listening to the port
app.listen(port, () => console.log(`Backend listening on port:${port}`))