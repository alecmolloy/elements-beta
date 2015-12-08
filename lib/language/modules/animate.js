/*
 * Animation language module
 *
 * Collection of animation commands
 */

var space = require('./space'),
    session = require('../session'),
    utils = require('../utils'),
    THREE = require('three');

/*
 * Adds the passed function the animation queue
 *
 * @param {Number} x
 * @param {Number} y
 * @return void
 */

function animate(callback, fps) {
    setTimeout(function() {
		session.animationRequestID = window.requestAnimationFrame(function (timestamp) {
			callback(timestamp);
            animate(callback, fps);
		});
    }, 1000 / fps);
}

function bobbing(shape) {
	animate(function animation () {
		shape.position.y = Math.sin(Date.now() / 1000);
		shape.rotation.x = Math.sin(Date.now() / 3000);
		shape.rotation.y = Math.sin(Date.now() / 2500);
		shape.rotation.z = Math.sin(Date.now() / 2000);
	});
}

function spinning(shape) {
	animate(function animation () {
		shape.rotation.y = Date.now() / 2500;
	});
}

function camera(x, y, z) {
    session.elements.camera.position.set(x, y, z);
}

function lookAt(x, y, z) {
    session.cameraControls.target = new THREE.Vector3(x, y, z);
}

module.exports = {
    animate     : animate,
	bobbing    	: bobbing,
	camera    	: camera,
	lookAt    	: lookAt,
	spinning    : spinning
};
