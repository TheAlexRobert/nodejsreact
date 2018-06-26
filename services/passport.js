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
        callbackURL: '/auth/google/callback',
        proxy: true //L50
}, 
//L58
    async (accessToken, refreshToken, profile, done) => {
       const existingUser = await User.findOne({ googleId: profile.id })
       
       if(existingUser){
                //already record with profile id
         return done(null, existingUser);
        }
                //dont have record, make new
        const user = await new User({ googleId: profile.id }).save(); //create new model instance
        done(null, user);        
      
    }
  )
);