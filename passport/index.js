const passport = require('passport');
const localStrategy = require('./localStrategy');
const User = require('../models/User');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	console.log('*** serializeUser called, user: ');
	console.log(user); // the whole raw user object!
	console.log('---------');
	done(null, { _id: user._id });
});

