var Gpio = require('onoff').Gpio,
//buzzer = new Gpio(23, 'out'),
button = new Gpio(18, 'in', 'both');

var Gpio2 = require('pigpio').Gpio,
buzzer = new Gpio2(17, {mode: Gpio2.OUTPUT});

var server = require('./server')(buzzer);

button.watch(function(err, value) {
	if(err) exit();
	buzzer.pwmWrite(50);
});

function exit() {
	buzzer.unexport();
	button.unexport();
	process.exit();
}

process.on('SIGINT', exit);
