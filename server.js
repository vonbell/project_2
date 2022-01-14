const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

// const usersController = require('./controllers/users');
const usersContentController = require('./controllers/usersContent');
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');


const { PORT, DATABASE_URL } = process.env;

mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// MIDDLEWARE
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));


// CONTROLLERS
app.use('/', usersContentController);
// app.use('/', usersController);

// Listener
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));