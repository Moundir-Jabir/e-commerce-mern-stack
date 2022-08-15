const Categorie = require('../models/category')

exports.createCategory = (req, res) => {
    const category = new Categorie(req.body)
    category.save((err, category) => {
        if(err)
            return res.status(400).json({
                error: 'Category already exist'
            })
        return res.json({
            category: category
        })
    })
}

exports.categoryById = (req, res, next, id) => {
    Categorie.findById(id).exec((err, category) => {
        if(err || !category)
            return res.status(404).json({
                erreur: 'Category not found'
            })
        req.category = category
        next()
    })
}

exports.showCategory = (req, res) => {
    return res.json({
        category: req.category
    })
}

exports.updateCategory = (req, res) => {
    let category = req.category
    category.name = req.body.name
    category.save((err, category) => {
        if(err)
            return res.status(400).json({
                erreur: 'Category not updated'
            })
        return res.json({
            category
        })
    })
}

exports.deleteCategory = (req, res) => {
    let category = req.category
    category.remove((err, category) => {
        if(err)
            return res.status(400).json({
                erreur: 'Category not deleted'
            })
        return res.status(204).json({})
    })
}

exports.allCategories = (req, res) => {
    Categorie.find().exec((err, categories) => {
        if(err)
            return res.status(500).json({
                erreur: err
            })
        return res.json({
            categories
        })
    })
}