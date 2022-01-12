const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// LOGIN ROUTES
usersRouter.get('/login', (req, res) => {
    res.render('login', {error: ''});
});

usersRouter.post('/login', (req, res) => {
    User.findOne({email: req.body.email}).select('+password').exec((err, user) => {
        if(!user) return res.render('login', {error: 'Invalid Credentials'});
        
        const isMatched = bcrypt.compareSync(req.body.password, user.password);
        if(!isMatched) return res.render('login', {error: 'Invalid Credentials'});
        
        req.session.user = user._id; // create the session to log the user log
        res.redirect('/');
   });
});

// SIGNUP ROUTES
usersRouter.get('/signup', (req, res) => {
    res.render('signup');
});

usersRouter.post('/signup', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    User.create(req.body, (err, user) => {
        res.redirect('/login');
    });
});


usersRouter.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    });
});

module.exports = usersRouter;