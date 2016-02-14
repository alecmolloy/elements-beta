/*
 * Lights language module
 *
 * Collection of lighting commands
 */

var session = require('../session'),
    utils = require('../utils'),
    THREE = require('three');

/*
 * Adds an ambient light to the scene
 *
 */
function ambient(color) {
    color = utils.sanitizeColor(color);

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
 */
function directional(color, position, intensity) {
    color = utils.sanitizeColor(color);

	position = position || [1, 1, 1];
	color = color || '#FFF';
	intensity = intensity || 1.0;

	var light = new THREE.DirectionalLight(color, intensity);
	light.position.set(position[0], position[1], position[2]);
	session.scene.add(light);
	session.elements.lights.push(light);
}

/*
 * Adds a hemisphere light to the scene
 *
 */
function hemisphere(skyColor, groundColor, intensity) {
    skyColor = utils.sanitizeColor(skyColor) || '#FFF';
    groundColor = utils.sanitizeColor(groundColor) || '#FFF';
	intensity = intensity || 1.0;

	var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
	session.scene.add(light);
	session.elements.lights.push(light);
}

/*
 * Adds a point light to the scene
 *
 */
function pointLight(color, position, intensity, distance, decay) {
    color = utils.sanitizeColor(color);

	position = position || [100, 100, 100];
	intensity = intensity || 1;
	distance = distance || Infinity;
	decay = decay || 1;

	var light = new THREE.PointLight(color, intensity, distance, decay);
	light.position.set(position[0], position[1], position[2]);
	session.scene.add(light);
	session.elements.lights.push(light);
}

/*
 * Adds a spot light to the scene
 *
 */
function spot(color, position, intensity, angle, distance, exponent, decay) {
    color = utils.sanitizeColor(color);

	position = position || [100, 100, 100];
	color = color || '#fff';
	intensity = intensity || 1.0;
	angle = angle * Math.PI / 180 || 10 * Math.PI / 180;
	distance = distance || Infinity;
	exponent = exponent || 250;
	decay = decay || 1;

	var light = new THREE.SpotLight(color, intensity, distance, angle, exponent, decay);
	light.position.set(position[0], position[1], position[2]);
	session.scene.add(light);
	session.elements.lights.push(light);
}

module.exports = {
    ambient         : ambient,
    directional     : directional,
    hemisphere      : hemisphere,
    pointLight      : pointLight,
    light           : pointLight,
    spot            : spot
};
