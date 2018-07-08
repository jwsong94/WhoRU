var Gpio = require('onoff').Gpio;
var GpioPWM = require('pigpio').Gpio;

var LED_R = new Gpio(27, 'out');
var LED_G = new Gpio(22, 'out');
var LED_B = new Gpio(23, 'out');
var Buzzer = new GpioPWM(17, {mode: GpioPWM.OUTPUT});
var physicalButton = new Gpio(18, 'in', 'both');

function initialize() {
	LED_R.writeSync(0);
	LED_G.writeSync(1);
	LED_B.writeSync(1);
	Buzzer.pwmWrite(0);
}

function buzzerOff(){
	Buzzer.pwmWrite(0);
}

function turnOn() {
	LED_R.writeSync(1);
	LED_G.writeSync(0);
	Buzzer.pwmWrite(50);
	setTimeout(buzzerOff, 1000);
}

function turnOff() {
	LED_R.writeSync(0);
	LED_G.writeSync(1);
}

function physicalButtonPush() {
	turnOn();
	setTimeout(turnOff, 10000);
}

initialize();
console.log('Ver_1 Start');
physicalButton.watch( function (err, value) {
	if (err) {
		console.error('Error', err);
		return;
	}
	physicalButtonPush();
});
