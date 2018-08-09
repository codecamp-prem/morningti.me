var express = require('express');
var router = express.Router();
var {User} = require('../db/models/UserSchema')


/* GET home page. */
router.get('/:user/:post', (req, res, next) => {
    const nickname = req.params.user; // the user to fetch his post
    const postId = req.params.post; // post id to fetch from user
    let found = false; // var to save the value if post were found
    User.findOne({nickname:nickname} , (e , user) => {
        if (e) {
            console.log(e)
            res.send('error fetching post', e)
        }
        else if (!user) {
            console.log('no user found')
            res.send('no user found')
        }
        else if (user) {
            for (let i = 0; i < user.posts.length; i++) {
                if (user.posts[i].id == postId) {
                    found = true; // flagging that we found the post
                    console.log('this is post', user.posts[i])
                    res.send({
                        post:user.posts[i].post,
                        socialLink:user.socialLink,
                        title:user.posts[i].title,
                        subtitle:user.posts[i].subtitle,
                        background:user.posts[i].background,
                        nickname:user.nickname,
                        fullName:user.fullName,

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
                    }) // if there is send the post
                    break;
                } 
            }
            if (!found) { // if there is no flag to finding post, send msg that post wasnt found
                console.log('post wasnt found')
                res.send('post wasnt found')
            }
        }
    })
});



// count visitor function @@@ LAME @@@ not really working 
// router.post('/:user/:post', (req, res, next) => {
//     const username = req.params.user; // the user to fetch his post
//     const postId = req.params.post; // post id to fetch from user

//     User.findOne({username:username}, (e, user) => {
//         if (e) {
//             console.log(e)
//             res.send('error fetching post', e)
//         }
//         else if (!user) {
//             console.log('no user found')
//             res.send('no user found')
//         }
//         else if (user) {

//             console.log('this visitor data', req.body.visitor)
//             let found = false
//             for (let i = 0; i < user.analytic.uniqe.daily.length; i++) { // checking if there is the ip already in the uniqe array
//                 if (user.analytic.uniqe.daily[i].location.ip == req.body.visitor.location.ip) {
//                     found = true;
//                 }   
//             }


//             if(!found) { // if there is ip in the array of todays visitors
//                 user.analytic.uniqe.daily[new Date().getDay()].push(req.body.visitor) // push the data object to the uniqe array in the todays index
//                 user.analytic.total.daily[new Date().getDay()].push(req.body.visitor)   // and to the total array
//             } else {
//                 user.analytic.total.daily[new Date().getDay()].push(req.body.visitor)   // if there isnt ip already push to the uniqe array
//             }

//             user.save((e, doc) => {
//                 if (e) {
//                     console.log('couldnt save visitor', e)
//                     res.send(e)
//                 } 
//                 if (doc) {
//                     console.log('visitor saved', doc)
//                     res.send(doc)
//                 }
//             })
//         }
//     })
// })


module.exports = router;
