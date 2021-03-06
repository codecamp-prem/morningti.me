var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require('cors');
var sslRedirect = require('heroku-ssl-redirect');
// anti ddos 
var Ddos = require('ddos');
var ddos = new Ddos({burst:10, limit:15});


var signup = require('./routes/signup');
var login = require('./routes/login');
var logout = require('./routes/logout');
var activate = require('./routes/activate');
var config  = require('./routes/config');
var index = require("./routes/index");
var resetPasswordHandler = require('./routes/resetPasswordHandler');
var resetPasswordEmail = require('./routes/resetPasswordEmail');
var uploadPost = require('./routes/uploadPost');
var fetchPost = require('./routes/fetchPost');
var fetchAllPosts = require('./routes/fetchAllPosts');
var updateUserPage = require('./routes/updateUserPage');
var nightMode = require('./routes/nightMode');
var deletePost = require('./routes/deletePost')



// passport imports
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session')

// mongo imports
let mongodb = require('mongodb');
let MongoClient = require('mongodb').MongoClient;
let {mongoose} = require('./db/mongoose');



// var users = require("./routes/users");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieParserSecret));
app.use(express.static(path.join(__dirname, "public")));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use(sslRedirect());
app.use(ddos.express); // couse 500 error BUG

app.use('/', index);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/activate', activate);
app.use('/resetpasswordemail', resetPasswordEmail);
app.use('/resetpasswordhandler', resetPasswordHandler);
app.use('/uploadpost', uploadPost);
app.use('/fetchpost', fetchPost);
app.use('/fetchallposts', fetchAllPosts);
app.use('/updateuserpage', updateUserPage);
app.use(`/nightmode`, nightMode);
app.use('/deletepost', deletePost)


// passport initialize
var {User} = require('./db/models/UserSchema');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});






// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
