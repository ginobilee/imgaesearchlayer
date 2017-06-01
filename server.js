'use strict'

var express = require('express'),
 imageRouter = require('./imageRouter'), 
 app = express();

app.use('/search',imageRouter);

app.listen('8080');
