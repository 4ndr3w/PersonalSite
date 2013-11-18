var db = require("mongoose").connection;
var Post = require("../models/Post.js");
var markdown = require("markdown").markdown;
var itemsPerPage = 10;

exports.index = function(req,res)
{
	Post.count(function (err, count)
	{
		if ( !err )
		{
			Post.find({}, null, {skip:0, limit:itemsPerPage}, function(err, results)
			{
				res.render("blog/index.ejs", {"page": 1, "pages": Math.floor(count/itemsPerPage), "posts": results, "markdown": markdown});
			});
		}
	});
};

exports.page = function(req,res)
{
	page = req.param("page");
	if ( !page ) page = 1;
	var offset = (page-1)*itemsPerPage;
	Post.count(function (err, count)
	{
		if ( !err )
		{
			Post.find({}, null, {skip:offset, limit:itemsPerPage}, function(err, results)
			{
				res.render("blog/index.ejs", {"page": page, "pages": Math.floor(count/itemsPerPage), "posts": results,  "markdown": markdown});
			});
		}
	});	
};

exports.view = function(req,res)
{
	Post.findById(req.param("id"), function(err, post)
	{
		res.render("blog/post.ejs", {"markdown": markdown, "post":post});
	});
};

