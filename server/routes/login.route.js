const router = require('express').Router()
const passport = require('passport')
const User = require('../user.model')

router
  .route('/')
  .get((req, res) => {
    if (req.isAuthenticated()) res.redirect('/profile')
    else {
      if (req.query.error) {
        return res.render('login', {
          error: req.query.error,
        })
      }
      return res.render('login', {
        error: '',
      })
    }
  })
  .post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) return res.redirect(`/login?error=${err}`)
      req.logIn(user, (err) => {
        if (err) return res.redirect(`/login?error=${err}`)
        return res.redirect('/profile')
      })
    })(req, res, next)
  })

module.exports = router
