var express = require('express'),
    stream = require('stream'),
    http = require('http'),
    url = require('url');
var router = express.Router();

exports = module.exports = router;

router.use(function(req,res,next){
	var us = url.parse(req.url);
	var decodeU = decodeURIComponent(us.path.slice(1));
	res.locals.word = us.path.slice(1);
	console.log(us.path);
	next();
	//res.end('imageRouter:got the request');
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
	       console.log(response.statusCode);
		response.on('data',function(chunk){
			//console.log('response got data');
			//chunk.setEncoding('utf8');
			result += chunk;
		});
		response.on('end',function(d){
			console.log('end');
			var reg = /"data":\[\{"thumbURL".*?}]/i;
			var matches = reg.exec(result.toString());
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
			}
			catch(e){
				console.log(e);
				res.end(e.toString());
			}
		});
		response.on('error',function(err){
			console.log(err);
		});

	});
	reqHTTP.on('error',function(err){
		console.log(err);
	});
	reqHTTP.end();
});	

router.use(function(req,res,next){
	var output = res.locals.output;
	res.json(output.slice(0,10));
});
