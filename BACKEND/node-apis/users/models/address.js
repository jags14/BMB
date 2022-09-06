const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    add_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    city: String,
    state: String,
    pin: Number
});

module.exports = mongoose.model('Address', addressSchema);