var Post = require("../../models/Post.js");
var markdown = require("markdown").markdown;

exports.index = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	Post.find(function(err, results)
	{
		res.render("admin/blog/index", {"posts": results, "markdown": markdown});
	});
	
};

exports.new = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	res.render("admin/blog/editor", {"action": "Post", "post": {"id": 0, "title": "", "content": ""}});
};

exports.edit = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	Post.findById(req.param("id"), function(err, result)
	{
		res.render("admin/blog/editor", {"action": "Update", "post": result});
	});
};

exports.update = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	
	if ( req.param('id') == 0 )
	{
		// create it
		p = new Post();
		p.title = req.param("title");
		p.content = req.param("content");
		p.save();
	}
	else 
	{
		// update it
		Post.findById(req.param("id"), function(err, p)
		{
			p.title = req.param("title");
			p.content = req.param("content");
			p.save();
		});
	}
	res.redirect("/admin/blog");
}

exports.delete = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	
	Post.findById(req.param("id"), function(err, result)
	{
		result.remove();
	});
	res.redirect("/admin/blog")
}