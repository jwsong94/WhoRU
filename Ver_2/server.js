var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function (req, res) {
	console.log('Client Connect');
	fs.readFile('CameraOn.html', function (error, data) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
});

app.get('/On', function (req, res) {
	console.log('Camera On');
	fs.readFile('CameraOn.html', function (error, data) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
});

app.get('/Off', function (req, res) {
	console.log('Camera Off');
	fs.readFile('CameraOff.html', function (error, data) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
});

app.listen(7777, function() {
	console.log('Server Start');
});
