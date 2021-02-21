const router = require('express').Router()
const User = require('../user.model')
const bcrypt = require('bcryptjs')

router
  .route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({})

      res.render('profile', { users })
    } catch (err) {
      console.error(err.message)
    }
  })
  .post(async (req, res) => {
    let { id, username, password } = req.body

    // TODO: best to add some password checks here, probably using Joi

    // sending JSON from fetch automatically causes any string with a space in it
    // to be url encoded.  meaning space will turn into %20
    // to avoid this, either don't allow user to use username or password with spaces or whatever characters
    // or do the following down below where we decode the input before saving in DB
    username = username && decodeURIComponent(username)
    password = password && decodeURIComponent(password.trim())

    try {
      const user = await User.findById(id)
      if (username) user.username = username
      if (password) user.password = await bcrypt.hash(password, 10)

      await user.save()

      res.json({
        username: user.username,
        password: user.password,
      })
    } catch (err) {
      console.error(err.message)
    }
  })

module.exports = router
