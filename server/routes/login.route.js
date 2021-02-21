const router = require('express').Router()
const passport = require('passport')
const User = require('../user.model')

router
  .route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) res.redirect('/profile')
    else res.render('login')
  })
  .post(
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/profile')
    }
  )

module.exports = router
