var mongoose = require("mongoose");

module.exports = mongoose.model("Project", 
{
	title: String,
	url: String,
	description: String,
	tags: Array
});

