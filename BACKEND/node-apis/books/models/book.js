const mongoose = require('mongoose');
const Author = require('./author');
/*
const authorSchema = mongoose.Schema({
    name: String,
    
})
*/
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: Author
    },
    price: {type: Number, required: true},
    genre: String,
    edition: Number,
    rating: Number,
    isbn: String
});

module.exports = mongoose.model('Book', bookSchema);