var express = require('express');
var router = express.Router();
var {User} = require('../db/models/UserSchema')

/* GET home page. */
router.get('/:user', (req, res, next) => {
    const nickname = req.params.user; // the user to fetch his post
    let found = false; // var to save the value if post were found
    User.findOne({nickname:nickname} , (e , user) => {
        if (e) {
            console.log(e)
            res.send('error fetching post', e)
        }
        else if (!user) {
            console.log('no user found')
            res.send({
                writer:'John Snow',
                mainSubtitle:'Click here to write it now',
                mainTitle:'this can be a new chapter for your story...',
                writtenBy: 'written by',

            })
        }
        else if (user) {
            if (user.posts.length > 0) {
                res.send({
                    posts:user.posts,
                    socialLink:user.socialLink,
                    mainBackground:user.mainBackground,
                    mainTitle:user.mainTitle, // the main title for user blog
                    mainSubtitle:user.mainSubtitle, // the main subtitle for user blog
                    nickname:user.nickname,
                    fullName:user.fullName,
                    writtenBy: 'written by',
                    // social
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
            } else {
                res.send({
                    fullName:user.fullName,
                    mainSubtitle:'Click here to write it now',
                    mainTitle:'this can be a new chapter for your story...',
                    writtenBy: 'written by',
                })
            }
        }
    })
});

module.exports = router;
