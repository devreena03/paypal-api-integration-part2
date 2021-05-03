var express = require("express");

var app = express.Router();

app.get("/", function(req, res){
	res.sendFile(__basedir + '/public/view/home.html');
});

app.get("/merchant/brandedClient", function(req, res){
	res.sendFile(__basedir + '/public/view/merchant/brandedClient.html');
});

app.get("/merchant/ucc", function(req, res){
	res.sendFile(__basedir + '/public/view/merchant/unbranded.html');
});

app.get("/merchant/brandedServer", function(req, res){
	res.sendFile(__basedir + '/public/view/merchant/brandedServer.html');
});

app.get("/partner/brandedClient", function(req, res){
	res.sendFile(__basedir + '/public/view/merchant/brandedClient-copy.html');
});

app.get("/partner/ucc", function(req, res){
	res.sendFile(__basedir + '/public/view/partner/ucc.html');
});

app.get("/partner/sub", function(req, res){
	res.sendFile(__basedir + '/public/view/partner/subscription.html');
});

app.get("/partner/brandedServer", function(req, res){
	res.sendFile(__basedir + '/public/view/partner/brandedServer.html');
});

app.get("dynamic-script", function(req, res){
	res.sendFile(__basedir + '/public/view/payment-sdk/dynamic-script.html');
});

app.get("/ec-server", function(req, res){
	res.sendFile(__basedir + '/public/view/oldStack/ec-server.html');
});

app.get("/nvp", function(req, res){
	res.sendFile(__basedir + '/public/view/oldStack/nvp.html');
});

app.get("/rt", function(req, res){
	res.sendFile(__basedir + '/public/view/rt.html');
});

app.get("/callback", function(req, res){
	res.sendFile(__basedir + '/public/view/callback.html');
});

module.exports = app;
