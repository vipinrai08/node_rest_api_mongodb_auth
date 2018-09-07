var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

exports.user_signup =  (req, res, next) =>{
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if(user.lenght >= 1) {
            return res.status(409).json({
                message: 'Mail exist'
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if (err){
                    return res.status(500).json({
                        error: err
                    });
                    } else {
                        var user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                    })
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        };
    });
};

exports.user_login = (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
           return res.status(401).json({
               message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return result.status(401).json({
                    message: 'Auth failed'
                });
            }
            if (result) {
                var token = jwt.sign({
                    email: user[0].email,
                    userId: user[0].user._id
                },
            process.env.JWT_KEY,
            {
                expiresIn : "1h"
            });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            return result.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
 
exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.id})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });

};

