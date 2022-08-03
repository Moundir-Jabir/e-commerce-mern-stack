const express = require('express')
const router = express.Router()
const { getOneUser, updateProfil } = require('../controllers/userController')
const { userById } = require('../middlewares/user')
const { requireSignin, isAuth } = require('../middlewares/auth')

router.get('/:userID', requireSignin, isAuth, getOneUser)
router.put('/:userID', requireSignin, isAuth, updateProfil)
router.param('userID', userById)

module.exports = router