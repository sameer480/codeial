const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env=require('./enviorment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: env.google_client_secret, // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: env.google_call_back_url,
    },

    function(accessToken, refreshToken, profile, done){//yha doubt hai
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){//profile.emails[0].value
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);//referesh token kaise work kre ga
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,//.display Name kaise work kr rha hai
                    
                    email: profile.emails[0].value,//ye kaise work kr rha hai
                    password: crypto.randomBytes(20).toString('hex')//ye kaise work kr rha hai
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
