const User = require('../models/user');
const localStrategy = require('passport-local').Strategy;
var db = require("../models");
const strategy = new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        db.User.findOne({
            where: {
                username: username,

            }
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            if (!user.checkPassword(password)) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user);
        });
    }
);

module.exports = strategy;