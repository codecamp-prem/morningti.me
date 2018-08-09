let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let passportLocalMongoose = require('passport-local-mongoose');


let Visitors = new mongoose.Schema({
  today:[],
  weekly:[],
  monthly:[],
  yearly:[],
  allTime:[]
})

var UserSchema = mongoose.Schema({
    email: { type: String, index: true, unique: true, required: true },
    nickname: { type: String, index: true, unique: true, required: true },
    fullName: { type: String, required: true },
    active: {type: Boolean}, // the user activate his account
    login: {type: Boolean}, // the user is login or not
    dateOfRegistration: {type: Date},
    mainBackground: {type: String},
    mainTitle: {type: String},
    mainSubtitle: {type: String},
    socialLink: {type: String},
    isTester: {type: Boolean, default: false}, // is tester account
    posts: {type: Array}, // array of posts
    analytic: {
      total: {
        daily:{
          0:[],
          1:[],
          2:[],
          3:[],
          4:[],
          5:[],
          6:[]
        },
        weekly:[],
        monthly:[],
        yearly:[],
        allTime:[]
      }, 
      uniqe: {
        daily:{
          0:[],
          1:[],
          2:[],
          3:[],
          4:[],
          5:[],
          6:[]
        },
        weekly:[],
        monthly:[],
        yearly:[],
        allTime:[]
      }
    },

    nightMode:{type: Boolean},

    // social
    facebook:{type:Boolean},
    instagram:{type:Boolean},
    whatsapp:{type:Boolean},
    dribbble:{type:Boolean},
    linkedin:{type:Boolean},
    github:{type:Boolean},
    youtube:{type:Boolean},
    etsy:{type:Boolean},
    twitter:{type:Boolean},

    fbUrl:{type:String},
    igUrl:{type:String},
    waUrl:{type:String},
    inUrl:{type:String},
    dbUrl:{type:String},
    ytUrl:{type:String},
    ghUrl:{type:String},
    esUrl:{type:String},
    twUrl:{type:String},
});

UserSchema.plugin(uniqueValidator)
UserSchema.plugin(passportLocalMongoose, {

    findByUsername: function(model, queryParameters) {
      // Add additional query parameter - AND condition - active: true
      queryParameters.active = true;
      return model.findOne(queryParameters);
    }
  });

let User = mongoose.model("bloger", UserSchema);
module.exports = {User};