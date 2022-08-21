const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const CartItemSchema = new mongoose.Schema({
    product: {
        type: ObjectId, ref: 'Product'
    },
    count: Number,
    name: String,
    price: Number
}, {timestamps: true})

const OrderShema = mongoose.Schema({
    products: [CartItemSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    status: {
        type: String,
        default: "Not Processed",
        enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"]
    },
    user: { type: ObjectId, ref: 'User' }
}, {timestamps: true})

const Order = mongoose.model('Order', OrderShema)

module.exports = { Order }