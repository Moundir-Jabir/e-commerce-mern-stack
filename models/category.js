const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Categorie', categorySchema)