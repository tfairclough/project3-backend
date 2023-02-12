// Require necessary NPM Packages
const express = require('express')

// Require Mongoose Model
const User = require('./../models/user.js')
const { unsubscribe } = require('./index.js')

// Instantiate a Router (mini app the only handles routes)
const router = express.Router()

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


/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/users
 * Description:   Create a new Account
 */
router.get('/api/users', (req, res) => {
  User.find()
  .then((users) => {
    res.status(201).json({ users: users})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})


/**
 * Action:        DELETE
 * Method:        DELETE
 * URI:           /api/users
 * Description:   Create a new Account
 */
router.delete('/api/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
  .then((users) => {
    res.status(201).json({ users: users})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})

/**
 * Action:        UPDATE
 * Method:        PUT
 * URI:           /api/users
 * Description:   Create a new Account
 */
router.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user)
  .then((users) => {
    res.status(201).json({ users: users})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})

module.exports = router