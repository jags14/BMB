const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name: String,
    
})
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    price: {type: Number, required: true}
});

module.exports = mongoose.model('Book', bookSchema);