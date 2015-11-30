/*
 * Animation language module
 *
 * Collection of path commands
 */

var space = require('./space'),
    session = require('../session'),
    utils = require('../utils');

/*
 * Adds the passed function the animation queue
 *
 * @param {Number} x
 * @param {Number} y
 * @return void
 */

function animate(callback) {
    callback();
    session.animationRequestID = window.requestAnimationFrame(function () {
        animate(callback);
    });
}

function bobbing(shape) {
	animate(function animation () {
		shape.position.y = Math.sin(Date.now() / 1000);
		shape.rotation.x = Math.sin(Date.now() / 3000);
		shape.rotation.y = Math.sin(Date.now() / 2500);
		shape.rotation.z = Math.sin(Date.now() / 2000);
	})
}

function spinning(shape) {
	animate(function animation () {
		shape.rotation.y = Date.now() / 2500;
	})
}

module.exports = {
    animate     : animate,
	bobbing    	: bobbing,
	spinning    : spinning
};
