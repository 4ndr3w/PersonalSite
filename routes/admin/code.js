var Project = require("../../models/Project");

exports.index = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	
	Project.find(function (err, data)
	{
		res.render("admin/code", {"projects": data, "view": "list"});
	});
};

exports.add = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	
	res.render("admin/code", {"view": "Add", "project": {title:"", description:"", tags:[]}});
};

exports.edit = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	
	Project.findById(req.param("id"), function (err, project)
	{
		res.render("admin/code", {"view": "Update", "project": project});
	});
};

exports.delete = function (req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	Project.findById(req.param("id"), function (err, project)
	{
		project.remove();
		res.redirect("/admin/code");
	});
};

exports.posthandler = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	if ( req.param("action") == "Update" )
	{
		Project.findById(req.param("id"), function (err, project)
		{
			project.title = req.param("title");
			project.description = req.param("description");
			project.tags = req.param("tags").split(" ");
			project.save();
			res.redirect("/admin/code");
		});
	}
	else if ( req.param("action") == "Add" )
	{
		project = new Project();
		project.title = req.param("title");
		project.description = req.param("description");
		project.tags = req.param("tags").split(" ");
		project.save();
		res.redirect("/admin/code");
	}
	
};