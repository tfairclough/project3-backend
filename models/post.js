// Imports
const mongoose = require('mongoose')

// Define the user Schema: Self-reference for Friends List
const postSchema = new mongoose.Schema({
  img: String,
  title: { type: String , required: true},
  content: { type: String , required: true},
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Commment'
  }]
}, {
  timestamps:true
})

// Define a User database entry
const Post = mongoose.model('Post', postSchema)

module.exports = Post