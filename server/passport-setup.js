const LocalStrategy = require('passport-local').Strategy
const User = require('./user.model')
const bcrypt = require('bcryptjs')

const setupPassport = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })
  passport.deserializeUser(function (user, done) {
    done(null, user)
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
        console.log(`Error: ${err.message}`)
        return done(null, false)
      }
    })
  )
}

module.exports = setupPassport
