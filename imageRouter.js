<<<<<<< HEAD
'use strict'

var express = require('express'),
    stream = require('stream'),
    http = require('http'),
    url = require('url'),
    DBManager = require("./DBManager");
var router = express.Router(),dbManager = new DBManager();
=======
var express = require('express'),
    stream = require('stream'),
    http = require('http'),
    url = require('url');
var router = express.Router();
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0

exports = module.exports = router;

router.use(function(req,res,next){
<<<<<<< HEAD
	//console.log(req.url);
	var reg = /(.*?)\?/;
	var matches = reg.exec(req.url.slice(1));
	res.locals.word = RegExp.$1;
	var urlObj = url.parse(req.url,true);
	var offset = +urlObj.query.offset;
	res.locals.offset = offset;
	next();
=======
	var us = url.parse(req.url);
	var decodeU = decodeURIComponent(us.path.slice(1));
	res.locals.word = us.path.slice(1);
	console.log(us.path);
	next();
	//res.end('imageRouter:got the request');
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
});

router.use(function(req,res,next){
	var host = 'image.baidu.com',word = res.locals.word;
	var result='';
	var options = {
		host:host,
		method:'GET',
		path:'/search/index?tn=baiduimage&word='+word
	};
	var reqHTTP = http.request(options,(response) => {
		response.setEncoding('utf8');
		console.log('http request got the response');
<<<<<<< HEAD
       	        console.log(response.statusCode);
		response.on('data',function(chunk){
=======
	       console.log(response.statusCode);
		response.on('data',function(chunk){
			//console.log('response got data');
			//chunk.setEncoding('utf8');
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
			result += chunk;
		});
		response.on('end',function(d){
			console.log('end');
			var reg = /"data":\[\{"thumbURL".*?}]/i;
<<<<<<< HEAD
			var matches = reg.exec(result);
=======
			var matches = reg.exec(result.toString());
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
			var imgData = matches[0].slice(7);
			var imgData1 =  imgData.replace(/\'/g,'"');
			var imgStr = imgData1.replace(/<.*?>/g,'');
			//console.log(imgData1.slice(0,2000));
			//console.log(imgStr.slice(0,2000));
			try{
				console.log('try');
				var  imgJSON = JSON.parse(imgStr),output=[];
				for(let i=0,n=imgJSON.length;i<n;i++){
					let o = {};
					o.image_url = imgJSON[i].middleURL;
					o.thumb_url = imgJSON[i].thumbURL;
<<<<<<< HEAD
					o.title = imgJSON[i].fromPageTitle;	
					o.original_url = imgJSON[i].fromURLHost;
					o.ind = imgJSON[i].pageNum;
					output.push(o);
				};
				res.locals.output = output;
				next();
=======
					o.des = imgJSON[i].fromPageTitle;	
					o.ind = imgJSON[i].pageNum;
					output.push(o);
					if(i == 6){
						console.log(o.des);
					}
				};
				res.locals.output = output;
				next();
				//res.set('content-type','json');
				//res.end(output[6]);
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
			}
			catch(e){
				console.log(e);
				res.end(e.toString());
			}
		});
		response.on('error',function(err){
			console.log(err);
<<<<<<< HEAD
			res.end(err);
=======
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
		});

	});
	reqHTTP.on('error',function(err){
		console.log(err);
<<<<<<< HEAD
		res.end(err);
=======
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
	});
	reqHTTP.end();
});	

router.use(function(req,res,next){
<<<<<<< HEAD
	var output = res.locals.output,offset=0,n=output.length;

	if(res.locals.offset){
		offset = res.locals.offset;
	};
	res.json(output.slice((offset<n)?offset:0,(offset+10)>n?n:(offset+10)));
	
	var t = new Date();
	var doc = {
		time:t.toDateString(),
		query:res.locals.word
	}
	try {
		dbManager.insert(doc);
	} catch (e) {
		console.log('Router:mongodb insert error');
	}
//	res.json(output.slice(0,10));
=======
	var output = res.locals.output;
	res.json(output.slice(0,10));
>>>>>>> 9b6717e352548535071512fd30f65976c8c7acb0
});
