const router = require('express').Router()

router.get('/', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

module.exports = router