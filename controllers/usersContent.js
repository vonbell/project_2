const express = require('express');
const contentRouter = express.Router();
const Content = require('../models/userContent');

// INDEX
contentRouter.get('/', (req, res) => {
    res.render('index');
});

module.exports = contentRouter;