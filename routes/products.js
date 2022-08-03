const express = require('express')
const router = express.Router()
const { createProduct, productById, showProduct, deleteProduct, updateProduct, allProducts, relatedProducts, searchProducts, productPhoto } = require('../controllers/productController')
const { requireSignin, isAdmin } = require('../middlewares/auth')

router.post('/create', [requireSignin, isAdmin], createProduct)
router.get('/:productId', showProduct)
router.get('/', allProducts)
router.post('/search', searchProducts)
router.get('/related/:productId', relatedProducts)
router.get('/photo/:productId', productPhoto)
router.delete('/:productId', [requireSignin, isAdmin], deleteProduct)
router.put('/:productId', [requireSignin, isAdmin], updateProduct)

router.param('productId', productById)

module.exports = router