const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new starategy for google login
passport.use(new googleStrategy({
        clientID: "203046008975-ja3ilpbgf1lvmo6jm7sleb9ft595dhtt.apps.googleusercontent.com",    
        clientSecret: "7JzLlt58ipUflvhDh1rr0w6X",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

        function(accessToken, refreshToken, profile, done){
            // find a user
            User.findOne({email: profile.emails[0].value}).exec(function(err, user){
                if(err){
                    console.log("Error in google startegy passport",err);
                    return;
                }

                console.log(profile);

                if(user){
                    //if found set this user as req.user
                    return done(null, user);
                }else{
                    // if not found , create the user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log("Error in creating user",err);
                            return;
                        }
                        return done(null,user);
                    })
                }
            });
        }

))