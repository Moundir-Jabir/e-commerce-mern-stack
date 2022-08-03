const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    description: {
        type: String,
        required: true,
        maxLength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Categorie',
        required: true
    },
    shipping: {
        required: false,
        type: Boolean,
        default: false
    }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)