const router = require('express').Router()

router.route('/a').get((req, res) => res.send('a'))
router.route('/b').get((req, res) => res.send('b'))
router.route('/c').get((req, res) => res.send('c'))
router.route('/d').get((req, res) => res.send('d'))

router.route('/secret').get((req, res) => {
  res.render('secret')
})

router.route('*').get((req, res) => res.send('does not exist'))

module.exports = router
