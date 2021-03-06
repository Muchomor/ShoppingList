// server.js

// BASE SETUP
// =============================================================================

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser')

var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

//Require the Router we defined in shopping_list.js
var items = require('./items.js');

//Use the Router on the sub route /items
app.use('/items', items);

app.listen(3000);