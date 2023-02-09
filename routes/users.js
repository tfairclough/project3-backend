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
 * URI:           /api/users
 * Description:   Create a new Account
 */

router.post('/api/users', (req, res) => {
  User.create(req.body.user)
  //On a successful `create action, respond with 201
  // HTTP status and the content of the new User 
  .then((newUser) => {
    res.status(201).json({ users : newUser})
  })
  // Catch any error that might occur
  .catch((error) => {
    res.status(500).json({ error : error })
  })
})

/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/users
 * Description:   Search an acocunt
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
 * Description:   Delete an account
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
 * Description:   Update User Account Details
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