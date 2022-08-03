const Product = require('../models/product')
const formidable = require('formidable')
const fs = require('fs')
const Joi = require('joi')
const _ = require('lodash')

exports.createProduct = (req, res) => {
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if(err)
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        let product = new Product(fields)
        if(files.photo){
            if(files.photo.size > Math.pow(10, 7))
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
            category: Joi.required()
        })
        const { error } = schema.validate(fields)
        if(error)
            return res.status(400).json({
                error: error.details[0].message
            })

        product.save((err, product) => {
            if(err)
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
    Product.findById(id).exec((err, product) => {
        if(err || !product)
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
        if(err)
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
        if(err)
            return res.status(400).json({
                error: 'Image could not uploaded !'
            })
        let product = req.product
        product = _.extend(product, fields)
        if(files.photo){
            if(files.photo.size > Math.pow(10, 7))
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
        if(error)
            return res.status(400).json({
                error: error.details[0].message
            })

        product.save((err, product) => {
            if(err)
                return res.status(400).json({
                    error: 'Product not updated'
                })
            return res.json({
                product
            })
        })
    })
}