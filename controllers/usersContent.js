const express = require('express');
const contentRouter = express.Router();
const Content = require('../models/userContent');
const contentSeed = require('../models/contentSeed');

// SEED DATA
contentRouter.get('/seed', (req, res) => {
	Content.deleteMany({}, (err, posts) => {});
    Content.create(contentSeed,
        (err, data) => {
            res.redirect('/');
        }
    );
});

// INDEX
contentRouter.get('/', (req, res) => {
    Content.find({}, (err, posts) => {
        res.render('home', { posts });
    });
});

// NEW
contentRouter.get('/new', (req, res) => {
	res.render('new');
});

// DELETE
contentRouter.delete('/:id', (req, res) => {
	Content.findByIdAndDelete(req.params.id, (err, data) => {
		res.redirect('/')
	});
});

// UPDATE
contentRouter.put('/:id', (req, res) => {
	Content.findByIdAndUpdate(req.params.id, req.body, {new: true,}, (err) => {
		res.redirect(`/${req.params.id}`)
	});
});

// CREATE
contentRouter.post('/', (req, res) => {
    Content.create(req.body, (err) => {
		res.redirect('/:id');
	});
});

// EDIT
contentRouter.get('/:id/edit', (req, res) => {
	Content.findById(req.params.id, (err, post) => {
		res.render('edit', { post });
	});
});

// SHOW
contentRouter.get('/:id', (req, res) => {
	Content.findById(req.params.id, (err, post) => {
		res.render('show', { post });
	});
});
// contentRouter.get('/:id', (req, res) => {
// 	Content.find({}, (err, allContent) => {
// 		res.render('show', { allContent });
// 	});
// });


module.exports = contentRouter;