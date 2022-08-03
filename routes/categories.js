const express = require('express')
const router = express.Router()
const { createCategory, categoryById, showCategory, updateCategory, deleteCategory, allCategories } = require('../controllers/categoryController')
const { requireSignin, isAdmin } = require('../middlewares/auth')

router.post('/create', [requireSignin, isAdmin], createCategory)
router.put('/:categoryId', [requireSignin, isAdmin], updateCategory)
router.delete('/:categoryId', [requireSignin, isAdmin], deleteCategory)
router.get('/:categoryId', showCategory)
router.get('/', allCategories)

router.param('categoryId', categoryById)

module.exports = router