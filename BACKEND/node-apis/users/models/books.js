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
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    },
    price: {type: Number, required: true},
    genre: String,
    published: {
        type: Date,
        default: Date.now
    },
    edition: Number,
    rating: Number
});

module.exports = mongoose.model('Book', bookSchema);