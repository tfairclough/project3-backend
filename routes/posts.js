// Require necessary NPM Packages
const express = require('express')

// Require Mongoose Model
const Post = require('./../models/post.js')

// Instantiate a Router (mini app the only handles routes)
const router = express.Router()

/**
 * Action:        CREATE
 * Method:        POST
 * URI:           /api/users
 * Description:   Create a new post
 */

router.post('/api/posts', (req, res) => {
  Post.create(req.body.user)
  //On a successful `create action, respond with 201
  // HTTP status and the content of the new User 
  .then((newPost) => {
    res.status(201).json({ users : newPost})
  })
  // Catch any error that might occur
  .catch((error) => {
    res.status(500).json({ error : error })
  })
})


module.exports = router