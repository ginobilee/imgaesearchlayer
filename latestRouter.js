var express = require('express'),
	DBManager = require("./DBManager");
	
var latestRouter = express.Router(),dbManager = new DBManager();

exports = module.exports = latestRouter;

latestRouter.use(function(req,res,next){
	console.log('Router:latest');
	dbManager.list(function(docs){
		console.log('Router:get docs ok');
		res.json(docs);
	});
	
});
