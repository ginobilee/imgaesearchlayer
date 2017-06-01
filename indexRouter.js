var express = require('express');
var indexRouter = express.Router();

exports = module.exports = indexRouter;

indexRouter.use(function(req,res){
    res.render('index');
})