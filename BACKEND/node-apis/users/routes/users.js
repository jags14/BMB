const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
    User.find()
        .exec()
        .then((users) => {
            if(!users.length){
                console.log("No users found");
                return res.status(404).json({
                    message: 'User not found'
                });
            } else {
                console.log("getting all users");
                console.log(users);
                return res.status(200).json({
                    count: users.length,
                    userList: users
                });
            }
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
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err){
                        console.log(err);
                        return res.status(500).json({error: err});
                    } else {
                        const newUser = new User({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            address: req.body.address
                        });
                        newUser.save()
                            .then(result => {
                                console.log(`user saved: ${result}`);
                                res.status(201).json({
                                    message: 'User created',
                                    user_created: result
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                })
            }
        })
});

router.post('/login', (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then((user) => {
            if(!user.length){
                console.log('User not found');
                res.status(404).json({
                    message: "User doesn't exist"
                })
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err){
                        console.log(err);
                        res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if(result){
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                        );
                    res.status(200).json({
                        message: "User found",
                        user_token: token
                    })
                    }
                })
            }
        })
        .catch(err => {
            res.status()
        })
});

module.exports = router;