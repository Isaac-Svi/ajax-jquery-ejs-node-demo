const router = require('express').Router()
const User = require('../user.model')
const bcrypt = require('bcryptjs')

router
  .route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) res.redirect('/profile')
    else {
      if (req.query.error) {
        return res.render('register', {
          error: req.query.error,
        })
      }
      return res.render('register', {
        error: '',
      })
    }
  })
  .post(async (req, res) => {
    const { username, password } = req.body
    try {
      const userExists = await User.findOne({ username })

      if (userExists) throw new Error('User already exists')

      const user = await User.create({
        username,
        password: await bcrypt.hash(password, 10),
      })

      req.logIn(user, (err) => {
        if (err) return res.redirect(`/login?error=${err}`)
        return res.redirect('/profile')
      })
    } catch (err) {
      res.redirect(`/register?error=${err}`)
      console.log(err.message)
    }
  })

module.exports = router
