var express = require('express'),
    iamgeRouter = require('./imageRouter'),
    app = express();

app.use('/search',imageRouter);

app.listen('8080');
