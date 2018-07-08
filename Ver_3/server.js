var express = require('express');
var fs = require('fs');
var app = express();
var Gpio = require('onoff').Gpio;
var GpioPWM = require('pigpio').Gpio;

var LED_R = new Gpio(27, 'out');
var LED_G = new Gpio(22, 'out');
var LED_B = new Gpio(23, 'out');
var Buzzer = new GpioPWM(17, {mode: GpioPWM.OUTPUT});
var physicalButton = new Gpio(18, 'in', 'both');

fs.open('./VisitorLog.data', 'w', function(err, fd) {
	if (err) throw err;
	var buf = new Buffer('Visitor Logs<br>\n');
	fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer){
		if (err) throw err;
		fs.close(fd);
	});
});

function turnOn() {
	LED_R.writeSync(1);
	LED_G.writeSync(0);
	LED_B.writeSync(1);
	Buzzer.pwmWrite(50);
}

function turnOff() {
	LED_R.writeSync(0);
	LED_G.writeSync(1);
	LED_B.writeSync(1);
	Buzzer.pwmWrite(0);
}

function physicalButtonPush() {
	fs.open('./VisitorLog.data', 'a', function(err, fd) {
		if (err) throw err;
		var sDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/,'<br>\n');
		fs.write(fd, sDate, 0, sDate.length, null, function(err, written, buffer) {
			if (err) throw err;
			fs.close(fd);
		});
	});
	turnOn();
	setTimeout(turnOff, 1000);
}

physicalButton.watch( function (err, value) {
	if (err) {
		console.error('Button Error', err);
		return;
	}
	physicalButtonPush();
});

app.get('/', function (req, res) {
	console.log('Client Connect');
	fs.readFile('CameraOn.html', function (error, data) {
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(data);
	});
});

app.get('/On', function (req, res) {
	console.log('Camera On');
	res.writeHead(200, {'Content-Type' : 'text/html'});
	fs.readFile('CameraOn.html', function (error, data) {
		//res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write(data);
	});
	//res.writeHead(200, {'Content-Type' : 'text/plain'});
	fs.readFile('./VisitorLog.data', function (error, data) {
		//res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end(data);
	});
});

app.get('/Off', function (req, res) {
	console.log('Camera Off');
	res.writeHead(200, {'Content-Type' : 'text/html'});
	fs.readFile('CameraOff.html', function (error, data) {
		//res.writeHead(200, {'Content-Type' : 'text/html'});
		res.write(data);
	});
	//res.writeHead(200, {'Content-Type' : 'text/plain'});
	fs.readFile('VisitorLog.data', function (error, data) {
		//res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end(data);
	});
});

app.listen(7777, function() {
	turnOff();
	console.log('Server Start');
});
