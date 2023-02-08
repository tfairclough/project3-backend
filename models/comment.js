// Imports
const mongoose = require('mongoose')

// Define the user Schema: Self-reference for Friends List
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

// Define a User database entry
const Comment  = mongoose.model('Comment', commentSchema)

module.exports = Comment