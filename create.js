var db = require("mongoose").connect('mongodb://localhost/personalsite');
var Project = require("./models/Project");
var fs = require("fs");

var data = JSON.parse(fs.readFileSync("projects.json").toString());
for ( var i = 0 ; i < data.length; i++)
{
	o = data[i];
	p = new Project({title:o.title, description:o.description, tags:o.tags});
	p.save();
}
