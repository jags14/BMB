const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// Get all books
router.get('/', (req, res, next) => {
    Book.find()
        .exec()
        .then((result) => {
            console.log(result);
            return result;
        })
        .catch((err) => {
            return res.status(404).json({
                error: err
            });
        })
});

// Add new books
router.post('/addBook', (req, res, next) => {

})


module.exports = router;