/*
 * Physics language module
 *
 * Collection of physics commands
 */

var session = require('../session'),
    utils = require('../utils'),
    THREE = require('three');

/*
 * Adds an ambient light to the scene
 *
 */
function physical(mesh) {
	utils.record('physical', {
		mesh   : mesh,
	});

	mesh.acceleration = new THREE.Vector3(0,0,0);
	mesh.speed = new THREE.Vector3(0,0,0);
	return mesh;
}

module.exports = {
    physical         : physical
};
