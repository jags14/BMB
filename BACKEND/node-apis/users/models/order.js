const mongoose = require('mongoose');
const User = require('./user');
const orderSchema = mongoose.Schema({
    order_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    
})