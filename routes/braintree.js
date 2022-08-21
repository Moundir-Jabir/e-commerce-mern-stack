const express = require('express')
const { generateToken, processPayment } = require('../controllers/brainTreeController')
const { requireSignin, isAuth } = require('../middlewares/auth')
const { userById } = require('../middlewares/user')
const router = express.Router()

router.get('/getToken/:userID', [requireSignin, isAuth], generateToken)
router.post('/purchase/:userID', [requireSignin, isAuth], processPayment)
router.param('userID', userById)

module.exports = router