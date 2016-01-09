var space = require('./space'),
	setters = require('./setters'),
	compounds = require('./compounds'),
	THREE = require('three');

var Turtle = function Turtle(x, y, z, d, theta) {
	console.log('%c New turtle! ', 'font-weight: bold; color: white; background-color: #59a074');
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.h = new THREE.Vector3(1, 0, 0);
	this.l = new THREE.Vector3(0, 0, 1);
	this.u = new THREE.Vector3(0, 1, 0);
	this.theta = theta || 90;
	this.d = d || 10;
	this.stack = [];
};

Turtle.prototype.instructions = {
	'F'		: 'this.F()',
	'f'		: 'this.f()',
	'+'		: 'this.right()',
	'-'		: 'this.left()',
	'^'		: 'this.up()',
	'∧'		: 'this.up()',
	'&'		: 'this.down()',
	'/'		: 'this.rollRight()',
	'\\'	: 'this.rollLeft()',
	'|'		: 'this.turnAround()',
	'['		: 'this.push()',
	']'		: 'this.pop()'
}

Turtle.prototype.productions = {}

Turtle.prototype.translator = function (axiom, turtle) {
	if (this.debug) {
		console.log('translator', this);
	}
	results = [];
	for (var i = 0; i < axiom.length; i++) {
		var token = axiom[i];
		eval(this.instructions[token]);
	}
	return results;
};

Turtle.prototype.generate = function (axiom, generations) {
	if (this.debug) {
		console.log('generate', this);
	}
	if (generations > 0) {
		successor = '';
		for (var i = 0; i < axiom.length; i++) {
			var token = axiom[i];
			if (this.productions[token]) {
				successor += this.productions[token];
			} else {
				successor += token;
			}
		}
		return this.generate(successor, --generations);
	}
	return axiom;
};

Turtle.prototype.F = function (d) {
	if (this.debug) {
		console.log('F', this);
	}
	d = d || this.d;
	var prime = this.h.clone().multiplyScalar(d);
	space.moveTo(this.x, this.y, this.z);
	compounds.line(prime.x, prime.y, +prime.z);
	space.move(prime.x, prime.y, +prime.z);
	this.x += prime.x;
	this.y += prime.y;
	this.z += prime.z;
};

Turtle.prototype.f = function (d) {
	if (this.debug) {
		console.log('f', this);
	}
	d = d || this.d;
	var prime = this.h.clone().multiplyScalar(d);
	this.x += prime.x;
	this.y += prime.y;
	this.z += prime.z;
	space.moveTo(this.x, this.y, this.z);
};

Turtle.prototype.yaw = function (angle) {
	if (this.debug) {
		console.log('yaw', this);
	}
	angle = angle / 180 * Math.PI;
	this.h.applyAxisAngle(this.u, angle);
	this.l.applyAxisAngle(this.u, angle);
	this.u.applyAxisAngle(this.u, angle);
};

Turtle.prototype.pitch = function (angle) {
	if (this.debug) {
		console.log('pitch', this);
	}
	angle = angle / 180 * Math.PI;
	this.h.applyAxisAngle(this.l, angle);
	this.l.applyAxisAngle(this.l, angle);
	this.u.applyAxisAngle(this.l, angle);
};

Turtle.prototype.roll = function (angle) {
	if (this.debug) {
		console.log('roll', this);
	}
	angle = angle / 180 * Math.PI;
	this.h.applyAxisAngle(this.h, angle);
	this.l.applyAxisAngle(this.h, angle);
	this.u.applyAxisAngle(this.h, angle);
};

Turtle.prototype.right = function (angle) {
	if (this.debug) {
		console.log('turn right', this);
	}
	angle = angle || this.theta;
	this.yaw(-angle);
};

Turtle.prototype.left = function (angle) {
	if (this.debug) {
		console.log('turn left', this);
	}
	angle = angle || this.theta;
	this.yaw(angle);
};

Turtle.prototype.up = function (angle) {
	if (this.debug) {
		console.log('turn up', this);
	}
	angle = angle || this.theta;
	this.pitch(angle);
};

Turtle.prototype.down = function (angle) {
	if (this.debug) {
		console.log('turn down', this);
	}
	angle = angle || this.theta;
	this.pitch(-angle);
};

Turtle.prototype.rollRight = function (angle) {
	if (this.debug) {
		console.log('roll right', this);
	}
	angle = angle || this.theta;
	this.roll(angle);
};

Turtle.prototype.rollLeft = function (angle) {
	if (this.debug) {
		console.log('roll left', this);
	}
	angle = angle || this.theta;
	this.roll(-angle);
};

Turtle.prototype.turnAround = function () {
	if (this.debug) {
		console.log('turn around', this);
	}
	this.yaw(180);
};

Turtle.prototype.incrementColorIndex = function () {
	if (this.debug) {
		console.log('increment color index', this);
	}
	++this.colorIndex;
};

Turtle.prototype.decrementDiameter = function () {
	if (this.debug) {
		console.log('decrement diameter', this);
	}
	--this.diameter;
};

Turtle.prototype.push = function () {
	if (this.debug) {
		console.log('push', this);
	}
	var state = {
		x: this.x,
		y: this.y,
		z: this.z,
		h: this.h.clone(),
		l: this.l.clone(),
		u: this.u.clone(),
		diameter: this.diameter,
		colorIndex: this.colorIndex
	};
	console.log('push length:', this.stack.push(state));
	console.log('stack:', this.stack[0]);
};

Turtle.prototype.pop = function () {
	if (this.debug) {
		console.log('pop', this);
	}
	var state = this.stack.pop();
	this.x = state.x;
	this.y = state.y;
	this.z = state.z;
	this.h = state.h;
	this.l = state.l;
	this.u = state.u;
	this.diameter = state.diameter;
	this.colorIndex = state.colorIndex;
};

module.exports = {
    Turtle 	: Turtle
};
