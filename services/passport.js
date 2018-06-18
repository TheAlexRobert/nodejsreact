const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys')
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); //not same as profile.id
});

//L40 - turn id into user
passport.deserializeUser((id, done) => { //done -> turn user into id
    //id into mongoose instance
    User.findById(id)
        .then(user => { //promise
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
}, 
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if(existingUser){
                //already record with profile id
                done(null, existingUser);
            } else{
                //dont have record, make new
                new User({ googleId: profile.id }).save() //create new model instance
                    .then(user => done(null, user));
            }
        })

        
    })
);