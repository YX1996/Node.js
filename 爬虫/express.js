var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res, next){
	superagent.get('http://coding.imooc.com/').end(function(err ,sres){
		if (err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		$('.shizhan-course-list .shizan-name').each(function(idx, element){
			var $element = $(element);
			items.push({
				title: $element.attr('title'),
				href: $element.attr('href')
			});
		});
		res.send(items);
	});
});

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});