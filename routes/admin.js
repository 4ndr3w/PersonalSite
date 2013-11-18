exports.index = function(req,res)
{
	res.render("admin/index");
};


exports.code = require("./admin/code");
exports.blog = require("./admin/blog");