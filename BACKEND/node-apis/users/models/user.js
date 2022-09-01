const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, "can't be blank"],
        index: true
    },
    gender: {
        type: String,
        Enumerator: ['Male', 'Female', 'Other']
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }

}, {timestamps: true});

// userSchema.plugin(uniqueValidator, {message: 'is already taken'})

module.exports = mongoose.model('User', userSchema);
