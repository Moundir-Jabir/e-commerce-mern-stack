const express = require('express')
const { createOrder, listOrders } = require('../controllers/orderController')
const { requireSignin, isAuth, isAdmin } = require('../middlewares/auth')
const { userById, addProductsToUserHistory } = require('../middlewares/user')
const { decreaseQuantity } = require('../middlewares/product')
const router = express.Router()

router.post('/create/:userID', [requireSignin, isAuth, addProductsToUserHistory, decreaseQuantity], createOrder)
router.get('/', [requireSignin, isAdmin], listOrders)
router.param('userID', userById)

module.exports = router