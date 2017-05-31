var express = require('express'),
    url = require('url'),
    imageRouter = express.Router();

imageRouter = exports = module.exports;

imageRouter.use(function(req,res,next){
	var us = url.parse(req.url);
	console.log(us);
	res.end('imageRouter:got the request');
});
