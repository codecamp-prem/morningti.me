var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('./config');
var {User} = require('../db/models/UserSchema');
var passport =require('passport')


// updating users meta data
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
                user.mainBackground = req.body.mainBackground;
                user.socialLink = req.body.socialLink;
                user.mainTitle = req.body.mainTitle, // the main title for user blog
                user.mainSubtitle = req.body.mainSubtitle, // the main subtitle for user blog

                // social
                user.facebook=req.body.facebook;
                user.instagram=req.body.instagram;
                user.whatsapp=req.body.whatsapp;
                user.github=req.body.github;
                user.dribbble=req.body.dribbble;
                user.linkedin=req.body.linkedin;
                user.youtube=req.body.youtube;
                user.etsy=req.body.etsy;
                user.twitter=req.body.twitter;

                user.fbUrl=req.body.fbUrl;
                user.igUrl=req.body.igUrl;
                user.waUrl=req.body.waUrl;
                user.inUrl=req.body.inUrl;
                user.dbUrl=req.body.dbUrl;
                user.ytUrl=req.body.ytUrl;
                user.ghUrl=req.body.ghUrl;
                user.esUrl=req.body.esUrl;
                user.twUrl=req.body.twUrl;
                
                user.save((e) => {
                    if (e) {
                        console.log('error saving file', e)
                        res.send(e)
                    } else {
                        res.send({
                            mainBackground:user.mainBackground,
                            socialLink:user.socialLink
                        })
                    }
                })
            }
        })
    })
})


// fetching users meta data
router.get('/:user/:token' , (req, res) => { 

    // token verification
    var token = req.params.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        const nickname = req.params.user;
        User.findOne({nickname:nickname}, (e , user) => {
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
                res.send({
                    socialLink:user.socialLink,
                    mainBackground:user.mainBackground,
                    mainTitle:user.mainTitle, // the main title for user blog
                    mainSubtitle:user.mainSubtitle, // the main subtitle for user blog

                    nightMode:user.nightMode,
                    
                    facebook:user.facebook,
                    instagram:user.instagram,
                    whatsapp:user.whatsapp,
                    github:user.github,
                    dribbble:user.dribbble,
                    linkedin:user.linkedin,
                    youtube:user.youtube,
                    etsy:user.etsy,
                    twitter:user.twitter,
    
                    fbUrl:user.fbUrl,
                    igUrl:user.igUrl,
                    waUrl:user.waUrl,
                    inUrl:user.inUrl,
                    dbUrl:user.dbUrl,
                    ytUrl:user.ytUrl,
                    ghUrl:user.ghUrl,
                    esUrl:user.esUrl,
                    twUrl:user.twUrl
                })
            }
        })
    })
})

module.exports = router;