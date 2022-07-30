const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50,
        unique: true
    },
    salt: String,
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        trim: true
    },
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true})