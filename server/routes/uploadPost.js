var express = require('express');
var router = express.Router();
var mongoose = require('../db/mongoose')
var jwt = require('jsonwebtoken');
var config = require('./config');
var {User} = require('../db/models/UserSchema')


router.post('/', (req, res,) => {

    // token verification
    const token = req.body.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.JWTsecret, function(err, decoded) { // using the token we passed to authonticate the account
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        const nickname = req.body.nickname
        const post = req.body.post
        const id = req.body.id
        const title = req.body.title
        const subtitle = req.body.subtitle
        const date = req.body.date
        const background = req.body.background

        // a little validation
        if ((nickname && typeof nickname != 'string') || 
            (id && typeof id != 'string') || 
            (title && typeof title != 'string') || 
            (background && typeof background != 'string')) {

            return res.send('nickname must be string')

        } else {
            User.findOne({nickname:nickname}, (e, user) => {
                // if there is error print the error
                if (e) {
                    console.log(e)
                    res.send(e)
                }
                // if uer doesnt exist return and print it
                else if (!user) {
                    console.log('user wasntfound')
                    res.send('user wasnt found')
                }
    
                // if user exist
                else if (user) {
                    let postIdExist = false; // flag if we found same id , meant the user update a post
                    let indexOfExistedPost; // placeholder for the index the id is on 
                    for (let i = 0; i < user.posts.length; i++) { // looping throgh the posts array
                        if (user.posts[i].id == id) { // if we found a post with the passed id
                            postIdExist = true; // turn the flag on
                            indexOfExistedPost = user.posts.indexOf(user.posts[i]) // save the index of the post
                            console.log('index of indexOfExistedPost', indexOfExistedPost)
                            break; // creak the loop
                        }
                        console.log('this is postIdExist', postIdExist)
                    }
                    if (!postIdExist) { // if post wasnt found , assing the data to a holder
                        console.log('we didnt found the id')
                        let holder = {
                            post:post, 
                            id:id,
                            title:title,
                            subtitle:subtitle,
                            background:background,
                            date:date
                        }
                        user.posts.push(holder) // push the data to the array
                        user.save((e) => { // save the doc
                            if (e) {
                                console.log('couldnt save post')
                                res.send({error:e, msg:'couldnt save post'})
                            } else {
                                console.log('post uploaded', post)
                                res.send({msg:'post uploaded', post:post})
                            }
                        })
                    } else { // if the id was found
                        console.log('we found the id')
                        let holder = { // save the data in holder
                            post:post, 
                            id:id,
                            title:title,
                            subtitle:subtitle,
                            background:background,
                            date:date
                        }
                        console.log('holder', holder)
                        console.log('this is the index it in', indexOfExistedPost)
                        // user.posts[indexOfExistedPost] = holder; // and update the post 
                        user.posts.splice(user.posts[indexOfExistedPost] , 1, holder)
                        //user.posts.push(holder)
                        console.log('user.posts[indexOfExistedPost]', user.posts[indexOfExistedPost])
                        user.save((e , updated) => { // save the doc
                            if (e) {
                                console.log('couldnt save post')
                                res.send({error:e, msg:'couldnt save post'})
                            } if (updated) {
                                console.log('post uploaded', updated)
                                res.send({msg:'post uploaded', post:updated})
                            } else {
                                console.log('something wend wrong')
                            }
                        })
                    }
                }
            })
        }
    })
});

module.exports = router;
