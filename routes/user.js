const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');
var db = require("../models");

// router.use('/user', user);

router.post('/user', (req, res) => {

    // const { username, password } = req.body;
    
    // Validation
    db.User.findOne({
        username: req.body.username,
        where: {
            username: req.body.username
        }
    }, (err, user) => {
        if (err) {
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            });
        } else {
            const newUser = new User({
                username: username,
                password: password
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.json(savedUser);
            });
        }
    });
});

router.post('/user/login', function(req, res, next) {
    next();
}, passport.authenticate('local'), (req, res) => {
    let userInfo = {
        username: req.user.username
    };
    res.send(userInfo);
});

router.get('/user', (req, res, next) => {
    if (req.user) {
        res.json({ user: req.user });
    } else {
        res.json({ user: null });
    }
});

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' });
    } else {
        res.send({ msg: 'no user to log out' });
    }
});

module.exports = router;
