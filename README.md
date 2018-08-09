<img src="/img/1.png"/>

## MorningTi.me - tell your story

MorningTi.me is an open source app to help you writter your story. 
Share your thoughts, knowledge and ideas with everyone.  

**[user page example](https://www.morningtime/demo/)**
<br/>
**[post example](https://www.morningti.me/demo/1533489148833)**

## Of course its free 
you can always go to - [www.morningti.me](https://www.morningti.me) and create your blog for free
## Open source 
This app is completlly open source - If you want to create your own instance of it -
* clone this repo `git clone https://github.com/obiwankenoobi/morningti.me.git` 
* go to [server/routes/config.js](server/routes/config.js) and change the configiration there
to fit your own -
```js
let config = {
	cookieParserSecret: process.env.cookieParserSecret || "<SECRET>", // secret for cookie parser
    JWTsecret: process.env.JWTsecret || "<SECRET>", // secret for JWT 
    nodemailerEmail: process.env.nodemailerEmail || "smtp email", // your email client
    nodemailerPw: process.env.nodemailerPw ||"<smtp login pw>", // your email password client
    smtp:process.env.smtp || "smtp.domain.com", // i.e 'smtp.domain.com'
    mongoUsername: process.env.mongoUsername || "<mongo username>", // if you have your db
    mongoPw: process.env.mongoPw || "<mongo pw>", // if you have your db
    mongoUrl: process.env.mongoUrl || "<mongo remote server url>",
    server:process.env.server || "http://localhost:3010", // your frontend server
    frontEndServer:process.env.frontEndServer || "http://localhost:3000" // your front end server
};
 ```
**note**
 you must have smtp server up and runinig to run your own instance
 It should send activation email to your users as they signup - it can be done only with domain address and smtp server.

`cookieParserSecret` is the coockieParser secret for the Express server
`JWTsecret` is the JWT secret fot the token authentication of requests

`nodemailerEmail` is where the email address you got from your smtp provider is going
`nodemailerPw` is where the password of this email address is going
`smtp` is where the the smtp address of your provider is going - (smtp.domain.com or similar)

`mongoUsername` is your mongodb username - **only edit if you use remote db such as [mlab.com](https://mlab.com)**
`mongoPw` is your mongodb password - **only edit if you use remote db such as [mlab.com](https://mlab.com)**
`mongoUrl` is your mongodb url address - **only edit if you use remote db such as [mlab.com](https://mlab.com)**

`server` is where your backend address going default to `http://localhost:3010`
`frontEndServer` is where your backend address going default to `http://localhost:3000`

* go to [client/src/config.js](client/src/config.js) and change the configs there as well -
```js
let config = {
    backEndServer:'https://morningtime-server.herokuapp.com',
    frontEndServer:'https://www.morningti.me' 
}
```
`backEndServer` is for your back end server - (if you want to run it locally set it to `localhost:3010`)  
`frontEndServer` is for your front end server - (if you want to run it locally set it to `localhost:3000`) 

## database 
 I assume you have MongoDB installed and running - this project require you to have it. 
 If you dont have MongoDB installed - you can see how to install it [here](https://docs.mongodb.com/manual/installation/)  

**after installing - dont forget to run it with `sudo mongod`**

## edit UX/UI

**do edit [/admin](https://www.morningti.me/admin)**
please edit the file [/client/src/Screens/Admin/Admin](client/src/Screens/Admin/Admin)

**do edit [post page](https://www.morningti.me/demo)**
please edit the file [/client/src/components/Posts/PostContainer/PostContainer.js](client/src/components/Posts/PostContainer/PostContainer.js)

**do edit [user page](https://www.morningti.me/demo)**
please edit the file [/client/src/Screens/UserPage/UserPage.js](client/src/Screens/UserPage/UserPage.js)

**do edit your posts component**
please edit the file [/client/src/components/Posts/MiniPost/MiniPost.js](client/src/components/Posts/MiniPost/MiniPost.js)
and [/client/src/components/Posts/MiniPost/MiniPostsContainer.js](client/src/components/Posts/MiniPost/MiniPostsContainer.js)