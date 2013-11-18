
/**
 * Module dependencies.
 */

var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var blog = require('./routes/blog');
var admin = require('./routes/admin');
var http = require('http');
var path = require('path');
var db = require("mongoose").connect('mongodb://localhost/personalsite');

var passport = require("passport");
var PassportGoogle = require('passport-google').Strategy;

var adminList = JSON.parse(fs.readFileSync(path.join(__dirname, "admins.json")));
var app = express();


function userIsAdmin(email)
{
	for (var a = 0; a < adminList.length; a++)
	{
		if ( adminList[a] == email )
		{
			return true;
		}
	}
	return false;
}


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use( express.cookieParser() );
app.use(express.session({secret:(Math.random()*100).toString()}));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(id, done) {
	done(null, {"email": id, "isAdmin": userIsAdmin(id)});
});

passport.use(new PassportGoogle({
	returnURL: 'http://localhost:3000/login/return',
	realm: 'http://localhost:3000/'
}, function (identifier, profile, done)
{
	var isAdmin = false;
	var email = "";
	for ( var e = 0; e < profile.emails.length; e++ )
	{
		if ( userIsAdmin(profile.emails[e].value) )
		{
			email = profile.emails[e].value;
			isAdmin = true;
		}
	}
	
	if ( isAdmin )
		done(false, {"email": email, "isAdmin": isAdmin});
	else
		done("Account is not admin", {});
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.set("address", "127.0.0.1:3000");
}
else
{
	app.set("address", "andrew.lobos.me");
}

app.get('/', routes.index);
app.get('/code', routes.code);
app.get('/resume', routes.resume);

app.get('/blog', blog.index);
app.get('/blog/view/:id', blog.view);

app.get('/admin', admin.index);

app.get('/admin/code', admin.code.index);
app.post('/admin/code', admin.code.posthandler);
app.get('/admin/code/add', admin.code.add);
app.get('/admin/code/edit/:id', admin.code.edit);
app.get('/admin/code/delete/:id', admin.code.delete);


app.get("/admin/blog", admin.blog.index);
app.get("/admin/blog/new", admin.blog.new);
app.get("/admin/blog/delete/:id", admin.blog.delete);
app.get("/admin/blog/edit/:id", admin.blog.edit);
app.post("/admin/blog/update", admin.blog.update);


app.get("/login", passport.authenticate("google"));
app.get('/login/return', passport.authenticate('google', { successRedirect: '/admin', failureRedirect: '/failed' }));

module.exports = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


