const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const Joi = require('joi')
const _ = require('lodash')

exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err)
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        let product = new Product(fields)
        if (files.photo) {
            if (files.photo.size > Math.pow(10, 7))
                return res.status(400).json({
                    error: 'Image should be less than 10 mb in size !'
                })
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.required(),
            shipping: Joi.boolean()
        })
        const { error } = schema.validate(fields)
        if (error)
            return res.status(400).json({
                error: error.details[0].message
            })

        product.save((err, product) => {
            if (err)
                return res.status(400).json({
                    error: 'Product not persist'
                })
            return res.json({
                product
            })
        })
    })
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).populate('category').exec((err, product) => {
        if (err || !product)
            return res.status(404).json({
                erreur: 'Product not found'
            })
        req.product = product
        next()
    })
}

exports.showProduct = (req, res) => {
    req.product.photo = undefined
    return res.json({
        product: req.product
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product
    product.remove((err, product) => {
        if (err)
            return res.status(404).json({
                erreur: 'Product not deleted'
            })
        res.status(204).json({})
    })
}

exports.updateProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err)
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        let product = req.product
        product = _.extend(product, fields)
        if (files.photo) {
            if (files.photo.size > Math.pow(10, 7))
                return res.status(400).json({
                    error: 'Image should be less than 10 mb in size !'
                })
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required()
        })
        const { error } = schema.validate(fields)
        if (error)
            return res.status(400).json({
                error: error.details[0].message
            })

        product.save((err, product) => {
            if (err)
                return res.status(400).json({
                    error: 'Product not updated'
                })
            return res.json({
                product
            })
        })
    })
}

exports.allProducts = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'asc'
    let limit = req.query.limit ? parseInt(req.query.limit) : '100'

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err)
                return res.status(404).json({
                    erreur: 'Products not found'
                })
            return res.json({
                products
            })
        })
}

exports.relatedProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : '6'
    Product.find({ category: req.product.category, _id: { $ne: req.product._id } })
        .limit(limit)
        .select('-photo')
        .populate('category')
        .exec((err, products) => {
            if (err)
                return res.status(404).json({
                    erreur: 'Products not found'
                })
            return res.json({
                products
            })
        })
}

exports.searchProducts = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let order = req.query.order ? req.query.order : 'asc'
    let limit = req.query.limit ? parseInt(req.query.limit) : '100'
    let skip = parseInt(req.body.skip)
    let findArgs = {}
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1],
                }
            }
            else if (key === "search") {
                findArgs.name = {
                    $regex: req.body.filters[key],
                    $options: "i"
                }
            }
            else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .skip(skip)
        .exec((err, products) => {
            if (err)
                return res.status(404).json({
                    erreur: 'Products not found'
                })
            return res.json({
                products
            })
        })
}

exports.productPhoto = (req, res) => {
    const { data, contentType } = req.product.photo
    if (data) {
        res.set('Content-Type', contentType)
        return res.send(data)
    }
}