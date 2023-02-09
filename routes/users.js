// Require necessary NPM Packages
const express = require('express')

// Require Mongoose Model
const User = require('./../models/user.js')
<<<<<<< HEAD
=======
const { unsubscribe } = require('./index.js')
>>>>>>> 0fc7fc839f416a6f97626e6909214bdc805e2ec4

// Instantiate a Router (mini app the only handles routes)
const router = express.Router()

/**
 * Action:        CREATE
 * Method:        POST
 * URI:           /api/users
 * Description:   Create a new Account
 */

router.post('/api/users', (req, res) => {
  User.create(req.body.user)
  //On a successful `create action, respond with 201
  // HTTP status and the content of the new User 
  .then((newUser) => {
<<<<<<< HEAD
    res.status(201).json({ user : newUser})
=======
    res.status(201).json({ users : newUser})
>>>>>>> 0fc7fc839f416a6f97626e6909214bdc805e2ec4
  })
  // Catch any error that might occur
  .catch((error) => {
    res.status(500).json({ error : error })
  })
})

<<<<<<< HEAD
=======
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

>>>>>>> 0fc7fc839f416a6f97626e6909214bdc805e2ec4
module.exports = router