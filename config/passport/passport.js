/* eslint-disable consistent-return */
/* eslint-disable no-sync */
/* eslint-disable max-params */
/* eslint-disable no-shadow */
/* eslint-disable max-lines-per-function */
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport, user) => {
    let User = user;
    // eslint-disable-next-line global-require
    let LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            let generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({
                where: {
                    email
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                }
                let userPassword = generateHash(password);

                let data = {
                    email,
                    password: userPassword,
                    name: req.body.name,
                    username: req.body.username,
                    location: req.body.location,
                   
                };

                // eslint-disable-next-line no-unused-vars
                User.create(data).then((newUser, created) => {
                    if (!newUser) {
                        return done(null, false);
                    }

                    if (newUser) {
                        return done(null, newUser);
                    }
                });
            });
        }
    ));

    passport.use('local-login', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {

            let User = user;

            let isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({ where: { email } }).then(function (user) {

                if (!user) {
                    return done(null, false, { message: 'Email does not exist' });
                }

                if (!isValidPassword(user.password, password)) {

                    return done(null, false, { message: 'Incorrect password.' });

                }

                let userinfo = user.get();

                return done(null, userinfo);

            }).
                catch((err) => {

                    // eslint-disable-next-line no-console
                    console.log("Error:", err);

                    return done(null, false, { message: 'Something went wrong with your Signin' });

                });

        }
    ));
};