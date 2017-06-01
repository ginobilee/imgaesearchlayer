'use strict'

var express = require('express'),
<<<<<<< HEAD
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
=======
 imageRouter = require('./imageRouter'), 
 app = express();

app.use('/search',imageRouter);
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0

app.listen('8080');
