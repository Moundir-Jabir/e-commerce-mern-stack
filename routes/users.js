const express = require('express')
const router = express.Router()
const { getOneUser } = require('../controllers/userController')
const { userById } = require('../middlewares/user')
const { requireSignin, isAuth, isAdmin } = require('../middlewares/auth')

router.get('/:userID', requireSignin, isAuth, getOneUser)
router.param('userID', userById)

module.exports = router