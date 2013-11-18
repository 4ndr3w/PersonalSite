exports.index = function(req,res)
{
	if ( req.user == undefined || !req.user.isAdmin )
	{
		res.redirect("/login");
		return;
	}
	res.render("admin/index");
};


exports.code = require("./admin/code");
exports.blog = require("./admin/blog");