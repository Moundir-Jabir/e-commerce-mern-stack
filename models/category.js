const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32
    }
}, {timestamps: true})

module.exports = mongoose.model('Categorie', categorySchema)