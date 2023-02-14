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
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
})

// Define a User database entry
const User = mongoose.model('User', userSchema)

module.exports = User