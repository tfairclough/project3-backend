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
 * Description:   Create a new Account
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

/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/search
 * Description:   search for friends - case insensitive and partial input
 */


/* router.get('/api/search', (req, res) => {
  console.log(req)
  const theName = req.body.name 
  console.log(theName)
  User.find({
     $or: [
         { "firstName": { $regex: new RegExp(theName, "i") } },
         { "lastName": { $regex: new RegExp(theName, "i") } },
         { "userName": { $regex: new RegExp(theName, "i") } }
     ]
   })
   .then((users) => {
       res.status(201).json({ users: users })
   }) 
   .catch((error) => {
       res.status(500).json({ error: error })
   })
 }) */

module.exports = router