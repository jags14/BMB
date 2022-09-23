const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/book');
const router = express.Router();

router.get('/', (req, res, next) => {
    Book.find()
        .exec()
        .then((books) => {
            console.log(books);
            res.status(200).json({
                message: "Fetching the books",
                booksList : books
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
});


module.exports = router;