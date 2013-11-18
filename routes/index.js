var fs = require("fs");
var Project = require("../models/Project");

exports.index = function(req, res)
{
	res.render('index');
};

exports.code = function (req,res)
{
	Project.find(function (err, data)
	{
		res.render("code", {"projects": data});
	});
};

exports.resume = function(req,res)
{
	fs.readFile("resume.json", function (err, data)
	{
		data = JSON.parse(data);
		res.render("resume", {"resume": data});
	});
};