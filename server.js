'use strict'

var express = require('express'),
 ejs = require("ejs"),
 imageRouter = require('./imageRouter'), 
 latestRouter = require('./latestRouter'),
 indexRouter = require('./indexRouter'),
 app = express();
 
app.use(express.static(__dirname+'/public'));

app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.use('/search',imageRouter);
app.use('/latest',latestRouter);
app.use(indexRouter);

app.listen('8080');
