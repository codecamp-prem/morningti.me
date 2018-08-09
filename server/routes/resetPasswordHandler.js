var {User} = require('../db/models/UserSchema');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./config');
var passport = require('passport');


router.post('/' , (req, res) => {
    var token = req.body.token;
    let email = req.body.email

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        User.findOne({email:email}, (e, user) => {
            if (e) console.log('error resetting password' , e)
            if (user) {
                user.setPassword(req.body.password,(err, user) => {
                    if (err) {console.log(err)} 
                    user.save((err) => {

                      if (err) {
                             console.log(err)
                            res.send('password couldne be changed')
                        } else {
                            res.send('password changed')
                        }
                    });
                })
            }
        })
    })
})

module.exports = router