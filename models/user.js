// Imports
const mongoose = require('mongoose')

// Define the user Schema: Self-reference for Friends List
const userSchema = new mongoose.Schema({
  firstName: { type: String , required: true},
  lastName: { type: String , required: true},
  userName: { type: String , required: true, unique: true},
  password: { type: String , required: true},
  img: String,
  email: String,
  location: String,
  posts: [{
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    img: String,
    content: { type: String , required: true},
    likes: { type: Number, default: 0 },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commment'
  }]
  }],
  friends: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    firstName: { type: String , required: true},
    lastName: { type: String , required: true},
    userName: { type: String , required: true, unique: true},
    img: String,
    location: String,
  }]
}, {
  timestamps: true
})

// Define a User database entry
const User = mongoose.model('User', userSchema)

module.exports = User