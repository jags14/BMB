const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then((users) => {
            console.log(users);
            return res.status(200).json({
                count: users.length,
                userList: users
            });
        })
        .catch((err) => {
            if(err){
                return res.status(404).json({
                    message: err
                });
            }
        })
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then((users) => {
            if(users.length >= 1){
                return res.status(409).json({
                    message: 'User already exists'
                })
            } else {
                const user = new User(body);
                const salt = bcrypt.genSalt(10);
                user.password = bcrypt.hash(user.password, salt);
                user.save()
                    .then((data) => {
                        console.log(data);
                        return res.status(201).json({
                            message: 'new user created '

                        })
                    })
                    .catch((err) => {
                        return res.status(500).json({
                            Error: err
                        })
                    });
            }
        })
});

router.post('/login', (req, res, next) => {
    const user = User.findOne({email: req.body.email});
    const body = req.body;
    if(user){
        const validate = bcrypt.compare(body.password, user.password);
        if(validate){
            res.status(200).json({message: 'valid password'})
        } else {
            res.status(400).json({message: 'Invalid password'})
        }

    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});