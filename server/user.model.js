const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 7,
    required: true,
  },
  password: {
    type: String,
    minLength: 50,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
