const express = require('express')
const { createOrder, listOrders, setStatus } = require('../controllers/orderController')
const { requireSignin, isAuth, isAdmin } = require('../middlewares/auth')
const { userById, addProductsToUserHistory } = require('../middlewares/user')
const { decreaseQuantity } = require('../middlewares/product')
const { orderById } = require('../middlewares/order')
const router = express.Router()

router.post('/create/:userID', [requireSignin, isAuth, addProductsToUserHistory, decreaseQuantity], createOrder)
router.get('/', [requireSignin, isAdmin], listOrders)
router.patch('/:orderID', [requireSignin, isAdmin], setStatus)

router.param('userID', userById)
router.param('orderID', orderById)

module.exports = router