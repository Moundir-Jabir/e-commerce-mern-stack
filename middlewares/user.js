const User = require('../models/user')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user)
            return res.status(404).json({
                error: 'User not found'
            })
        req.profile = user
        next()
    })
}

exports.addProductsToUserHistory = (req, res, next) => {
    let history = []
    history = req.body.products.map(product => {
        return {
            _id: product._id,
            name: product.name,
            description: product.description,
            count: product.count,
            price: product.price,
            transact_id: req.body.transactionId
        }
    })
    User.findOneAndUpdate({_id: req.profile._id}, {$push: {history: history}}, {new: true}, (err, data) => {
        if(err)
            return res.status(400).json({erreur: 'Could not update user history'})
        next()
    })
}