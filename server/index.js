require('dotenv').config()

const express = require('express')
const session = require('express-session')
const passport = require('passport')
const path = require('path')

const connectDB = require('./db')
const setupPassport = require('./passport-setup')
connectDB()

const { PORT, SESSION_SECRET } = process.env

const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.resolve('public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())
setupPassport(passport)

// routes
const isAuthenticated = require('./utils/isAuthenticated')
const allRoutes = require('./routes/all.route')
const loginRoute = require('./routes/login.route')
const registerRoute = require('./routes/register.route')
const profileRoute = require('./routes/profile.route')
app.use('/login', loginRoute)
app.use('/register', registerRoute)
app.use('/profile', isAuthenticated, profileRoute)
app.get('*', isAuthenticated, allRoutes)

app.listen(PORT, console.log(`Server listening on http://localhost:${PORT}`))
