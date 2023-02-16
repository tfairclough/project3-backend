// Require necessary NPM Packages
const express = require('express')

// Require Mongoose Model
const User = require('./../models/user.js')
const { unsubscribe } = require('./index.js')

// Instantiate a Router (mini app the only handles routes)
const router = express.Router()

 

/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/users
 * Description:   Search an acocunt
 */
router.get('/api/users', (req, res) => {
  User.find()
  .then((user) => {
    res.status(201).json({ users: user})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})


/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/users
 * Description:   Get a speicific user by their ID
 */
router.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    res.status(201).json({ users: user})
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
router.patch('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body.user , { new: true })
  .then((users) => {
    res.status(201).json({ users: users})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})


/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/users
 * Description:   Get a speicific user by their ID
 */
router.get('/api/users/posts/:id', (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    res.status(201).json({ posts: user.posts})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})
/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/search
 * Description:   search for friends - case insensitive and partial input
 */


/*  */

module.exports = router