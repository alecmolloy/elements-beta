/*
 * Shapes language module
 *
 * Collection of shape commands
 */

var session = require('../session'),
    utils = require('../utils');
    THREE = require('three');

/*
 * Adds an ambient light to the scene
 *
 * @param {Number} color
 * @param {Boolean} recorded: whether the user did this action or not
 * @return void
 */
function ambient(color) {
	if (color === true) {
		color = 0xffffff;
	} else if (color === false) {
		return;
	}
	color = color || session.settings.ambientLight;
	utils.record('ambientLight', {
		color   : color,
	});
	session.settings.ambientLight = color;
	session.elements.ambientLight = new THREE.AmbientLight(color);
	session.scene.add(session.elements.ambientLight);
}

/*
 * Adds a directional light to the scene
 *
 * @param {Number} color
 * @param {Boolean} recorded: whether the user did this action or not
 * @return void
 */
function directionalLight(color, position, intensity) {
	if (color === true) {
		color = 0xffffff;
	} else if (color === false) {
		return;
	}

	position = position || [100, 100, 100];
	color = color || 0xffffff;
	intensity = intensity || 1.0;

	var lights = session.elements.lights;
	lights.push(new THREE.DirectionalLight(color, intensity));
	var light = lights[lights.length - 1];
	lights[lights.length - 1].position.set(position[0], position[1], position[2]);
	session.scene.add(light);
}

module.exports = {
    ambient   			: ambient,
    ambientLight   		: ambient,
    directionalLight   	: directionalLight
};
