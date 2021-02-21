const LocalStrategy = require('passport-local').Strategy
const User = require('./user.model')
const bcrypt = require('bcryptjs')

const setupPassport = (passport) => {
  passport.serializeUser(function (user, done) {
    // once user logs in, user id is saved in session/cookie
    done(null, { id: user._id, username: user.username })
  })
  passport.deserializeUser(function (user, done) {
    // once user makes request, we take id and set req.user to user
    User.findById(user.id, (err, user) => {
      return done(null, user)
    })
  })
  passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await User.findOne({ username })
        if (!user) throw new Error('User does not exist')

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new Error('Password not valid')

        return done(null, user)
      } catch (err) {
        // console.log(`Error: ${err.message}`)
        return done(err.message, false)
      }
    })
  )
}

module.exports = setupPassport
