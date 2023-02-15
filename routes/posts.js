// Require necessary NPM Packages
const express = require('express')

// Require Mongoose Model
const Post = require('./../models/post.js')

// Instantiate a Router (mini app the only handles routes)
const router = express.Router()

/**
 * Action:        CREATE
 * Method:        POST
 * URI:           /api/post/create
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


/**
 * Action:        UPDATE
 * Method:        POST
 * URI:           /api/users/edit
 * Description:   edits a post
 */

router.patch('/api/posts/edit/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { content: req.body.content }, { new: true })
    .then((post) => {
      res.status(201).json({ post: post });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});


/**
 * Action:        FIND
 * Method:        GET
 * URI:           /api/posts
 * Description:   Search an acocunt
 */
router.get('/api/posts', (req, res) => {
  Post.find()
  .then((posts) => {
    res.status(201).json({ posts: posts})
  })
  .catch((error) => {
    res.status(500).json({ error: error})
  })
})

<<<<<<< HEAD
=======
router.patch('/api/posts/addLike/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })
  .then((post) => {
    res.status(201).json({ post: post });
  })
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});

>>>>>>> 6f18f9c96591b4a7105aa0bcaf2972367fa6b003

module.exports = router