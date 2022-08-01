const express = require('express')
const router = express.Router()
const { userSignupValidator } = require('../middlewares/userValidator')
const { signup, signin, signout } = require('../controllers/authController')

router.post('/signup', userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', signout)

module.exports = router