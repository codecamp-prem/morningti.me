var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./config');
var {User} = require('../db/models/UserSchema');



router.post('/'  ,(req, res) => { 
    // token verification
    var token = req.body.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        User.findOne({nickname:req.body.nickname}, (e , user) => {
            if (e) {
                console.log(e)
                res.send(e)
            }
            // if uer doesnt exist return and print it
            else if (!user) {
                console.log('user wasntfound')
                res.send('user wasnt found')
            }
            else if (user) {
                user.posts.map((post)=> {
                    if (post.id == req.body.postId) {
                        let index = user.posts.indexOf(post)
                        user.posts.splice(index, 1)
                    }
                })
                user.save((e) => {
                    if (e) {
                        console.log('couldnt delete post', e)
                        return res.send('couldnt delete post', e)
                    }
                    res.send('deleted post')
                })
            }
        })
    })
})


module.exports = router;