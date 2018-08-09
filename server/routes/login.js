var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('./config');
var {User} = require('../db/models/UserSchema');





    router.post('/' ,passport.authenticate('local'), function(req, res) {
        User.findOneAndUpdate(
            {username: req.body.email}, 
            {login:true},
            {new:true},
            (err, userAcc) => {
                if (err) {
                    console.log('err', err)
                    res.send(err)
                } else if (req.user) {
                    var token = jwt.sign({ 
                        email: req.user.email,
                        salt:req.user.salt,
                        hash:req.user.hash 
                    }, config.JWTsecret, {}); // assigning token which be userd to activate the signed account
                    res.send({msg:'you logged in', user:req.user, token:token})
                } 
            }
        );
    });
    


module.exports = router;