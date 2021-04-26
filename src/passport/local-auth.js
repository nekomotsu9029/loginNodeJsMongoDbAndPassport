const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser( async (id, done) =>{
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{

    const usearSearch = await User.findOne({email});
    if(usearSearch){
        return done(null, false, req.flash('signupMessage', 'The Email is already taken.'))
    }else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }    
}));

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    const usearSearch = await User.findOne({email});
    if(!usearSearch){
        return done(null, false, req.flash('signinMessage', 'No User found'));
    }
    if(!usearSearch.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'incorrect Password'));
    }
    done(null, usearSearch);
}));