var app = require("../app");
var vows = require("vows");
var request = require('superagent');
var assert = require('assert');

function httpCodeCallback(callback, address)
{
	request.get(address).end(function(res)
	{
		callback(null, res.status);
	});
}

vows.describe("route test").addBatch(
{
	'GET /': {
		topic: function()
		{
			httpCodeCallback(this.callback, "localhost:3000");
		},
		'result':  function(err, responseCode)
		{
			assert.equal(responseCode, 200);
		}
	},
	'GET /code': {
		topic: function()
		{
			httpCodeCallback(this.callback, "localhost:3000/code");
		},
		'result':  function(err, responseCode)
		{
			assert.equal(responseCode, 200);
		}
	},
	'GET /blog': {
		topic: function()
		{
			httpCodeCallback(this.callback, "localhost:3000/blog");
		},
		'result':  function(err, responseCode)
		{
			assert.equal(responseCode, 200);
		}
	},
	'GET /resume': {
		topic: function()
		{
			httpCodeCallback(this.callback, "localhost:3000/resume");
		},
		'result':  function(err, responseCode)
		{
			assert.equal(responseCode, 200);
		}
	},
	
	'teardown': function()
	{
		app.close();
	}
}).export(module);
