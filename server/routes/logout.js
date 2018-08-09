var express = require('express');
var router = express.Router();
var {User} = require('../db/models/UserSchema');
var config = require('./config');
var jwt = require('jsonwebtoken');

var passport = require('passport');


/* GET users listing. */
router.post('/', function(req, res) {

    var token = req.body.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    User.findOneAndUpdate(
        {nickname: req.body.nickname}, 
        {login:false},
        {new:true},
        (err, userAcc) => {
            if (err) {
                res.send(err)
            } else {
                //req.logout();
                res.send({msg:'logged out', user:''})
            }
        });
    })
});

module.exports = router;