const { Order } = require("../models/order")

exports.createOrder = (req, res) => {
    req.body.user = req.profile._id
    let order = new Order(req.body)
    order.save((err, data) => {
        if(err)
            return res.status(400).json({ erreur: err })
        return res.send(data)
    })
}

exports.listOrders = (req, res) => {
    Order.find().populate('user').sort("-createdAt").exec((err, orders) => {
        if(err)
            return res.status(400).json({erreur: err})
        return res.json(orders)
    })
}