// Require necessary NPM Packages
const express = require('express');
const User = require('../models/user.js');

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


router.post('/api/posts/create/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      Post.create({ content: req.body.content })
        .then((newPost) => {
          user.posts.push(newPost._id);
          return user.save();
        })
        .then(() => {
          res.status(201).json({ message: 'Post created successfully' });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});




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

router.patch('/api/posts/addLike/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })
  .then((post) => {
    res.status(201).json({ post: post });
  })
  .catch((error) => {
    res.status(500).json({ error: error });
  });
});


module.exports = router